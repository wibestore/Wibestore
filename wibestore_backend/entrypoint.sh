#!/bin/bash
# ============================================================
# WibeStore Backend - Docker Entrypoint
# ============================================================

set -e

echo "==> WibeStore Entrypoint Started"

echo "==> Making migrations..."
python manage.py makemigrations accounts --noinput
python manage.py makemigrations --noinput

echo "==> Creating superuser (hardcoded for recovery)..."
python manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(username='admin').exists() or User.objects.create_superuser('admin', 'admin@wibestore.uz', 'Admin123!')"

echo "==> Collecting static files..."
python manage.py collectstatic --noinput

echo "==> Collecting static files..."
python manage.py collectstatic --noinput

echo "==> Starting server..."
exec "$@"
