"use client";

import Sidebar from "@/components/sidebar/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = useSelector((state: RootState) => state.user.role);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role={role} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
