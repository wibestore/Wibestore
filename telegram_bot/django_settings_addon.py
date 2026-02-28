# ================================================
# settings.py ga qo'shish kerak bo'lgan sozlamalar
# ================================================

# Installed apps ga qo'shing:
INSTALLED_APPS = [
    # ... mavjud applar ...
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'your_app',  # o'zingizning app nomi
]

# Middleware ga qo'shing (birinchi qatorga):
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # BIRINCHI bo'lishi kerak
    # ... qolgan middleware lar ...
]

# Auth User Model
AUTH_USER_MODEL = 'your_app.User'  # o'zingizning app nomi

# REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

# JWT Settings
from datetime import timedelta
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=30),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
}

# CORS Settings (frontend domenini kiriting)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://yourdomain.com",  # production domeningiz
]

# Bot Secret Key (muhim! environment variable dan o'qing)
import os
BOT_SECRET_KEY = os.getenv('BOT_SECRET_KEY', 'your-very-secret-key-here')


# ================================================
# urls.py (asosiy) ga qo'shish kerak:
# ================================================
"""
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('your_app.urls')),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
"""


# ================================================
# .env fayli namunasi
# ================================================
ENV_EXAMPLE = """
# Django
SECRET_KEY=django-secret-key-o-zgartiring
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,yourdomain.com

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Telegram Bot
BOT_TOKEN=7123456789:AAHbGkxyz_your_actual_bot_token
BOT_SECRET_KEY=super-secret-random-string-123456

# Website URL (bot API chaqiruvlari uchun)
WEBSITE_URL=http://localhost:8000

# Frontend register sahifasi URL (bot xabarida ko'rsatiladi)
REGISTER_URL=http://localhost:3000/register
"""


# ================================================
# pip install qilish kerak bo'lgan paketlar
# ================================================
REQUIREMENTS = """
django>=4.2
djangorestframework>=3.14
djangorestframework-simplejwt>=5.3
django-cors-headers>=4.3
python-telegram-bot==20.7
requests>=2.31
python-dotenv>=1.0
psycopg2-binary>=2.9  # PostgreSQL uchun
"""
