import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { authorize } from "@/lib/rbac";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.role || !authorize(session.user.role, "CREATE_ORDER")) {
    return new Response("Unauthorized", { status: 403 });
  }

  return new Response("✅ Order created");
}
