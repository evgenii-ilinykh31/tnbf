// DEST: nextjs/src/app/api/about/route.ts
import { getAbout, updateAbout } from "@tnbf/web-next/src/about.controller";

export const GET = getAbout;         // получить содержимое "О нас"
export const PUT = updateAbout;      // заменить полностью — только мастер
export const PATCH = updateAbout;    // частично обновить — только мастер
