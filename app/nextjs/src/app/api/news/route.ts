export async function GET(_req: Request) {
  // заглушка: вернуть ленту
  return Response.json({ feed: [] });
}

export async function POST(req: Request) {
  // заглушка: создать новость
  const body = await req.json().catch(() => ({}));
  return Response.json({ created: true, body }, { status: 201 });
}