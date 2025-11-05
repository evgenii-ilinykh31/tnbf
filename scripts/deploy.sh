#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

# --- ПЕРВИЧНЫЙ ВЫПУСК СЕРТИФИКАТА (однократно перед первым запуском HTTPS) ---
# ВНИМАНИЕ: замени домены и email (строки 11–12).
# docker compose -f compose/docker-compose.prod.yml run --rm certbot \
#   certonly --webroot -w /var/www/certbot \
#   -d tnbf.art -d www.tnbf.art \
#   --email zhenya.ilinykh@gmail.com --agree-tos --no-eff-email

# --- ЗАПУСК СТЕКА ---
docker compose -f compose/docker-compose.prod.yml up -d --build

# --- ПРОСМОТР ЛОГОВ (опционально) ---
# docker compose -f compose/docker-compose.prod.yml logs -f
