# Google orqali ro'yxatdan o'tish / kirish sozlash

Agar "Error 401: invalid client" yoki "The OAuth client was not found" xatosi chiqsa, quyidagi qadamlarni bajaring.

---

## 1. Google Cloud Console da OAuth client yaratish

1. **Google Cloud Console** ga kiring: https://console.cloud.google.com/
2. Loyiha tanlang yoki yangi loyiha yarating.
3. **APIs & Services** → **Credentials** (OAuth bilan ishlash).
4. **+ CREATE CREDENTIALS** → **OAuth client ID** ni bosing.
5. Agar birinchi marta bo'lsa, **Configure consent screen** orqali OAuth consent ekranini sozlang:
   - User Type: **External** (tashqi foydalanuvchilar uchun).
   - App name: **WibeStore**, User support email va Developer contact email to'ldiring.
   - Scopes: **email**, **profile**, **openid** qo'shing (yoki default).
   - Test users ga o'zingizni qo'shasiz (Testing rejimida).
6. Qaytib **Credentials** → **+ CREATE CREDENTIALS** → **OAuth client ID**.
7. Application type: **Web application**.
8. **Name**: masalan `WibeStore Web`.

---

## 2. Authorized JavaScript origins qo'shish

**Authorized JavaScript origins** bo'limida quyidagi manzillarni qo'shing (har biri alohida qator):

- Lokal ishlatish uchun:
  - `http://localhost:5173`
  - `http://localhost:3000`
- **Production (Railway)** uchun — frontend manzilingiz:
  - `https://frontend-production-76e67.up.railway.app`
- Agar boshqa domen bo'lsa (masalan `https://wibestore.uz`):
  - `https://wibestore.uz`

Protocol va slash oxirida bo'lmasin: `https://...` to'g'ri, `https://.../` kerak emas.

---

## 3. Authorized redirect URIs (agar so'ralsa)

@react-oauth/google **popup** rejimida ishlaydi; ba'zi loyihalarda redirect URI talab qilinadi. Agar forma **redirect URI** so'rasa, quyidagilarni qo'shing:

- `https://frontend-production-76e67.up.railway.app`
- `http://localhost:5173`

So'ng **Create** bosing va **Client ID** ni nusxalang (masalan `123456789-xxx.apps.googleusercontent.com`).

---

## 4. Railway da environment variable berish

1. **Railway** → WibeStore **frontend** servicingiz → **Variables**.
2. Qo'shing:
   - **Name:** `VITE_GOOGLE_CLIENT_ID`
   - **Value:** Google Console dan olgan **Client ID** (`.apps.googleusercontent.com` bilan tugaydigan).
3. **Save** va frontend uchun **Redeploy** qiling (Vite build vaqtida `VITE_*` o'zgaruvchilarni o'qiydi).

---

## 5. Tekshirish

- Frontend sahifasida **Kirish** yoki **Ro'yxatdan o'tish** → **Google** tugmasini bosing.
- Popup ochilib, Google hisobini tanlash va ruxsat berish kerak.
- Agar yana "invalid client" chiqsa:
  - **Authorized JavaScript origins** da production URL aniq shu frontend manzilingizga mos kelishini tekshiring.
  - Railway’dagi `VITE_GOOGLE_CLIENT_ID` qayta nusxalang, bo'sh joy yoki noto'g'ri belgi bo'lmasin.
  - O'zgartirgach **Redeploy** qiling.

---

## Qisqacha

| Qayerda           | Nima qilish |
|-------------------|-------------|
| Google Console    | OAuth client ID (Web application), Authorized JavaScript origins = frontend URL(lar) |
| Railway Variables | `VITE_GOOGLE_CLIENT_ID` = Client ID qiymati |
| Keyin             | Frontend ni Redeploy qilish |
