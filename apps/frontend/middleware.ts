import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { locales } from "./i18n";
import { protectedSubRoutes } from "./lib/roleBasedLinks";
import { UserRole } from "@prisma/client";
import { supportedLocales } from "./lib/getTranslations";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const segments = pathname.split("/");
  const locale = segments[1];

  // ✅ Validate locale
  if (!locale || !locales.includes(locale as "az" | "en" | "ru" | "de")) {
    return NextResponse.next();
  }

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

  // ✅ Apply access control if route is protected
  if (protectedSubRoutes[routeType]) {
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
    const allowedRoles = protectedSubRoutes[routeType];
    if (!allowedRoles.includes(userRole as UserRole)) {
      console.warn(`⚠️ User role "${userRole}" not allowed for "${routeType}"`);
      return NextResponse.redirect(new URL(`/${locale}/unauthorized`, req.url));
    }
  }

  return NextResponse.next();
}

// ✅ Apply middleware only to protected subroutes
export const config = {
  matcher: Object.keys(protectedSubRoutes).flatMap((subRoute) =>
    locales.map((locale) => `/${locale}/${subRoute}/:path*`)
  ),
};
