#!/bin/sh
set -e
export PORT="${PORT:-80}"
# BACKEND_URL berilganda /api/* so'rovlarni backend ga proxy qilamiz (405 bartaraf)
if [ -n "$BACKEND_URL" ]; then
  export BACKEND_URL="${BACKEND_URL%/}"
  envsubst '${PORT} ${BACKEND_URL}' < /etc/nginx/conf.d/default.proxy.template > /etc/nginx/conf.d/default.conf
else
  envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
fi
exec nginx -g "daemon off;"
