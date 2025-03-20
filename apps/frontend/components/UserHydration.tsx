"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { setUserData, clearUserData } from "@/app/store/userSlice";

/**
 * This component checks the NextAuth session
 * and dispatches user data into Redux on mount / update.
 */
export default function UserHydrator() {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (session?.user) {
      dispatch(
        setUserData({
          id: session.user.id || "",
          email: session.user.email || "",
          role: session.user.role || "customer",
          profile:
            typeof session.user.profile === "object"
              ? session.user.profile
              : undefined,
        })
      );
    } else {
      dispatch(clearUserData());
    }
  }, [session, dispatch]);

  return null; // This component doesn't render UI
}
