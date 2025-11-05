import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // создаёт компактный self-contained сервер
  output: "standalone",

  // позволяет импортировать код из ../packages/*
  experimental: { externalDir: true },

  // указываем пакеты из монорепы, которые нужно транспилировать
  transpilePackages: [
    "@tnbf/ui",
    "@tnbf/web-next",
    "@tnbf/core",
    "@tnbf/db",
    "@tnbf/auth",
  ],

  // фиксит warning "inferred workspace root"
  outputFileTracingRoot: path.join(__dirname, ".."),
};

export default {
  output: "standalone",
  experimental: { externalDir: true },
  transpilePackages: ["@tnbf/ui", "@tnbf/web-next", "@tnbf/core", "@tnbf/db", "@tnbf/auth"],
  outputFileTracingRoot: path.join(__dirname, ".."),
} 