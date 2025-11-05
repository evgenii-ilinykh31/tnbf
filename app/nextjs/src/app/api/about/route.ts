// nextjs/src/app/api/about/route.ts
export async function GET() {
  return Response.json({ about: true });
}

export async function PUT(req: Request) {
  const body = await req.json().catch(() => ({}));
  return Response.json({ updated: true, body });
}

export async function PATCH(req: Request) {
  const body = await req.json().catch(() => ({}));
  return Response.json({ patched: true, body });
}