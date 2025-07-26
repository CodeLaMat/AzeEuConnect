"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";

export default function SessionManager() {
  const { data: session, status, update } = useSession();
  const [showPopup, setShowPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [lastActivity, setLastActivity] = useState<number>(Date.now());

  const checkExpiration = useCallback(() => {
    if (status === "authenticated" && session) {
      const currentTime = Math.floor(Date.now() / 1000);
      const expiresIn = (session as any)?.expiresIn;

      if (!expiresIn) return;

      const secondsLeft = expiresIn - currentTime;
      setTimeLeft(secondsLeft);

      if (secondsLeft <= 60 && secondsLeft > 0) {
        setShowPopup(true);
      } else if (secondsLeft <= 0) {
        signOut();
      } else {
        setShowPopup(false);
      }

      // 🔁 Refresh session if user was active and only ~2 min left
      if (secondsLeft <= 120 && Date.now() - lastActivity < 2 * 60 * 1000) {
        update();
        console.log("🔄 Session auto-refreshed due to activity");
      }
    }
  }, [session, status, lastActivity, update]);

  useEffect(() => {
    if (status === "authenticated" && session) {
      const interval = setInterval(checkExpiration, 1000);
      return () => clearInterval(interval);
    }
  }, [checkExpiration, session, status]);

  // 🖱️ Track user activity
  useEffect(() => {
    const updateActivity = () => setLastActivity(Date.now());

    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("keydown", updateActivity);
    window.addEventListener("click", updateActivity);

    return () => {
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("keydown", updateActivity);
      window.removeEventListener("click", updateActivity);
    };
  }, []);

  const renewSession = async () => {
    try {
      await update();
      console.log("✅ Session manually refreshed");
      setShowPopup(false);
      setTimeLeft(null);
    } catch (error) {
      console.error("⚠️ Error refreshing session:", error);
      signOut();
    }
  };

  return (
    <>
      {showPopup && timeLeft !== null && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff3cd",
            color: "#856404",
            border: "1px solid #ffeeba",
            padding: "1.5rem",
            borderRadius: 10,
            boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
            textAlign: "center",
            zIndex: 9999,
            minWidth: "300px",
          }}
        >
          <p style={{ fontWeight: 500 }}>
            Your session will expire in <strong>{timeLeft}</strong> seconds.
          </p>
          <button
            onClick={renewSession}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1.2rem",
              fontSize: "1rem",
              fontWeight: 600,
              backgroundColor: "#ffc107",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              color: "#000",
            }}
          >
            Stay Logged In
          </button>
        </div>
      )}
    </>
  );
}
