"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  fetchUserById,
  updateUserProfileField,
  updateSubscriptionField,
  updateCompanyField,
  updateUserRole,
} from "@/store/adminUserSlice";
import { fetchAllRoles } from "@/store/rolesSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { availableCountries, getTimezoneByCountry } from "@/lib/options";
import { toast } from "sonner";

export default function ManageUserDetailsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations("dashboard.manageUsers.userList");
  const { userId } = useParams();
  const router = useRouter();

  // Global toggle for editing all fields.
  const [globalEditMode, setGlobalEditMode] = useState(false);

  // Local state for Basic Details (read-only)
  const [email, setEmail] = useState("");
  const [accountStatus, setAccountStatus] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [roleName, setRoleName] = useState("");

  // Local state for Profile details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [nationality, setNationality] = useState("");
  const [timezone, setTimezone] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [profileImage, setProfileImage] = useState("");

  // Local state for Subscription (if available)
  const [plan, setPlan] = useState("");

  // Local state for Company details (if available)
  const [businessName, setBusinessName] = useState("");

  // Local state for Role update
  const [newRoleId, setNewRoleId] = useState("");

  const {
    selectedUser: user,
    loading,
    error,
  } = useSelector((state: RootState) => state.adminUsers);
  const { roles } = useSelector((state: RootState) => state.roles);

  console.log("Roles", roles);

  // When user is fetched, sync all fields into local state.
  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setAccountStatus(user.accountStatus);
      setCreatedAt(new Date(user.createdAt).toLocaleString());
      setUpdatedAt(new Date(user.updatedAt).toLocaleString());
      setLastLogin(
        user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"
      );
      setRoleName(user.role?.name || "");
      setNewRoleId((user.role as { id?: string })?.id || "");

      // Profile fields
      setFirstName(user.profile?.firstName || "");
      setLastName(user.profile?.lastName || "");
      setPhone(user.profile?.phone || "");
      setLocation(user.profile?.location || "");
      setNationality(user.profile?.nationality || "");
      setTimezone(user.profile?.timezone || "UTC");
      setPreferredLanguage(user.profile?.preferredLanguage || "");
      setProfileImage(user.profile?.image || "");

      // Subscription
      if (user.subscription) {
        setPlan(user.subscription.plan);
      }

      // Company Details
      if (user.companyDetails) {
        setBusinessName(user.companyDetails.businessName);
      }
    }
  }, [user]);

  // Fetch user and roles data
  useEffect(() => {
    if (typeof userId === "string") {
      dispatch(fetchUserById(userId));
    }
    dispatch(fetchAllRoles());
  }, [dispatch, userId]);

  if (loading || !user) return <Skeleton className="h-64 w-full rounded-lg" />;
  if (error) return <p className="text-red-500">{error}</p>;

  // Validate only required fields (firstName and lastName)
  const requiredSchema = z
    .string()
    .min(1, { message: "This field is required" });

  // Global save handler – validates and dispatches all updates, including role change.
  const handleGlobalSave = async () => {
    try {
      const firstNameValidation = requiredSchema.safeParse(firstName);
      if (!firstNameValidation.success) {
        toast.error(
          `First Name: ${firstNameValidation.error.errors[0].message}`
        );
        return;
      }
      const lastNameValidation = requiredSchema.safeParse(lastName);
      if (!lastNameValidation.success) {
        toast.error(`Last Name: ${lastNameValidation.error.errors[0].message}`);
        return;
      }

      // Update profile fields.
      const profileUpdates = [
        { fieldName: "firstName", value: firstName },
        { fieldName: "lastName", value: lastName },
        { fieldName: "phone", value: phone },
        { fieldName: "location", value: location },
        { fieldName: "nationality", value: nationality },
        { fieldName: "timezone", value: timezone },
        { fieldName: "preferredLanguage", value: preferredLanguage },
      ];
      await Promise.all(
        profileUpdates.map((update) =>
          dispatch(
            updateUserProfileField({
              userId: user.id,
              fieldName: update.fieldName,
              value: update.value,
            })
          ).unwrap()
        )
      );

      // Update subscription if available.
      if (user.subscription) {
        await dispatch(
          updateSubscriptionField({
            userId: user.id,
            fieldName: "plan",
            value: plan,
          })
        ).unwrap();
      }

      // Update company details if available.
      if (user.companyDetails) {
        await dispatch(
          updateCompanyField({
            userId: user.id,
            fieldName: "businessName",
            value: businessName,
          })
        ).unwrap();
      }

      // Update user role if changed.
      if (newRoleId && newRoleId !== (user.role as { id?: string })?.id) {
        await dispatch(
          updateUserRole({ userId: user.id, roleId: newRoleId })
        ).unwrap();
      }

      setGlobalEditMode(false);
      toast.success("Changes saved successfully!", {
        description: "Your updates have been applied.",
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to save changes");
    }
  };

  return (
    <div className="relative min-h-screen ">
      {/* Global Edit Toggle Button */}
      <div className="absolute top-6 right-6">
        <Button onClick={() => setGlobalEditMode((prev) => !prev)} size="sm">
          {globalEditMode ? "Disable Edit" : "Enable Edit"}
        </Button>
      </div>
      {/* Basic Details (Read-only) */}
      <Section title="Basic Details">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profileImage} />
            <AvatarFallback>
              {firstName.charAt(0) || ""}
              {lastName.charAt(0) || ""}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-3xl font-bold">
              {firstName} {lastName}
            </h2>
            <p className="text-gray-600">{email}</p>
          </div>
        </div>
        <ReadOnlyField label="Account Status" value={accountStatus} />
        <ReadOnlyField label="Created At" value={createdAt} />
        <ReadOnlyField label="Updated At" value={updatedAt} />
        <ReadOnlyField label="Last Login" value={lastLogin} />
        <ReadOnlyField label="Role" value={roleName} />
      </Section>

      <div className="space-y-8 flex flex-row flex-wrap gap-8">
        <div className="flex-col gap-8 w-1/3">
          {/* Profile Section */}
          <Section title="Profile ">
            <Field
              label="First Name"
              value={firstName}
              globalEditMode={globalEditMode}
              onChange={setFirstName}
            />
            <Field
              label="Last Name"
              value={lastName}
              globalEditMode={globalEditMode}
              onChange={setLastName}
            />
            <Field
              label="Phone"
              value={phone}
              globalEditMode={globalEditMode}
              onChange={setPhone}
            />
            {/* Country select for location */}
            <div className="mb-4">
              <label className="block text-gray-500 text-sm mb-1">
                Country
              </label>
              {globalEditMode ? (
                <select
                  value={location}
                  onChange={(e) => {
                    const country = e.target.value;
                    setLocation(country);
                    setTimezone(getTimezoneByCountry(country));
                  }}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="">Select a country</option>
                  {availableCountries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-lg font-medium text-gray-800">
                  {location || "-"}
                </p>
              )}
            </div>
            <Field
              label="Nationality"
              value={nationality}
              globalEditMode={globalEditMode}
              onChange={setNationality}
            />
            <Field
              label="Timezone"
              value={timezone}
              globalEditMode={globalEditMode}
              onChange={setTimezone}
            />
            <div>
              <label
                htmlFor="preferredLanguage"
                className="block mb-1 font-medium text-gray-500"
              >
                Preferred Language
              </label>
              <select
                id="preferredLanguage"
                name="preferredLanguage"
                disabled={!globalEditMode}
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="AZ">Azerbaijani</option>
                <option value="EN">English</option>
                <option value="DE">German</option>
                <option value="FR">French</option>
                <option value="NL">Dutch</option>
              </select>
            </div>
          </Section>
        </div>
        <div className="flex-col gap-8 w-1/3">
          {/* Subscription Section */}

          <Section title="Subscription">
            <Field
              label="Plan"
              value={plan}
              globalEditMode={globalEditMode}
              onChange={setPlan}
            />
          </Section>

          {/* Company Details Section */}

          <Section title="Company Details">
            <Field
              label="Business Name"
              value={businessName}
              globalEditMode={globalEditMode}
              onChange={setBusinessName}
            />
            {/* Additional company fields can be added here */}
          </Section>
        </div>
        {/* Role Management Section */}
        <Section title="User Role">
          {globalEditMode ? (
            <div className="mb-4">
              <label className="block text-gray-500 text-sm mb-1">Role</label>
              <select
                value={newRoleId}
                onChange={(e) => setNewRoleId(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Select a role</option>
                {roles.map((role: any) => (
                  <option key={role?.name} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <ReadOnlyField label="Role" value={roleName} />
          )}
        </Section>
      </div>

      {/* Global Save Changes Button */}
      {globalEditMode && (
        <div className="text-right">
          <Button onClick={handleGlobalSave} size="default">
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
}

// Field Component: Renders an input when in global edit mode; otherwise, displays text.
function Field({
  label,
  value,
  globalEditMode,
  onChange,
}: {
  label: string;
  value: string;
  globalEditMode: boolean;
  onChange: (val: string) => void;
}) {
  return (
    <div className="mb-4">
      <label className="block text-gray-500 text-sm mb-1">{label}</label>
      {globalEditMode ? (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full"
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      ) : (
        <p className="text-lg font-medium text-gray-800">{value || "-"}</p>
      )}
    </div>
  );
}

// ReadOnlyField Component: Displays a label and value without editing.
function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-500 text-sm mb-1">{label}</label>
      <p className="text-lg font-medium text-gray-800">{value || "-"}</p>
    </div>
  );
}

// Section Component: Wraps a group of fields in a card-style container.
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow mb-8">
      <h3 className="text-2xl font-semibold mb-4 text-blue-800">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
