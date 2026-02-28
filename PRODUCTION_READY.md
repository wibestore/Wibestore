# ✅ Production 100% tayyorlik — tekshiruv ro'yxati

Loyiha **production** (Railway yoki boshqa hosting) uchun quyidagi bo‘yicha tayyor.

---

## 1. Backend (Django)

| Tekshiruv | Holat |
|-----------|--------|
| DEBUG = False | ✅ production.py |
| SECRET_KEY (env yoki vaqtincha random) | ✅ |
| DATABASE: Postgres, localhost rad etiladi | ✅ production tekshiruvi |
| ALLOWED_HOSTS: .railway.app qo‘shiladi | ✅ |
| CORS_ALLOWED_ORIGINS, CORS_ALLOW_CREDENTIALS | ✅ base |
| CSRF_TRUSTED_ORIGINS (Railway URL’lar default) | ✅ production |
| HTTPS: SECURE_SSL_REDIRECT, HSTS, Secure cookies | ✅ |
| Static: WhiteNoise | ✅ |
| Gunicorn, entrypoint (DATABASE_URL/PORT) | ✅ |
| Telegram: TELEGRAM_BOT_SECRET, register/telegram API | ✅ |

**Backend’da o‘rnatish:** [RAILWAY_VARIABLES.md](RAILWAY_VARIABLES.md) — Backend bo‘limi.

---

## 2. Frontend (Vite/React)

| Tekshiruv | Holat |
|-----------|--------|
| VITE_API_BASE_URL (production’da to‘liq URL) | ✅ apiClient.js |
| ALLOWED_API_DOMAINS (railway.app, xavfsizlik) | ✅ |
| VITE_TELEGRAM_BOT_USERNAME | ✅ |
| VITE_WS_BASE_URL (production’da wss://) | ✅ |
| Build: npm run build | ✅ |

**Frontend’da o‘rnatish:** [RAILWAY_VARIABLES.md](RAILWAY_VARIABLES.md) — Frontend bo‘limi. Variables o‘zgarganidan keyin **Redeploy** (qayta build).

---

## 3. Telegram Bot

| Tekshiruv | Holat |
|-----------|--------|
| BOT_TOKEN, WEBSITE_URL (backend), BOT_SECRET_KEY, REGISTER_URL | ✅ |
| Backend bilan bir xil secret (TELEGRAM_BOT_SECRET = BOT_SECRET_KEY) | ✅ hujjatda |
| Conflict (409) log kamaytirilgan, bitta instance talabi | ✅ |

**Bot’da o‘rnatish:** [RAILWAY_VARIABLES.md](RAILWAY_VARIABLES.md) — Bot bo‘limi. Faqat **bitta** bot instance (Railway yoki lokal).

---

## 4. Xavfsizlik

- JWT httpOnly cookie (Telegram register), body’da ham (cross-origin uchun).
- Kodlar 10 daqiqa, bir marta ishlatiladi.
- Bot–backend: TELEGRAM_BOT_SECRET orqali.
- Auth endpoint’lar: throttle (rate limit).
- Production’da localhost DB/CORS rad etiladi.

---

## 5. Deploy tartibi (Railway)

1. **Postgres** — loyihada qo‘shing.
2. **Backend** — Postgres’dan DATABASE_PUBLIC_URL Reference, SECRET_KEY, CORS_ALLOWED_ORIGINS, TELEGRAM_BOT_SECRET.
3. **Frontend** — VITE_API_BASE_URL, VITE_TELEGRAM_BOT_USERNAME (Redeploy).
4. **Bot** — BOT_TOKEN, WEBSITE_URL, BOT_SECRET_KEY, REGISTER_URL; faqat bitta instance.

Batafsil variable nomlari va qiymatlar: **[RAILWAY_VARIABLES.md](RAILWAY_VARIABLES.md)**.
