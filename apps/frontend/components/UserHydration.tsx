"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setUserData, clearUserData } from "@/store/userSlice";

export default function UserHydrator() {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (session?.user?.id && session.user.role) {
      dispatch(
        setUserData({
          id: session.user.id,
          email: session.user.email ?? "",
          role: session.user.role,
          profile:
            typeof session.user.profile === "object"
              ? session.user.profile
              : undefined,
        })
      );
    } else if (!session?.user) {
      dispatch(clearUserData());
    }
  }, [session, dispatch]);

  return null;
}
