"use client";

import { FormEvent, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";

const registerSchema = z
  .object({
    firstName: z.string().min(3, "First Name is required"),
    lastName: z.string().min(3, "Last Name is required"),
    email: z.string().email("Invalid email address"),
    location: z.string().min(3, "Location (Country) is required"),
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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI states
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = {
      firstName,
      lastName,
      email,
      location,
      password,
      confirmPassword,
    };

    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      const zodError = result.error.errors[0];
      setError(zodError.message);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            location,
          }),
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
          <div>
            <label htmlFor="firstName" className="block mb-1 font-medium">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="John"
            />
          </div>

          {/* LAST NAME */}
          <div>
            <label htmlFor="lastName" className="block mb-1 font-medium">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Doe"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="johndoe@example.com"
            />
          </div>

          {/* LOCATION */}
          <div>
            <label htmlFor="location" className="block mb-1 font-medium">
              Country
            </label>
            <input
              id="location"
              type="text"
              placeholder="e.g. Azerbaijan"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label htmlFor="confirmPassword" className="block mb-1 font-medium">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
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
