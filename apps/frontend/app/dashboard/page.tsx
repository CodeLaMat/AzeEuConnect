"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    router.push("/");
    return null;
  }

  return (
    <div className="container mx-auto py-12 px-6">
      <h2 className="text-3xl font-semibold text-gray-800">
        Welcome, {session.user?.name}
      </h2>
      <p className="text-gray-600 mt-2">
        Manage your business registrations and documents.
      </p>
    </div>
  );
}
