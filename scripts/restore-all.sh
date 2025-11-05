#!/bin/bash
set -euo pipefail

usage() {
  cat <<USAGE
Usage: $0 <backup_dir> [--with-configs]

<backup_dir> — папка с бэкапом, созданная backup-all.sh, например:
/opt/tnbf/backup/2025-11-02_21-45

Опции:
  --with-configs   ВОССТАНОВИТЬ каталоги compose, env, nginx, certbot, db, scripts, app из архива.
                   По умолчанию конфиги не трогаем.

Примеры:
  $0 /opt/tnbf/backup/2025-11-02_21-45            # восстановить образы + volumes, конфиги оставить
  $0 /opt/tnbf/backup/2025-11-02_21-45 --with-configs  # ещё и конфиги перезаписать
USAGE
}

if [[ $# -lt 1 ]]; then usage; exit 1; fi

BACKUP_DIR="$1"
WITH_CONFIGS="${2:-}"

if [[ ! -d "$BACKUP_DIR" ]]; then
  echo "❌ Нет каталога бэкапа: $BACKUP_DIR"
  exit 1
fi

echo "🔁 Восстановление из: $BACKUP_DIR"

# 0) Опционально восстановим конфиги (до поднятия контейнеров)
if [[ "$WITH_CONFIGS" == "--with-configs" ]]; then
  CFG_TAR="$BACKUP_DIR/tnbf_configs.tar.gz"
  if [[ -f "$CFG_TAR" ]]; then
    echo "→ Останавливаем стек для восстановления конфигов..."
    (cd /opt/tnbf && docker compose -f compose/docker-compose.prod.yml down || true)

    echo "→ Восстанавливаем конфиги в /opt/tnbf из $CFG_TAR ..."
    tar xzf "$CFG_TAR" -C /opt/tnbf
  else
    echo "⚠️  Архив конфигов не найден: $CFG_TAR (пропускаем шаг)"
  fi
fi

# 1) Загрузим образы (если архив есть)
IMAGES_TAR="$BACKUP_DIR/tnbf_images.tar"
if [[ -f "$IMAGES_TAR" ]]; then
  echo "→ Загружаем Docker-образы из $IMAGES_TAR ..."
  docker load -i "$IMAGES_TAR"
else
  echo "⚠️  Архив образов не найден: $IMAGES_TAR (пропускаем шаг)"
fi

# 2) Восстановим volumes
VOL_DIR="$BACKUP_DIR/volumes"
if [[ -d "$VOL_DIR" ]]; then
  echo "→ Восстанавливаем volumes из $VOL_DIR ..."
  for ARCH in "$VOL_DIR"/*.tar.gz; do
    [[ -e "$ARCH" ]] || { echo "   (нет архивов volumes — пропускаем)"; break; }
    VOL_BASENAME="$(basename "$ARCH" .tar.gz)"
    echo "   • volume: $VOL_BASENAME"
    docker volume create "$VOL_BASENAME" >/dev/null
    docker run --rm -v "${VOL_BASENAME}:/volume" -v "$VOL_DIR:/backup" alpine \
      sh -lc "cd /volume && tar xzf /backup/$(basename "$ARCH")"
  done
else
  echo "⚠️  Каталог с volume-архивами не найден: $VOL_DIR (пропускаем шаг)"
fi

# 3) Поднимем стек
echo "→ Поднимаем стек..."
cd /opt/tnbf
docker compose -f compose/docker-compose.prod.yml up -d

# 4) Быстрая проверка nginx и список контейнеров
echo "→ Проверяем nginx конфиг..."
docker exec tnbf_nginx nginx -t || true

echo "→ Текущие контейнеры:"
docker ps

echo "✅ Готово. Если правили конфиги — при необходимости перезагрузите nginx:"
echo "   docker exec tnbf_nginx nginx -s reload"
