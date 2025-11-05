// DEST: nextjs/src/app/api/news/[id]/blocks/route.ts
import { addBlock, updateBlock, deleteBlock } from "@tnbf/web-next/src/news.controller";

export const POST = addBlock;     // добавить блок (текст/картинка) — только мастер
export const PATCH = updateBlock; // изменить блок — только мастер
export const DELETE = deleteBlock;// удалить блок — только мастер
