// nextjs/src/app/api/news/[id]/route.ts

export async function GET(_req: Request, { params }: any) {
  return Response.json({ id: params.id });
}

export async function PATCH(req: Request, { params }: any) {
  const body = await req.json().catch(() => ({}));
  return Response.json({ id: params.id, patched: true, body });
}

export async function DELETE(_req: Request, { params }: any) {
  return Response.json({ id: params.id, deleted: true });
}
