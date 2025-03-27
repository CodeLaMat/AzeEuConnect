"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { updateUserProfile, fetchUserProfile } from "@/store/profileSlice";
import { UserState } from "@/store/userSlice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { availableCountries, getTimezoneByCountry } from "@/lib/timezone";
import { useRef } from "react";
import { z } from "zod";

const profileSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  phone: z.string().optional(),
  location: z.string().optional(),
  nationality: z.string().optional(),
  timezone: z.string().default("UTC"),
  preferredLanguage: z.enum(["AZ", "EN", "DE", "RU"]),
});

interface Props {
  user: UserState;
}

export default function UserProfileCard({ user }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.profile);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(profile?.image || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  console.log("PROFILE", profile);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    location: "",
    nationality: "",
    timezone: "UTC",
    preferredLanguage: "AZ",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (user.id) {
      dispatch(fetchUserProfile(user.id));
    }
  }, [dispatch, user.id]);

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        phone: profile.phone || "",
        location: profile.location || "",
        nationality: profile.nationality || "",
        timezone: profile.timezone || "UTC",
        preferredLanguage: profile.preferredLanguage || "AZ",
      });

      setImagePreview(profile.image ?? "");
    }
  }, [profile]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

    if (file.size > maxSizeInBytes) {
      toast.error("Image too large", {
        description: "Please upload an image smaller than 5MB.",
      });
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    // Use window.confirm explicitly
    const confirmRemoval =
      typeof window !== "undefined" &&
      window.confirm("Are you sure you want to remove your profile photo?");
    if (confirmRemoval) {
      setImageFile(null);
      setImagePreview("");
      toast("Image removed", {
        description: "You can upload a new one before saving.",
      });
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "location" && {
        timezone: getTimezoneByCountry(value),
      }),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    console.log("SUBMITTED", formData);

    const result = profileSchema.safeParse(formData);
    if (!result.success) {
      const message = result.error.errors[0].message;
      setError(message);
      toast.error("Validation Error", { description: message });
      return;
    }

    const payload = new FormData();
    payload.append("userId", user.id);
    Object.entries(result.data).forEach(([key, value]) => {
      payload.append(key, value);
    });
    if (imageFile) {
      payload.append("image", imageFile);
    } else {
      payload.append("image", "");
    }

    try {
      await dispatch(updateUserProfile(payload)).unwrap();
      setIsEditing(false);
      toast.success("Profile updated", {
        description: "Your profile was saved successfully.",
      });
    } catch (err: any) {
      const message = typeof err === "string" ? err : "Something went wrong";
      setError(message);
      toast.error("Update Failed", { description: message });
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        phone: profile.phone || "",
        location: profile.location || "",
        nationality: profile.nationality || "",
        timezone: profile.timezone || "UTC",
        preferredLanguage: profile.preferredLanguage || "AZ",
      });
      setImagePreview(profile.image || "");
    }
    setImageFile(null);
    setIsEditing(false);
    setError("");
  };

  if (!user?.email) return <p>Loading...</p>;

  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-6 ">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">
            {formData.firstName} {formData.lastName}
          </h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <Badge variant="outline" className="text-sm capitalize">
          {user.role?.toLowerCase()}
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20">
          <Image
            src={imagePreview || "/media/images/profile_icon.svg"}
            alt="Profile"
            unoptimized
            width={80}
            height={80}
            className="rounded-full object-cover border border-gray-300"
          />
          {isEditing && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <button
                type="button"
                onClick={handleImageClick}
                className="absolute bottom-0 right-0 p-1 bg-blue-600 text-white text-xs rounded-full hover:bg-blue-700"
              >
                ✎
              </button>
            </>
          )}
        </div>
        {isEditing && imagePreview && (
          <button
            onClick={handleRemoveImage}
            className="text-xs text-red-500 underline"
          >
            Remove Photo
          </button>
        )}
        <p className="text-xs text-gray-500 mt-2">
          Max image size: <strong>5MB</strong>. PNG, JPG, and JPEG are
          supported.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <InputField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <InputField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <InputField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <div>
          <label className="text-sm text-gray-600">Country</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-400  disabled:text-gray-400"
          >
            <option value="">Select a country</option>
            {availableCountries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <InputField
          label="Nationality"
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <InputField
          label="Timezone"
          name="timezone"
          value={formData.timezone}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <div>
          <label className="text-sm text-gray-600">Preferred Language</label>
          <select
            name="preferredLanguage"
            value={formData.preferredLanguage}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border rounded px-3 py-2 disabled:text-gray-400"
          >
            <option value="AZ">AZ</option>
            <option value="EN">EN</option>
            <option value="DE">DE</option>
            <option value="RU">RU</option>
          </select>
        </div>
      </form>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="pt-4 space-x-3">
        {isEditing ? (
          <>
            <Button onClick={handleSubmit}>Save</Button>
            <Button variant="outline" onClick={handleCancel} type="button">
              Cancel
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </div>
    </div>
  );
}

const InputField = ({
  label,
  name,
  value,
  onChange,
  disabled,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <Input name={name} value={value} onChange={onChange} disabled={disabled} />
  </div>
);
