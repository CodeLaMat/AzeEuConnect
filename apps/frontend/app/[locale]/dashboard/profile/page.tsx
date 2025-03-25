"use client";
import UserProfileCard from "@/components/profile/userProfileCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="max-w-4xl mx-auto">
      {user?.email ? (
        <UserProfileCard user={user} />
      ) : (
        <p className="text-center text-gray-500">Loading user data...</p>
      )}
    </div>
  );
}
