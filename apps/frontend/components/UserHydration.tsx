"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setUserIdentity, clearUserIdentity } from "@/store/userSlice";
import { fetchUserProfile } from "@/store/profileSlice";

export default function UserHydrator() {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (session?.user?.id && session.user.role) {
      dispatch(
        setUserIdentity({
          id: session.user.id,
          email: session.user.email ?? "",
          role: session.user.role,
        })
      );

      // Fetch full profile info after setting identity
      dispatch(fetchUserProfile(session.user.id));
    } else if (!session?.user) {
      dispatch(clearUserIdentity());
    }
  }, [session, dispatch]);

  return null;
}
