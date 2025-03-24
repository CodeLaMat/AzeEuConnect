"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { locale } = useParams();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/request-password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("If your email exists, a reset link has been sent.");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Forgot Password Error:", error);
      setStatus("error");
      setMessage("Unexpected error occurred.");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">
          Forgot Password
        </h2>

        {message && (
          <div
            className={`p-3 mb-4 rounded ${
              status === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Your email"
            className="w-full px-4 py-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            Send Reset Link
          </Button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Back to{" "}
          <span
            onClick={() => router.push(`/${locale}/signin`)}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </p>
      </div>
    </main>
  );
}
