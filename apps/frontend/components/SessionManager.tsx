"use client";

import { useSession, getSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SessionManager() {
  const { data: session, status, update } = useSession();
  const [showPopup, setShowPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session) {
      const checkExpiration = () => {
        const currentTime = Math.floor(Date.now() / 1000);
        const expiresIn = (session as any).expiresIn;

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
      };

      checkExpiration();
      const interval = setInterval(checkExpiration, 1000);

      return () => clearInterval(interval);
    }
  }, [session, status]);

  const renewSession = async () => {
    try {
      await update();
      console.log("✅ Session refreshed:");
      setShowPopup(false);
      setTimeLeft(null);
    } catch (error) {
      console.error("Error refreshing session:", error);
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
