import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const SUPPORTED = ["en", "ru"] as const;
const DEFAULT_LOCALE = "en";
const PREFIX = "/november27";

// Пути/паттерны, которые НЕ нужно трогать
const IGNORE_PREFIXES = [
  "/_next",               // статические ассеты Next
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/api",                 // ваши API-роуты tnbf
];

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl;

  // если не наш домен — пропускаем
  if (!host.includes("november27.org")) {
    return NextResponse.next();
  }

  // игнорируем технику/статику, чтобы ничего не ломать
  const p = url.pathname;
  if (IGNORE_PREFIXES.some((pre) => p === pre || p.startsWith(pre + "/"))) {
    return NextResponse.next();
  }

  // Если уже внутри /november27 — ничего не переписываем
  if (p === PREFIX || p.startsWith(PREFIX + "/")) {
    return NextResponse.next();
  }

  // Определим, не начинается ли путь с поддерживаемой локали
  const seg = p.split("/").filter(Boolean)[0]; // первый сегмент пути
  const hasLocale = SUPPORTED.includes(seg as any);
  const locale = hasLocale ? seg : DEFAULT_LOCALE;

  // Пример:
  //  "/"            -> "/november27/en"
  //  "/contact"     -> "/november27/en/contact"
  //  "/ru/anything" -> "/november27/ru/anything"
  url.pathname = `${PREFIX}/${locale}${hasLocale ? p.slice(seg.length + 1) || "" : (p === "/" ? "" : p)}`;

  return NextResponse.rewrite(url);
}

export const config = {
  // матчим все, кроме статики и известных файлов — оставим /api нетронутым
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
