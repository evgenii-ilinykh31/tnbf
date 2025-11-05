// nextjs/src/app/api/scroll-state/route.ts
export async function GET() {
  return Response.json({ postId: null, blockIndex: 0 });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  return Response.json({ saved: true, body });
}
