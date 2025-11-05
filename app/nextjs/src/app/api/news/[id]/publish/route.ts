// минимальная и совместимая с Next 16 заглушка
export async function POST(_req: Request, { params }: any) {
  return Response.json({ newsId: params?.id, toggledPublish: true });
}
