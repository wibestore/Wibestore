# Bot "Conflict" — nima uchun ishlamaydi va qanday tuzatish

## Logdagi xato

```
Conflict: terminated by other getUpdates request; make sure that only one bot instance is running
```

**Sabab:** Bir xil `BOT_TOKEN` bilan **ikki (yoki undan ortiq) bot** bir vaqtda ishlayapti. Telegram API bitta tokenga faqat bitta `getUpdates` (polling) ulanishiga ruxsat beradi.

---

## Nima qilish kerak

### 1. Faqat bitta joyda ishlating

- **Agar botni Railway'da ishlatayotgan bo'lsangiz:** Kompyuteringizda `python bot.py` **ishlamasin**. Barcha terminalda botni to'xtating.
- **Agar botni kompyuteringizda ishlatayotgan bo'lsangiz:** Railway'dagi Telegram Bot servisini **o'chiring** yoki deploy qilmaslikni tanlang.

### 2. Railway — bitta replica

- Railway Dashboard → Telegram Bot servisi → **Settings** → **Replicas** = **1** (2 yoki undan ortiq bo'lmasin).

### 3. Eski webhook ni tozalash

Agar ilgari webhook ishlatilgan bo'lsa:

1. Brauzerda oching:  
   `https://api.telegram.org/bot<BOT_TOKEN>/getMe`  
   (token o'rniga haqiqiy tokeningizni yozing)
2. Keyin:  
   `https://api.telegram.org/bot<BOT_TOKEN>/deleteWebhook?drop_pending_updates=true`  
   So'rovdan keyin webhook o'chadi, polling ishlashi mumkin.

---

## Xulosa

**Bot ishlamasining asosiy sababi:** Token bir vaqtda ikki joyda (masalan, kompyuter + Railway) ishlatilayapti.  
**Yechim:** Token faqat **bitta** joyda ishlashi kerak — yoki faqat Railway, yoki faqat kompyuteringiz.
