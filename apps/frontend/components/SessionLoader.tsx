// components/SessionLoader.tsx
"use client";

import { useSession } from "next-auth/react";
import { FaSpinner } from "react-icons/fa";

export default function SessionLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <span className="animate-spin text-4xl text-blue-600 mb-4">
            <FaSpinner />
          </span>
          <p className="text-lg font-medium">Loading session...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
