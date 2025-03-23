// /app/api/debug-token/route.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("🔑 Token from cookie:", token);

  return NextResponse.json(token);
}
