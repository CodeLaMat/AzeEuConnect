"use client";

import { FormEvent, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import { availableCountries, getTimezoneByCountry } from "@/lib/options";

// ✅ Schema Validation
const registerSchema = z
  .object({
    firstName: z.string().min(3, "First Name is required"),
    lastName: z.string().min(3, "Last Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(7, "Phone number is required"),
    location: z.string().min(3, "Location (Country) is required"),
    nationality: z.string().min(3, "Nationality is required"),
    timezone: z.string().min(3, "Timezone is required"),
    preferredLanguage: z.enum(["AZ", "EN", "DE", "FR", "NL"]),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const router = useRouter();
  const { locale } = useParams();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    nationality: "",
    timezone: "UTC",
    preferredLanguage: "AZ",
    password: "",
    confirmPassword: "",
  });

  // UI states
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Handle form input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "location" && { timezone: getTimezoneByCountry(value) }),
    }));
  };

  // ✅ Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      setError(result.error.errors[0].message);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        router.push(`/${locale}/signin`);
      } else {
        const data = await res.json();
        setError(data.message || "Registration failed");
      }
    } catch (err: any) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-md shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create an Account
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* FIRST NAME */}
          <InputField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="John"
          />

          {/* LAST NAME */}
          <InputField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Doe"
          />

          {/* EMAIL */}
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="johndoe@example.com"
          />

          {/* PHONE */}
          <InputField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+994 50 123 4567"
          />

          {/* LOCATION */}
          <div>
            <label htmlFor="location" className="block mb-1 font-medium">
              Country
            </label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select a country</option>
              {availableCountries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* NATIONALITY */}
          <InputField
            label="Nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            placeholder="Azerbaijani"
          />

          {/* TIMEZONE */}
          {/* TIMEZONE (READ-ONLY) */}
          <InputField
            label="Timezone"
            name="timezone"
            value={formData.timezone}
            onChange={handleChange}
            placeholder="Auto-filled based on country"
            type="text"
          />

          {/* PREFERRED LANGUAGE */}
          <div>
            <label
              htmlFor="preferredLanguage"
              className="block mb-1 font-medium"
            >
              Preferred Language
            </label>
            <select
              id="preferredLanguage"
              name="preferredLanguage"
              value={formData.preferredLanguage}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="AZ">Azerbaijani</option>
              <option value="EN">English</option>
              <option value="DE">German</option>
              <option value="FR">French</option>
              <option value="NL">Dutch</option>
            </select>
          </div>

          {/* PASSWORD */}
          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          {/* CONFIRM PASSWORD */}
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-secondary text-white font-semibold rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a
            href={`/${locale}/signin`}
            className="text-blue-600 hover:underline"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

// ✅ Reusable InputField Component
const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) => (
  <div>
    <label htmlFor={name} className="block mb-1 font-medium">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border rounded"
      placeholder={placeholder}
    />
  </div>
);
