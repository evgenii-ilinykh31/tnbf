#!/bin/bash
set -e

DATE=$(date +%F_%H-%M)
BACKUP_DIR="/opt/tnbf/backup/$DATE"

echo "📦 Создание полного бэкапа Docker окружения в $BACKUP_DIR ..."
mkdir -p "$BACKUP_DIR/volumes" "$BACKUP_DIR/configs"

# 1️⃣ Сохранить все образы (только те, что связаны с tnbf)
echo "→ Сохраняем образы..."
docker save $(docker images --format '{{.Repository}}:{{.Tag}}' | grep tnbf || true) \
  -o "$BACKUP_DIR/tnbf_images.tar" || echo "⚠️ Нет кастомных образов для tnbf"

# 2️⃣ Сохранить все volume, относящиеся к tnbf
echo "→ Сохраняем volume..."
for VOL in $(docker volume ls -q | grep tnbf || true); do
  echo "   Архивируем volume $VOL..."
  docker run --rm -v ${VOL}:/volume -v "$BACKUP_DIR/volumes:/backup" alpine \
    tar czf /backup/${VOL}.tar.gz -C /volume .
done

# 3️⃣ Сохранить конфиги, Dockerfile, nginx, env и certbot
echo "→ Сохраняем конфигурацию..."
tar czf "$BACKUP_DIR/tnbf_configs.tar.gz" \
  -C /opt/tnbf compose env nginx certbot db scripts app || true

# 4️⃣ Сохранить список контейнеров, images и volume
echo "→ Сохраняем списки..."
docker ps -a > "$BACKUP_DIR/docker_ps.txt"
docker images > "$BACKUP_DIR/docker_images.txt"
docker volume ls > "$BACKUP_DIR/docker_volumes.txt"

echo "✅ Бэкап завершён!"
echo "Архивы сохранены в: $BACKUP_DIR"
