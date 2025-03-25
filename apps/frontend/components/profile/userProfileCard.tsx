"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { UserState } from "@/store/userSlice";
import { Button } from "@/components/ui/button";
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
  const profile = user?.profile;
  const subscription = user?.subscription;
  const company = user?.companyDetails;
  const serviceSubscriptions = user?.serviceSubscriptions || [];
  const reviews = user?.reviews || [];
  const [imagePreview, setImagePreview] = useState(profile?.image || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    phone: profile?.phone || "",
    location: profile?.location || "",
    nationality: profile?.nationality || "",
    timezone: profile?.timezone || "UTC",
    preferredLanguage: profile?.preferredLanguage || "AZ",
  });
  const [error, setError] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setImagePreview("");
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = profileSchema.safeParse(formData);

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    console.log("Saving profile:", result.data);
    setIsEditing(false);
    setError("");
  };

  const handleCancel = () => {
    setFormData({
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      phone: profile?.phone || "",
      location: profile?.location || "",
      nationality: profile?.nationality || "",
      timezone: profile?.timezone || "UTC",
      preferredLanguage: profile?.preferredLanguage || "AZ",
    });
    setIsEditing(false);
    setError("");
  };

  if (!user?.email) return <p>Loading...</p>;

  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-6">
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

      {profile?.image && (
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20">
            <Image
              src={imagePreview || "/default-avatar.png"}
              alt="Profile"
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
        </div>
      )}

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

      {subscription && (
        <div className="pt-6">
          <h3 className="font-semibold text-lg">Platform Membership</h3>
          <p className="text-sm text-gray-700">
            Plan: {subscription.plan} <br />
            Status: {subscription.paymentStatus} <br />
            Next billing date:{" "}
            {subscription.nextBillingDate
              ? subscription.nextBillingDate.toString()
              : "-"}
          </p>
        </div>
      )}

      {company && (
        <div className="pt-6">
          <h3 className="font-semibold text-lg">Company Info</h3>
          <p className="text-sm text-gray-700">
            Business Name: {company.businessName} <br />
            Type: {company.businessType} <br />
            Category: {company.businessCategory} <br />
            Registration Status: {company.registrationStatus}
          </p>
        </div>
      )}

      {serviceSubscriptions.length > 0 && (
        <div className="pt-6">
          <h3 className="font-semibold text-lg">Service Subscriptions</h3>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {serviceSubscriptions.map((s) => (
              <li key={s.id}>
                Service ID: {s.serviceId}, Status: {s.status}, Start:{" "}
                {s.startDate}
              </li>
            ))}
          </ul>
        </div>
      )}

      {reviews.length > 0 && (
        <div className="pt-6">
          <h3 className="font-semibold text-lg">Your Reviews</h3>
          <ul className="space-y-2">
            {reviews.map((review) => (
              <li
                key={review.id}
                className="text-sm text-gray-700 border rounded p-2"
              >
                ⭐ {review.rating} - {review.comment}
              </li>
            ))}
          </ul>
        </div>
      )}

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
