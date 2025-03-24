export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/reset-password`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
