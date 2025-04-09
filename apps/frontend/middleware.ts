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

  // Validate locale in URL before proceeding.
  if (!locale || !locales.includes(locale as "az" | "en" | "ru" | "de")) {
    return NextResponse.next();
  }

  // ===========================================================
  // 1. Check for a client-side override via cookie (temporary override)
  // ===========================================================
  const localeOverrideCookie = req.cookies.get("NEXT_LOCALE");
  const localeOverride = localeOverrideCookie
    ? localeOverrideCookie.value.toLowerCase()
    : null;

  if (
    localeOverride &&
    supportedLocales.includes(localeOverride) &&
    localeOverride !== locale
  ) {
    const newUrl = req.nextUrl.clone();
    newUrl.pathname = newUrl.pathname.replace(
      `/${locale}`,
      `/${localeOverride}`
    );
    return NextResponse.redirect(newUrl);
  }

  // ===========================================================
  // 2. Get the token and check its expiration (or connectivity loss)
  // ===========================================================
  const token = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as JWT & { expiration?: number };

  // If token exists but is expired, clear the auth cookie and redirect to signin.
  if (token?.expiration && token.expiration < Date.now() / 1000) {
    const res = NextResponse.redirect(new URL(`/${locale}/signin`, req.url));
    // Delete auth cookies. Adjust the cookie name as needed.
    res.cookies.delete("next-auth.session-token");
    // If you use a secure cookie name in production, you might also need to delete:
    res.cookies.delete("__Secure-next-auth.session-token");
    return res;
  }

  // If there is no token at all on a protected route, ensure the user is signed out.
  if (!token) {
    // Optionally, you could also clear cookies here for a clean logout.
    // For protected pages, redirect them to signin.
    // This check may be redundant for public pages.
    if (authPagesRegex.test(pathname) === false) {
      const res = NextResponse.redirect(new URL(`/${locale}/signin`, req.url));
      res.cookies.delete("next-auth.session-token");
      res.cookies.delete("__Secure-next-auth.session-token");
      return res;
    }
  }

  // ===========================================================
  // 3. Redirect logged-in users away from signin/signup pages
  // ===========================================================
  if (authPagesRegex.test(pathname) && token) {
    const preferredLocaleFromToken =
      token.profile?.preferredLanguage?.toLowerCase() || "en";
    return NextResponse.redirect(
      new URL(`/${preferredLocaleFromToken}/dashboard`, req.url)
    );
  }

  // ===========================================================
  // 4. Fallback to token's preferred language (only when no cookie override is present)
  // ===========================================================
  if (!localeOverride && token?.profile?.preferredLanguage) {
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

  // ===========================================================
  // 5. Route-level role protection
  // ===========================================================
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
