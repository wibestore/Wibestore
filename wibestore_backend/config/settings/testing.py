"""
WibeStore Backend - Testing Settings
"""

from .base import *  # noqa: F401,F403

# ============================================================
# DEBUG
# ============================================================
DEBUG = False

# ============================================================
# DATABASE (SQLite for fast tests)
# ============================================================
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": ":memory:",
    }
}

# Remove PostgreSQL/health_check apps when using SQLite (avoid Redis/DB checks in tests)
if "django.contrib.postgres" in INSTALLED_APPS:  # noqa: F405
    INSTALLED_APPS.remove("django.contrib.postgres")  # noqa: F405
for _app in ["health_check.contrib.redis", "health_check.db", "health_check.cache", "health_check"]:  # noqa: F405
    if _app in INSTALLED_APPS:  # noqa: F405
        INSTALLED_APPS.remove(_app)  # noqa: F405

# ============================================================
# PASSWORD HASHERS (fast hashing for tests)
# ============================================================
PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.MD5PasswordHasher",
]

# ============================================================
# EMAIL (in-memory for tests)
# ============================================================
EMAIL_BACKEND = "django.core.mail.backends.locmem.EmailBackend"

# ============================================================
# CELERY (eager mode for tests)
# ============================================================
CELERY_TASK_ALWAYS_EAGER = True
CELERY_TASK_EAGER_PROPAGATES = True

# ============================================================
# CACHE (dummy for tests)
# ============================================================
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.dummy.DummyCache",
    }
}

# ============================================================
# CHANNEL LAYERS (in-memory for tests)
# ============================================================
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer",
    },
}

# ============================================================
# REST FRAMEWORK (disable throttling in tests)
# ============================================================
REST_FRAMEWORK["DEFAULT_THROTTLE_CLASSES"] = []  # noqa: F405
REST_FRAMEWORK["DEFAULT_THROTTLE_RATES"] = {}  # noqa: F405

# ============================================================
# AXES (disable in tests)
# ============================================================
AXES_ENABLED = False

# ============================================================
# MEDIA (temp directory for tests)
# ============================================================
import tempfile

MEDIA_ROOT = tempfile.mkdtemp()
