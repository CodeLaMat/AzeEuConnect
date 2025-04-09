import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { protectedSubRoutes } from "./lib/roleBasedLinks";
import { UserRole } from "@prisma/client";
import { supportedLocales } from "./lib/options";
import type { JWT } from "next-auth/jwt";

const locales = ["en", "az", "de", "ru"];
const authPagesRegex = /^\/(en|az|de|ru)\/(signin|signup)/;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const segments = pathname.split("/");
  const locale = segments[1];

  const token = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as JWT & { expiration?: number };

  // Redirect logged-in users away from signin/signup pages
  if (authPagesRegex.test(pathname) && token) {
    const preferredLocale =
      token.profile?.preferredLanguage?.toLowerCase() || "en";
    return NextResponse.redirect(
      new URL(`/${preferredLocale}/dashboard`, req.url)
    );
  }

  // Validate locale in URL
  if (!locale || !locales.includes(locale as "az" | "en" | "ru" | "de")) {
    return NextResponse.next();
  }

  // Check token expiration
  if (token?.expiration && token.expiration < Date.now() / 1000) {
    return NextResponse.redirect(new URL(`/${locale}/signin`, req.url));
  }

  // Redirect to preferred language version
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

  // Route-level role protection
  const routeType = segments[2];
  if (protectedSubRoutes[routeType]) {
    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}/signin`, req.url));
    }

    const userRole = token.role?.toUpperCase();
    const allowedRoles = protectedSubRoutes[routeType];

    if (!userRole || !allowedRoles.includes(userRole as UserRole)) {
      return NextResponse.redirect(new URL(`/${locale}/unauthorized`, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: Object.keys(protectedSubRoutes).flatMap((subRoute) =>
    locales.map((locale) => `/${locale}/${subRoute}/:path*`)
  ),
};
