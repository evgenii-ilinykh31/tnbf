#!/usr/bin/env sh
set -e

echo "[certbot] Certificates renewed, reloading nginx..."
nginx_container=$(docker ps --filter "name=tnbf_nginx" --format "{{.ID}}")
if [ -n "$nginx_container" ]; then
  docker exec "$nginx_container" nginx -t && docker exec "$nginx_container" nginx -s reload
  echo "[certbot] nginx config OK, reloaded."
else
  echo "[certbot] nginx container not found."
fi
