export async function uploadImage(req: Request) {
  const body = await req.json().catch(() => ({}));
  return Response.json({ ok: true, via: "uploadImage", body });
}

export async function getFeed() {
  return Response.json({ feed: [] });
}
