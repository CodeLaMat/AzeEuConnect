"use client";

import { useTranslations } from "next-intl";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { FaGoogle, FaSpinner } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

// Redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setUserIdentity } from "@/store/userSlice";
import { fetchUserProfile } from "@/store/profileSlice";
import { getDashboardRoute } from "@/lib/utils";
import { UserRole } from "@prisma/client";
import { supportedLocales } from "@/lib/options";

export default function SignInPage() {
  const t = useTranslations("navbar");
  const { locale } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [error, setError] = useState("");

  // ✅ Redirect if session exists and user is authenticated
  useEffect(() => {
    const redirectToCorrectDashboard = async () => {
      if (session && status === "authenticated") {
        setRedirecting(true); // show the loading screen during redirection
        let updatedSession = await getSession();
        console.log(
          "User currentRole:",
          updatedSession?.user?.currentRole,
          typeof updatedSession?.user?.currentRole
        );

        let retries = 5;
        // Wait until the user currentRole is available
        while (!updatedSession?.user?.currentRole && retries > 0) {
          await new Promise((res) => setTimeout(res, 500));
          updatedSession = await getSession();
          retries--;
        }

        if (updatedSession?.user?.currentRole) {
          // Check for the user's preferred language.
          const preferredLocale =
            updatedSession.user.profile?.preferredLanguage?.toLowerCase();
          const finalLocale =
            preferredLocale && supportedLocales.includes(preferredLocale)
              ? preferredLocale
              : locale;

          const role = updatedSession.user.currentRole.toUpperCase();
          const dashboardPath = getDashboardRoute(role, finalLocale as string);

          // Redirect to the appropriate dashboard or unauthorized page
          if (dashboardPath) {
            router.push(`/${finalLocale}/${dashboardPath}`);
          } else {
            router.push(`/${finalLocale}/unauthorized`);
          }
        } else {
          setError("Login succeeded, but user currentRole is missing.");
          setRedirecting(false);
        }
      }
    };

    redirectToCorrectDashboard();
  }, [session, status, router, locale]);

  // ✅ Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle login with credentials
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.ok) {
        let updatedSession = await getSession();
        let retries = 5;
        // Wait until user currentRole is available
        while (!updatedSession?.user?.currentRole && retries > 0) {
          await new Promise((res) => setTimeout(res, 500));
          updatedSession = await getSession();
          retries--;
        }

        if (updatedSession?.user?.currentRole) {
          const role = updatedSession.user.currentRole.toUpperCase();
          // Dispatch Redux user
          dispatch(
            setUserIdentity({
              id: updatedSession.user.id || "",
              email: updatedSession.user.email || "",
              role: role as UserRole,
              currentRole: role as UserRole,
            })
          );
          dispatch(fetchUserProfile(updatedSession.user.id || ""));
          setRedirecting(true); // trigger loading screen during redirection
        } else {
          setError("Login succeeded, but user currentRole is missing.");
        }
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      console.error("❌ Unexpected error:", error);
      setError("Something went wrong. Please try again later.");
    }

    setLoading(false);
  };

  // ✅ Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await signIn("google", { redirect: false });

      if (result?.ok) {
        let updatedSession = await getSession();
        let retries = 5;
        while (!updatedSession?.user?.currentRole && retries > 0) {
          await new Promise((res) => setTimeout(res, 500));
          updatedSession = await getSession();
          retries--;
        }

        if (updatedSession?.user?.currentRole) {
          const role = updatedSession.user.currentRole.toUpperCase();
          dispatch(
            setUserIdentity({
              id: updatedSession.user.id || "",
              email: updatedSession.user.email || "",
              role: role as UserRole,
              currentRole: role as UserRole,
            })
          );
          dispatch(fetchUserProfile(updatedSession.user.id || ""));
          setRedirecting(true);
        } else {
          setError("Login succeeded, but user currentRole is missing.");
        }
      } else {
        setError("Google authentication failed.");
      }
    } catch (error) {
      console.error("❌ Google Sign-In error:", error);
      setError("Something went wrong during Google sign-in.");
    }

    setLoading(false);
  };

  // Render a full-screen loading view if redirecting
  if (redirecting) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
          <span className="animate-spin text-4xl text-blue-600 mb-4">
            <FaSpinner />
          </span>
          <p className="text-lg font-medium">Redirecting to your dashboard…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-secondary p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center text-primary">
          {t("auth.title")}
        </h1>
        <p className="text-center text-secondary-foreground">
          {t("auth.description")}
        </p>

        {/* Google Login */}
        <Button
          className="flex items-center w-full justify-center mt-4 bg-yellow-600 text-accent font-bold hover:bg-yellow-600 cursor-pointer"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <span className="mr-2 text-accent text-2xl">
            <FaGoogle />
          </span>
          {t("auth.logInWithGoogle")}
        </Button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500">{t("auth.or")}</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder={t("auth.emailPlaceholder")}
            className="w-full px-4 py-2 border rounded-md"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder={t("auth.passwordPlaceholder")}
            className="w-full px-4 py-2 border rounded-md"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Forgot password link */}
          <div className="text-right">
            <span
              onClick={() => router.push(`/${locale}/forgot-password`)}
              className="text-sm text-primary hover:underline cursor-pointer"
            >
              {t("auth.forgotPassword") || "Forgot your password?"}
            </span>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-secondaty hover:bg-blue-700 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Logging in..." : t("auth.login")}
          </Button>
        </form>

        <p className="text-center mt-4 text-primary">
          {t("auth.noAccount")}{" "}
          <span
            onClick={() => router.push(`/${locale}/signup`)}
            className="text-blue-700 hover:underline cursor-pointer"
          >
            {t("auth.signUp")}
          </span>
        </p>
      </div>
    </main>
  );
}
