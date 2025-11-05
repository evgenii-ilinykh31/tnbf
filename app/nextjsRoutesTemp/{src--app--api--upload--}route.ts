// DEST: nextjs/src/app/api/upload/route.ts
import { uploadImage } from "@tnbf/web-next/src/news.controller";

export const POST = uploadImage; // загрузка картинки или выдача подписанного URL хранилища (только мастер)
