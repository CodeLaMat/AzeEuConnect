"use client";

import { useTranslations } from "next-intl";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const t = useTranslations("navbar");
  const { locale } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (session) {
      router.push(`/${locale}/dashboard`);
    }
  }, [session, router, locale]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: `/${locale}/dashboard`,
    });
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center text-blue-700">
          {t("auth.title")}
        </h1>
        <p className="text-center text-gray-600">{t("auth.description")}</p>

        {/* Google Login */}
        <Button
          className="flex items-center w-full justify-center mt-4 bg-yellow-500 text-black font-bold hover:bg-yellow-600"
          onClick={() =>
            signIn("google", { callbackUrl: `/${locale}/dashboard` })
          }
        >
          <FaGoogle className="mr-2" />
          {t("auth.logInWithGoogle")}
        </Button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500">{t("auth.or")}</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Email & Password Login */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder={t("auth.emailPlaceholder")}
            className="w-full px-4 py-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder={t("auth.passwordPlaceholder")}
            className="w-full px-4 py-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            {t("auth.login")}
          </Button>
        </form>

        <p className="text-center mt-4 text-gray-600">
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
