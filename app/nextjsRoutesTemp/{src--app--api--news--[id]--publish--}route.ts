// DEST: nextjs/src/app/api/news/[id]/publish/route.ts
import { togglePublish } from "@tnbf/web-next/src/news.controller";

export const POST = togglePublish; // опубликовать/снять с публикации — только мастер
