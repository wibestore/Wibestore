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

## 6. Agar Google ruxsat berildi, lekin "Google login failed" chiqsa

Bu holda Google oynasi yopiladi, lekin **backend** javobda xato qaytaradi. Quyidagilarni tekshiring:

1. **405 Method Not Allowed** — so‘rov frontend domeniga boradi (nginx POST ni backend’ga yubormaydi). **Yechim:** Railway → Frontend Service → Variables da `VITE_API_BASE_URL` ni **to‘liq backend URL** ga o‘rnating (masalan `https://sizning-backend.railway.app/api/v1`), **nisbiy** `/api/v1` emas. Saqlang va **Redeploy** qiling.

2. **Backend ishlayaptimi?**  
   Railway’da **backend** service ham deploy qilingan bo‘lishi kerak. Frontend **Variables** da `VITE_API_BASE_URL` aniq shu backend manziliga yo‘naltirilgan bo‘lishi kerak (masalan `https://sizning-backend.railway.app/api/v1`).

3. **Xabar aniqroq bo‘lishi**  
   Endi sahifada backend yuborgan xabar ko‘rsatiladi (masalan *"Invalid Google access token"*). Agar shunday chiqsa, backend tokenni Google’ga yuborib, javob 200 emas. Shunda:
   - Frontend va backend bir xil **HTTPS** domenida bo‘lsin (masalan ikkalasi Railway’da).
   - Google Console da **Authorized JavaScript origins** ga frontend manzilini qo‘shgan bo‘ling (yuqoridagi 2-qadam).
   - **Redeploy**: frontend va kerak bo‘lsa backend ni qayta deploy qilib, yangi token bilan qayta urinib ko‘ring.

4. **Tarmoq / CORS**  
   Brauzerda **F12** → **Network** ochib, "Google" tugmasini bosing. `auth/google` yoki `google` so‘rovini toping. Agar u **qizil** (failed) bo‘lsa, **Status** va **Response** ni ko‘ring: 4xx/5xx yoki CORS xabari bo‘lishi mumkin.

5. **Vaqtincha email bilan ro‘yxatdan o‘tish**  
   Google ishlamaguncha **Ro‘yxatdan o‘tish** formasida **To‘liq ism**, **Email**, **Parol** kiritib, **Ro‘yxatdan o‘tish** tugmasi orqali hisob yarating.

---

## Qisqacha

| Qayerda           | Nima qilish |
|-------------------|-------------|
| Google Console    | OAuth client ID (Web application), Authorized JavaScript origins = frontend URL(lar) |
| Railway Variables | `VITE_GOOGLE_CLIENT_ID` = Client ID qiymati |
| Keyin             | Frontend ni Redeploy qilish |
