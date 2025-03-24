import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { locales } from "./i18n";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const segments = pathname.split("/");
  const locale = segments[1];

  // ✅ Validate locale
  if (!locale || !locales.includes(locale as "az" | "en" | "ru" | "de")) {
    return NextResponse.next();
  }

  const supportedLocales = ["az", "en", "ru", "de"];

  // Check token for profile preferred language
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (token?.profile?.preferredLanguage) {
    const preferredLocale = token.profile.preferredLanguage.toLowerCase();
    if (
      supportedLocales.includes(preferredLocale) &&
      preferredLocale !== locale
    ) {
      const newUrl = req.nextUrl.clone();
      newUrl.pathname = newUrl.pathname.replace(
        `/${locale}`,
        `/${preferredLocale}`
      );
      return NextResponse.redirect(newUrl);
    }
  }

  // Validate locale from URL
  if (!locale || !supportedLocales.includes(locale)) {
    return NextResponse.next();
  }

  const routeType = segments[2];

  // ✅ Define role-based access per dashboard
  const protectedRoutes: Record<string, string[]> = {
    "admin-dashboard": ["ADMIN"],
    "consultant-dashboard": ["CONSULTANT", "ADMIN"],
    "support-dashboard": ["SUPPORT_AGENT", "ADMIN"],
    "legal-dashboard": ["LEGAL_ADVISOR", "ADMIN"],
    "regulatory-dashboard": ["REGULATORY_OFFICER", "ADMIN"],
    dashboard: ["USER", "ADMIN"], // Only USER and ADMIN can access /dashboard
  };

  // ✅ Apply access control if route is protected
  if (protectedRoutes[routeType]) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // 🔒 Not logged in
    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}/signin`, req.url));
    }

    const userRole = token.role?.toUpperCase();

    // 🔒 No role assigned
    if (!userRole) {
      console.warn(
        "⚠️ User has no role assigned, redirecting to unauthorized..."
      );
      return NextResponse.redirect(new URL(`/${locale}/unauthorized`, req.url));
    }

    // 🔒 Role not allowed
    const allowedRoles = protectedRoutes[routeType];
    if (!allowedRoles.includes(userRole)) {
      console.warn(`⚠️ User role "${userRole}" not allowed for "${routeType}"`);
      return NextResponse.redirect(new URL(`/${locale}/unauthorized`, req.url));
    }
  }

  return NextResponse.next();
}

// ✅ Apply middleware only to dashboard routes
export const config = {
  matcher: [
    "/:locale/dashboard/:path*",
    "/:locale/admin-dashboard/:path*",
    "/:locale/consultant-dashboard/:path*",
    "/:locale/support-dashboard/:path*",
    "/:locale/legal-dashboard/:path*",
    "/:locale/regulatory-dashboard/:path*",
  ],
};
