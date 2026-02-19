import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.production')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

email = os.environ.get('ADMIN_EMAIL', 'admin@wibestore.uz')
username = os.environ.get('ADMIN_USERNAME', 'admin')
password = os.environ.get('ADMIN_PASSWORD', 'Admin123!')

try:
    if not User.objects.filter(email=email).exists():
        print(f"User {email} not found, creating...")
        User.objects.create_superuser(
            email=email,
            password=password,
            username=username,
            full_name="WibeStore Admin",
        )
        print(f"Superuser created: {email}")
    else:
        print(f"Superuser {email} already exists.")
except Exception as e:
    print(f"Warning: Could not create superuser: {e}")
    # Don't crash the entrypoint — server should still start

