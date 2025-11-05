# ===========================
# 1. Builder stage
# ===========================
FROM node:20-alpine AS builder
WORKDIR /app

# установить зависимости для сборки
RUN apk add --no-cache openssl git

# скопировать манифесты и исходники монорепы
COPY package*.json ./
COPY packages ./packages
COPY nextjs ./nextjs

# обновить npm и включить поддержку workspaces
RUN npm install -g npm@11 && npm config set workspaces true

# удалить локальный lock в подпроекте, чтобы не мешал воркспейсам
RUN rm -f nextjs/package-lock.json

# установка зависимостей во всех workspace
# RUN npm ci
RUN npm install --workspaces --include-workspace-root

# сборка Next.js с output=standalone
RUN npm run -w nextjs build

# ===========================
# 2. Runner stage
# ===========================
FROM node:20-alpine AS runner
WORKDIR /app


# копируем standalone-бандл, который Next собрал автоматически
COPY --from=builder /app/nextjs/.next/standalone ./
COPY --from=builder /app/nextjs/.next/static ./nextjs/.next/static
COPY --from=builder /app/nextjs/public ./nextjs/public

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["node", "nextjs/server.js"]
