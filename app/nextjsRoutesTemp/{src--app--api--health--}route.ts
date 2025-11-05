// DEST: nextjs/src/app/api/health/route.ts
export const GET = async () =>
  Response.json({ ok: true, service: "tnbf", ts: Date.now() });
