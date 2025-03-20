import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { locales } from "./i18n";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const segments = pathname.split("/");
  const locale = segments[1];

  // If locale is not supported, continue
  if (!locale || !locales.includes(locale as "az" | "en" | "ru" | "de")) {
    return NextResponse.next();
  }

  const routeType = segments[2];

  // Define which routes should be protected.
  const protectedRoutes = [
    "dashboard",
    "admin-dashboard",
    "consultant-dashboard",
  ];
  if (protectedRoutes.includes(routeType)) {
    // Retrieve the token from the request using NextAuth's JWT helper.
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}/signin`, req.url));
    }

    // Role-based access control.
    if (routeType === "admin-dashboard" && token.role !== "admin") {
      return NextResponse.redirect(new URL(`/${locale}/unauthorized`, req.url));
    }
    if (routeType === "consultant-dashboard" && token.role !== "consultant") {
      return NextResponse.redirect(new URL(`/${locale}/unauthorized`, req.url));
    }
    if (routeType === "dashboard" && token.role !== "customer") {
      return NextResponse.redirect(new URL(`/${locale}/unauthorized`, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/:locale/dashboard/:path*",
    "/:locale/admin-dashboard/:path*",
    "/:locale/consultant-dashboard/:path*",
  ],
};
