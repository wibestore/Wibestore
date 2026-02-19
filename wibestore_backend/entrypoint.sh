#!/bin/bash
# ============================================================
# WibeStore Backend - Docker Entrypoint
# ============================================================

set -e

echo "==> WibeStore Entrypoint Started"

echo "==> Making migrations..."
python manage.py makemigrations accounts --noinput
python manage.py makemigrations --noinput

echo "==> Running migrations..."
python manage.py migrate --noinput

echo "==> Collecting static files..."
python manage.py collectstatic --noinput

echo "==> Starting server..."
exec "$@"
