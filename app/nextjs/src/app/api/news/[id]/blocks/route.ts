// nextjs/src/app/api/news/[id]/blocks/route.ts

export async function POST(req: Request, { params }: any) {
  const body = await req.json().catch(() => ({}));
  return Response.json({ id: params?.id, action: "create_block", data: body });
}

export async function PATCH(req: Request, { params }: any) {
  const body = await req.json().catch(() => ({}));
  return Response.json({ id: params?.id, action: "update_block", data: body });
}

export async function DELETE(_req: Request, { params }: any) {
  return Response.json({ id: params?.id, action: "delete_block" });
}
