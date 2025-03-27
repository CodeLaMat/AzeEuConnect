"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import UserProfileCard from "@/components/profile/userProfileCard";

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div>
      <UserProfileCard user={user} />
    </div>
  );
}
