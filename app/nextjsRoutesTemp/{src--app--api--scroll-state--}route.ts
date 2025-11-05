// DEST: nextjs/src/app/api/scroll-state/route.ts
import { getScrollState, saveScrollState } from "@tnbf/web-next/src/users.controller";

export const GET = getScrollState;   // вернуть из БД/кук: на какой новости/блоке остановился пользователь
export const POST = saveScrollState; // сохранить позицию (новостьId, индексБлока) — бэкенд-валидация внутри контроллера
