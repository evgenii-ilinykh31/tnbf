// DEST: nextjs/src/app/api/news/[id]/route.ts
import { getNewsById, updateNews, deleteNews } from "@tnbf/web-next/src/news.controller";

export const GET = getNewsById;     // получить новость по id
export const PATCH = updateNews;    // изменить новость (только мастер)
export const DELETE = deleteNews;   // снять с публикации / удалить (только мастер)
