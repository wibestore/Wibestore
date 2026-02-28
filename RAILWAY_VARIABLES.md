# 🚂 Railway — Backend, Frontend va Bot uchun aniq Variables

Quyida **sizning URL’laringiz** asosida barcha servislar uchun o‘rnatish kerak bo‘lgan o‘zgaruvchilar keltirilgan.

---

## URL’lar

| Servis   | URL |
|----------|-----|
| **Backend**  | `https://exemplary-fascination-production-9514.up.railway.app` |
| **Frontend** | `https://frontend-production-76e67.up.railway.app` |
| **Bot**      | Telegram’da @YourBotUsername (o‘zingiz qo‘ygan) |

---

## 1. Backend servisi (Railway’da Backend → Variables)

| Variable | Qiymat | Eslatma |
|----------|--------|--------|
| `DATABASE_URL` yoki `DATABASE_PUBLIC_URL` | *(Reference)* Postgres servisidan **DATABASE_PUBLIC_URL** | Variables → Add Reference → Postgres → DATABASE_PUBLIC_URL |
| `SECRET_KEY` | Yangi kalit (pastdagi buyruqdan) | Majburiy |
| `ALLOWED_HOSTS` | `exemplary-fascination-production-9514.up.railway.app,.railway.app` | Ixtiyoriy — production’da `.railway.app` avtomatik qo‘shiladi |
| `CORS_ALLOWED_ORIGINS` | `https://frontend-production-76e67.up.railway.app` | Frontend domeni — majburiy |
| `CSRF_TRUSTED_ORIGINS` | `https://exemplary-fascination-production-9514.up.railway.app,https://frontend-production-76e67.up.railway.app` | Ixtiyoriy (default bor) |
| `TELEGRAM_BOT_SECRET` | `wibestore-telegram-bot-secret-2024` | Bot’dagi `BOT_SECRET_KEY` bilan **bir xil** bo‘lishi kerak |

**SECRET_KEY generatsiya (bir marta ishlatib, nusxalang):**
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

**Ixtiyoriy:** `FERNET_KEY`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` — qo‘shishingiz mumkin.

---

## 2. Frontend servisi (Railway’da Frontend → Variables)

Frontend **build** paytida bu o‘zgaruvchilar ishlatiladi. Railway’da Frontend servisining **Variables** qismiga quyidagilarni qo‘ying:

| Variable | Qiymat |
|----------|--------|
| `VITE_API_BASE_URL` | `https://exemplary-fascination-production-9514.up.railway.app/api/v1` |
| `VITE_TELEGRAM_BOT_USERNAME` | `wibestorebot` (yoki o‘z bot username’ingiz) |
| `VITE_WS_BASE_URL` | `wss://exemplary-fascination-production-9514.up.railway.app` |

**Eslatma:** O‘zgarishlardan keyin Frontend’ni **qayta build** qilish kerak (Redeploy).

---

## 3. Telegram Bot servisi (Railway’da Bot → Variables)

| Variable | Qiymat |
|----------|--------|
| `BOT_TOKEN` | @BotFather’dan olgan token (masalan `8511895179:AAE...`) |
| `WEBSITE_URL` | `https://exemplary-fascination-production-9514.up.railway.app` |
| `BOT_SECRET_KEY` | `wibestore-telegram-bot-secret-2024` (Backend’dagi `TELEGRAM_BOT_SECRET` bilan bir xil) |
| `REGISTER_URL` | `https://frontend-production-76e67.up.railway.app/register` |

---

## 4. Qisqa tartib

1. **Postgres** — loyihada qo‘shing (agar yo‘q bo‘lsa).
2. **Backend** — Variables’da `DATABASE_PUBLIC_URL` (Reference), `SECRET_KEY`, `CORS_ALLOWED_ORIGINS`, `TELEGRAM_BOT_SECRET` qo‘ying.
3. **Frontend** — Variables’da `VITE_API_BASE_URL`, `VITE_TELEGRAM_BOT_USERNAME` qo‘ying, keyin Redeploy.
4. **Bot** — Variables’da `BOT_TOKEN`, `WEBSITE_URL`, `BOT_SECRET_KEY`, `REGISTER_URL` qo‘ying.
5. **TELEGRAM_BOT_SECRET** (Backend) va **BOT_SECRET_KEY** (Bot) qiymati **bir xil** bo‘lishi kerak.

---

## 5. Tekshirish

- Backend: brauzerda `https://exemplary-fascination-production-9514.up.railway.app/api/v1/` (yoki admin/docs) ochilsa — backend ishlayapti.
- Frontend: `https://frontend-production-76e67.up.railway.app` — sayt ochilsa, Telegram tugmasi va ro‘yxatdan o‘tish ishlashi uchun `VITE_API_BASE_URL` to‘g‘ri bo‘lishi kerak.
- Bot: Telegram’da `/start` → telefon yuborish → kod olish; keyin saytda `/register` da telefon + kod kiritib ro‘yxatdan o‘tish.
