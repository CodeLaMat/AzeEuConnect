"use client";

import { useSession } from "next-auth/react";
import { Helix } from "ldrs/react";
import "ldrs/react/Helix.css";

export default function SessionLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen ">
        <Helix size="45" speed="2.5" color="black" />
      </div>
    );
  }

  return <>{children}</>;
}
