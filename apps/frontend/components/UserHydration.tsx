"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setUserIdentity, clearUserIdentity } from "@/store/userSlice";
import { fetchUserProfile } from "@/store/profileSlice";

export default function UserHydrator() {
  const { data: session, update, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  // Hydrate user on session load
  useEffect(() => {
    if (session?.user?.id && session.user.role) {
      dispatch(
        setUserIdentity({
          id: session.user.id,
          email: session.user.email ?? "",
          role: session.user.role,
        })
      );
      dispatch(fetchUserProfile(session.user.id));
    } else if (!session?.user) {
      dispatch(clearUserIdentity());
    }
  }, [session, dispatch]);

  // 🔄 Refresh session periodically to keep it alive
  useEffect(() => {
    if (status !== "authenticated") return;

    const interval = setInterval(
      () => {
        update()
          .then(() => {
            console.log("🔁 Session refreshed.");
          })
          .catch((err) => {
            console.warn("❌ Session refresh failed. Logging out...", err);
            signOut({ callbackUrl: "/signin" });
          });
      },
      5 * 60 * 1000
    ); // Refresh every 10 mins

    return () => clearInterval(interval);
  }, [status, update]);

  return null;
}
