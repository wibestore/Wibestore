# Log va xatoliklar

## log.txt dagi xatolar

### 1. SSL_do_handshake() failed (502)

**Belgi:**  
`SSL_do_handshake() failed (SSL: error:0A000438:SSL routines::tlsv1 alert internal error:SSL alert number 80) while SSL handshaking to upstream`

**Sabab:** Frontend (masalan Railway) `https://66.33.22.1:443` ga proxy qilganda SSL handshake muvaffaqiyatsiz. Bu **infrastruktura/backend** sozlamalari bilan bog‘liq, frontend kodida emas.

**Qanday tuzatish kerak:**
- Backend (Django/Node va b.) **HTTPS** da to‘g‘ri ishlayotganiga va sertifikat to‘g‘ri ekaniga ishonch hosil qiling.
- Proxy (nginx / Railway) da backend uchun **upstream** manzili to‘g‘ri (host nomi yoki to‘g‘ri IP) va SSL verify kerak bo‘lsa moslashtirilgan bo‘lsin.
- Agar backend faqat HTTP da ishlasa, proxy backend ga **http://** orqali ulanishi kerak (SSL emas).

### 2. API URL da `game=undefined`, `search=undefined`

**Belgi:**  
So‘rovlar shunday chiqardi:  
`/api/v1/listings/?page=1&game=undefined&search=undefined&min_price=undefined&max_price=10000000&ordering=-created_at`

**Tuzatildi (frontend):**
- `useListings` hookida filterlar **tozalanadi**: `undefined`, `null`, bo‘sh string URL ga yuborilmaydi.
- Endi faqat berilgan (aniq) parametrlar yuboriladi, masalan:  
  `/api/v1/listings/?page=1&limit=24&ordering=-created_at`

Bu logdagi “noto‘g‘ri” URL xatolarini kamaytiradi va backend uchun ham yaxshiroq.

### 3. nginx [notice] — xato emas

`[notice] 1#1: using the "epoll" event method`, `start worker process` va sh.k. — nginx ishga tushishi haqidagi **informatsion** xabarlar. Bular xato emas, tuzatish talab qilmaydi.

---

## Boshqa mahsulotlar sahifasi tezlashtirildi

- **Cache:** Listings uchun `staleTime` 3 min, `gcTime` 10 min — qayta kirganda tez ko‘rinadi.
- **Prefetch:** Bosh sahifa yuklanganda products sahifasi uchun birinchi sahifa **prefetch** qilinadi; `/products` ga o‘tganida ko‘p hollarda ma’lumot cache dan chiqadi.
- **Bitta so‘rovda ko‘proq yozuv:** Bir sahifa uchun `limit=24` (oldingi 8 o‘rniga) — kamroq so‘rov, tezroq to‘ldirish.
- **Retry:** 502/network da 2 marta qayta urinish, keyin tez xato ko‘rsatish (juda uzoq kutish kamayadi).
- **URL parametrlari:** `?search=...` dan qidiruv sinxron; filterlar tozalanib yuboriladi.
