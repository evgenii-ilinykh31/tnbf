// DEST: nextjs/src/app/api/news/route.ts
import { getFeed, postNews } from "@tnbf/web-next/src/news.controller";

export const GET = getFeed;   // список новостей (лента; режим гость/мастер определяется auth внутри контроллера)
export const POST = postNews; // создать новость (только мастер)
