# WibeStore sayt tekshiruvi — kamchiliklar va muammolar

## 1. Kritik / tez tuzatish kerak

### 1.1 ~~Parolni tiklash sahifasi (ForgotPasswordPage) — mock~~ ✅ Tuzatildi
- **Muammo:** `/forgot-password` sahifasida form yuborilganda haqiqiy API chaqirilmaydi edi.
- **Tuzatildi:** ForgotPasswordPage endi `useAuth().resetPassword(email)` chaqiradi; xato bo‘lsa foydalanuvchiga ko‘rsatiladi.

### 1.2 Parol uzunligi nomuvofiqlik
- **Muammo:** Ro‘yxatdan o‘tishda parol **kamida 8 ta** belgi talab qilinadi (`SignupPage.jsx`), sozlamalarda parol o‘zgartirishda esa **6 ta** (`SettingsPage.jsx` va tarjimalar "kamida 6 ta belgi").
- **Yechim:** Bir xil qoida keltirish kerak: masalan, hamma joyda 8 ta (yoki backend qoidalariga qarab 6 ta) va tarjimalarni moslashtirish.

---

## 2. Tarjimalar (i18n)

### 2.1 ~~Yo‘q kalitlar (sort_views, load_more)~~ ✅ Tuzatildi
- **products.sort_views** va **products.load_more** — uz, en, ru locale’larga qo‘shildi.

### 2.2 ErrorBoundary matnlari
- **Muammo:** Xato yuz berganda chiqadigan matnlar qattiq kodlangan ruscha: "Упс! Что-то пошло не так", "Обновить страницу", "На главную".
- **Yechim:** ErrorBoundary da `useLanguage`/`t()` ishlatish mumkin emas (class component). Tarjima uchun alohida locale faylidan o‘qish yoki context’dan o‘qish kerak (masalan, render prop orqali).

---

## 3. Foydalanuvchi tajribasi (UX)

### 3.1 Login sahifasi — redirect
- **Holat:** AuthGuard `state={{ from: location, redirect: location.pathname }}` yuboradi. LoginPage `location.state?.from?.pathname` dan redirect oladi — to‘g‘ri ishlaydi.
- **Taklif:** Agar `state.redirect` ham saqlanib, keyingi qadamlar uchun ishlatish mumkin (masalan, "Siz … sahifaga yo‘naltirilmoqdasiz" ko‘rsatish).

### 3.2 Sozlamalar — profil
- **Holat:** Profil saqlashda faqat `full_name` va `phone_number` yuboriladi; email faqat "Emailni o‘zgartirish" (tasdiqlash kodi) orqali o‘zgaradi — to‘g‘ri.
- **Eslatma:** Backend `PATCH /auth/me/` da email qabul qilmasligi yoki frontend tomonidan yuborilmasligi kerak, aks holda tasdiqlashsiz email o‘zgarishi mumkin.

---

## 4. Xavfsizlik va API

### 4.1 API client
- **Yaxshi:** Base URL ataması faqat env orqali; refresh token, 401 da logout, retry logikasi mavjud.
- **Yaxshi:** `validateApiUrl` va ruxsat berilgan domenlar ro‘yxati bor.

### 4.2 Auth
- **Yaxshi:** AuthGuard, AdminGuard, GuestGuard to‘g‘ri qo‘llanilgan; token localStorage’da; 401 dan keyin tozalash va login’ga yo‘naltirish.

---

## 5. Boshqa kuzatishlar

### 5.1 Console.log / error
- AuthContext va apiClient da `console.error` ishlatiladi — development va monitoring uchun maqul. Production’da Sentry yoki boshqa xizmat orqali yig‘ilsa yaxshi.

### 5.2 Accessibility (a11y)
- App.jsx da "Skip to content" va `main id="main-content" role="main"` mavjud — yaxshi.
- Ba’zi tugmalar/inputlar da `aria-label` bor; barcha interfeys elementlari uchun tekshirib, yetishmasa qo‘shish tavsiya etiladi.

### 5.3 Statistics sahifa
- `/statistics` AuthGuard’siz — ochiq statistika sahifasi bo‘lishi mumkin. Agar faqat kirgan foydalanuvchilar uchun bo‘lishi kerak bo‘lsa, AuthGuard qo‘shish kerak.

---

## 6. Qisqacha tavsiyalar

| Tartib | Narsa | Harakat |
|--------|--------|--------|
| 1 | ForgotPasswordPage | `resetPassword(email)` API bilan ulash |
| 2 | Parol uzunligi | Signup va Settings + tarjimalarni 6 yoki 8 ga birlashtirish |
| 3 | products.sort_views, products.load_more | Uz/En/Ru locale’larga qo‘shish |
| 4 | ErrorBoundary | Xabar matnlarini i18n yoki locale orqali ko‘rsatish |
| 5 | Statistics | Kerak bo‘lsa AuthGuard qo‘shish |

---

*Hisobot sana: 2026-02-28*
