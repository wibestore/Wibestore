/**
 * Sotuvchi va xaridor qoidalari (FunPay uslubida). Har safar akkaunt sotish/sotib olishda o'qish + test majburiy.
 * Quiz: 5 ta tasodifiy savol, barchasi to'g'ri bo'lishi kerak.
 */


/** Qoidalar bo'limlari (uz, ru) — WibeStore uchun moslashtirilgan */
export const sellerRulesSectionsUz = [
  {
    title: '1. Umumiy qoidalar',
    titleRu: '1. Общие правила',
    items: [
      '1.1. Boshqa foydalanuvchiga kontakt (Telegram, Discord, telefon va b.) berish yoki undan olingan kontaktlardan foydalanish. Buyurtma bajarilgach o\'yinda aloqa. Jazo: birinchi marta vaqtincha blok; takrorida — akkaunt bloki va to\'lovlardan mahrum qilish.',
      '1.2. Reyting tizimini noto\'g\'ri ishlatish (nakrutka, shantaj, eski buyurtma bo\'yicha asossiz o\'zgartirish). Jazo: o\'chirish; takrorida — akkaunt bloki.',
      '1.3. Uchinchi shaxsga foydalanuvchi haqida ma\'lumot (ism, ID, summa va b.) zarar yetkazish maqsadida berish. Jazo: barcha akkauntlar bloki, to\'lovlardan mahrum qilish, yangi akkauntlar ham bloklanadi.',
      '1.4. WibeStore akkauntini sotish yoki sotib olish urinishi. Jazo: barcha akkauntlar bloki.',
      '1.5. Avatar yoki ismda har qanday sayt havolalari, qonunga xilof, pornografik yoki siyosiy kontent. Jazo: avatar o\'chiriladi / ism o\'zgartiriladi; takrorida — akkaunt bloki.',
      '1.6. Shaxsiy chatda: haqorat, tahdid, spam, flud. Siyosiy mavzuni majburlash, roziliksiz erotik material yuborish. Jazo: ogohlantirish; takrorida — vaqtincha blok.',
      '1.7. Reklama, spam, foydalanuvchilarga mass yuborish. Jazo: vaqtincha yoki doimiy blok.',
      '1.8. Firibgarlik, aldash, ataylab zarar. Jazo: barcha akkauntlar bloki, to\'lovlardan mahrum qilish.',
      '1.9. Pulni boshqa to\'lov tizimiga o\'tkazish, karting va boshqa moliyaviy firibgarlik. Jazo: barcha akkauntlar bloki, to\'lovlardan mahrum qilish.',
      '1.10. Keraksiz holda fayl almashish yoki rasmlar hostingiga havola berish (masalan, login/parolni rasmdan tashqarida). Jazo: ogohlantirish; takrorida — blok.',
      'Administratsiya WibeStore qoidalariga rioya qilishni tekshirish uchun maxfiy xaridor sifatida harakat qilish huquqini saqlaydi. Jazo yoki blokni alohida holatda yumshatish yoki bekor qilish huquqi saqlanadi.',
    ],
    itemsRu: [
      '1.1. Передача контактов (Telegram, Discord, телефон и т.д.) другому пользователю или использование полученных контактов. Связь в игре после выполнения заказа. Санкции: при первом нарушении — временная блокировка; при повторном — блокировка аккаунта и отказ в выплатах.',
      '1.2. Недобросовестное использование системы отзывов (накрутка, шантаж, безосновательное изменение отзыва по старому заказу). Санкции: удаление отзыва; при повторном — блокировка аккаунта.',
      '1.3. Передача третьим лицам или разглашение информации о пользователе (имя, ID, сумма и т.д.) с целью нанесения вреда. Санкции: блокировка всех аккаунтов, отказ в выплатах, блокировка новых аккаунтов нарушителя.',
      '1.4. Попытка покупки или продажи аккаунта WibeStore. Санкции: блокировка всех аккаунтов.',
      '1.5. Размещение на аватаре или в имени ссылок на ресурсы, противозаконной, порнографической или политической информации. Санкции: удаление аватара / переименование; при повторном — блокировка аккаунта.',
      '1.6. В личном чате: оскорбления, угрозы, спам, флуд. Навязывание политического диалога, отправка материалов эротического характера без согласия. Санкции: предупреждение; при повторном — временная блокировка.',
      '1.7. Реклама, спам, массовая рассылка пользователям. Санкции: временная или постоянная блокировка.',
      '1.8. Мошенничество, обман, умышленное вредительство. Санкции: блокировка всех аккаунтов, отказ в выплатах.',
      '1.9. Обмен денег между платёжными системами без заказов, кардинг и прочие финансовые махинации. Санкции: блокировка всех аккаунтов, отказ в выплатах.',
      '1.10. Передача ссылок на файлообменники и хостинги изображений без явной необходимости (например, логин/пароль через изображение). Санкции: предупреждение; при повторном — блокировка.',
      'Администрация оставляет за собой право проверять соблюдение правил под видом покупателя. Администрация вправе смягчить или отменить наказание в отдельном случае.',
    ],
  },
  {
    title: '2. Sotuvchilar uchun taqiqlar',
    titleRu: '2. Правила для продавцов',
    items: [
      '2.1.1. Tovarni WibeStore (Escrow) orqali to\'lovsiz berish yoki platformadan tashqarida savdo. Jazo: barcha akkauntlar bloki, to\'lovlardan mahrum qilish.',
      '2.1.2. Xaridordan buyurtma bajarilishidan oldin tasdiqlashni so\'rash (aldov belgilari bo\'lmasa). Jazo: vaqtincha blok.',
      '2.1.3. Raqobatchilarga qarshi noto\'g\'ri harakatlar (yomon reyting uchun xarid, asossiz shikoyatlar). Jazo: vaqtincha blok.',
      '2.1.4. Xaridorlarning savollarini asossiz e\'tiborsiz qoldirish. Jazo: ogohlantirish; takrorida — vaqtincha blok.',
      '2.1.5. Ataylab noto\'g\'ri yoki ishlamaydigan takliflar, noto\'g\'ri narx. Jazo: vaqtincha blok; doimiy blok ham mumkin.',
      '2.1.6. Tavsifni ataylab noto\'g\'ri yozish (masalan, bitta harf). Jazo: ogohlantirish; takrorida — takliflar o\'chiriladi yoki vaqtincha blok.',
      '2.1.7. Takliflar sahifasidagi qoidalarni buzish, administratsiya xabarlarini e\'tiborsiz qoldirish. Jazo: takliflar o\'chiriladi, ogohlantirish; takrorida — vaqtincha blok.',
      '2.1.8. Takliflarni dublikat qilish, sotuv takliflari joylash. Jazo: takliflar o\'chiriladi, vaqtincha blok.',
      '2.1.9. Boshqa bo\'limga mos kelmaydigan tovar/ xizmatni joylash (masalan, o\'yin valyutasi bo\'limida predmetlar). Jazo: komissiya qo\'shiladi; takrorida — blok.',
      '2.1.10. Boshqa savdo platformalarida bir xil akkauntni reklama qilish. Ijtimoiy tarmoqlar va do\'konlarga reklama ruxsat. Jazo: blok, to\'lovlardan mahrum qilish.',
      '2.1.11. Takliflarda qonunga xilof, ekstremistik, pornografik yoki siyosiy rasmlar, havolalar, tovar bilan bog\'liq bo\'lmagan kontent. Jazo: rasm/taklif o\'chiriladi; takrorida — blok.',
      '2.2. Noyob, noqonuniy yo\'l bilan olingan tovarlar (vzlom, brut, karting va b.), shaxsiy ma\'lumotlar sotishi, zararli yoki litsenziyasiz dastur sotishi taqiqlanadi. Jazo: blok va 30–60 kun ichida identifikatsiya orqali to\'lov.',
      '2.3. Ijtimoiy tarmoq akkauntlari va onlayn-kino obunalari (maxsus bo\'limlar bundan mustasno), virtual telefon raqamlari, ulug\' hajmdagi akkauntlar (o\'zingiz ro\'yxatdan o\'tganlardan tashqari), erotik/porno kontent, spam xizmatlari, kazino va donat usullari sotishi taqiqlanadi. Jazo: blok va identifikatsiya sharti bilan to\'lov.',
    ],
    itemsRu: [
      '2.1.1. Попытка передачи товара без оплаты через WibeStore (Escrow) или торговля вне платформы. Санкции: блокировка всех аккаунтов, отказ в выплатах.',
      '2.1.2. Просьба к покупателю подтвердить заказ до его выполнения (при отсутствии признаков обмана). Санкции: временная блокировка.',
      '2.1.3. Недобросовестная борьба с конкурентами (покупка для негативных отзывов, необоснованные жалобы). Санкции: временная блокировка.',
      '2.1.4. Беспричинное игнорирование вопросов покупателей. Санкции: предупреждение; при повторном — временная блокировка.',
      '2.1.5. Осознанное размещение недействительных предложений или с неверной ценой. Санкции: временная блокировка; возможна постоянная.',
      '2.1.6. Некорректное описание товара (например, из одной буквы). Санкции: предупреждение; при повторном — удаление предложений или временная блокировка.',
      '2.1.7. Нарушение правил на странице размещения предложений, игнорирование рассылок администрации. Санкции: удаление предложений, предупреждение; при повторном — временная блокировка.',
      '2.1.8. Дублирование предложений, размещение предложений о покупке. Санкции: удаление предложений, временная блокировка.',
      '2.1.9. Размещение товара/услуги в непредназначенном разделе (например, игровая валюта в разделе предметов). Санкции: доначисление комиссии; при повторном — блокировка.',
      '2.1.10. Размещение объявлений на других торговых площадках. Реклама в соцсетях и продажа в магазины разрешены. Санкции: блокировка, отказ в выплатах.',
      '2.1.11. В предложениях: противозаконные, экстремистские, порнографические или политические изображения, ссылки, контент, не относящийся к товару. Санкции: удаление изображений/предложений; при повторном — блокировка.',
      '2.2. Запрещена продажа товаров, полученных неправомерно (взлом, брут, кардинг и т.д.), персональных данных, вредоносного или нелицензионного ПО. Санкции: блокировка и выплата после идентификации в течение 30–60 дней.',
      '2.3. Запрещена продажа аккаунтов соцсетей и подписок на онлайн-кино (кроме специальных разделов), виртуальных номеров, аккаунтов оптом (кроме зарегистрированных лично), эротики/порно, услуг спама, казино и способов доната. Санкции: блокировка и выплата при идентификации.',
    ],
  },
  {
    title: '3. Sotuvchilar javobgarligi',
    titleRu: '3. Ответственность продавцов',
    items: [
      '3.1. Arbitraj xodimining topshiriqlarini bajarishdan bosh tortish, xabarlarini e\'tiborsiz qoldirish, nizo hal qilishda befarqlik. Jazo: buyurtma summasining 100% gacha qaytariladi.',
      '3.2. Xaridorni buyurtmasi bo\'yicha maslahatdan mahrum qilish, savollarni e\'tiborsiz qoldirish. Jazo: 100% gacha qaytariladi.',
      '3.3. O\'yin valyutasi yoki predmetlar noqonuniy yo\'l bilan olingan bo\'lsa va o\'yin administratsiyasi xaridorga jazoa qilgan bo\'lsa. Jazo: 100% qaytariladi.',
      '3.4. O\'yin administratsiyasi o\'yin valyutasi/ predmetlari sotuviga javoban jazoa qilgan bo\'lsa. Jazo: 50% gacha qaytariladi.',
      '3.5. Xaridor akkauntni olgach, sotuvchi yoki birinchi egasi qayta kirish huquqini tiklasa (o\'yin qo\'llab-quvvatlash orqali yoki boshqa yo\'l bilan). Jazo: 100% qaytariladi.',
      '3.6. O\'yin administratsiyasi akkauntni sotuv/ xarid faktiga ko\'ra bloklasa. Jazo: 50% gacha qaytariladi.',
      '3.7. Xizmat ko\'rsatishda xaridor bilan kelishilmagan muhim o\'zgarishlar (masalan, hisob xususiyatlarining yomonlashishi). Jazo: zarar qoplanishi mumkin.',
      '3.8. Xizmat salbiy natija bergan bo\'lsa (masalan, reyting pasayishi). Jazo: 100% qaytariladi va zarar qoplanadi.',
      '3.9. Sotuvchi kelishilgan muddatlarni buzsa. Jazo: bajarilgan ish haqi muddatga mutanosib kamayadi (masalan, muddat 1,5 marta oshsa, to\'lov 1,5 marta kamayadi).',
      'Har bir nizo alohida ko\'rib chiqiladi; chatdagi kelishuvlar hisobga olinadi.',
    ],
    itemsRu: [
      '3.1. Отказ выполнять указания сотрудника арбитража, игнорирование его сообщений, бездействие при разрешении спора. Санкции: возврат до 100% от суммы заказа.',
      '3.2. Отказ консультировать покупателя по заказу, игнорирование вопросов. Санкции: возврат до 100%.',
      '3.3. Санкции администрации игры к покупателю из-за нелегально полученной валюты/предметов (мошенничество, эксплойты). Санкции: возврат до 100%.',
      '3.4. Санкции администрации игры к покупателю из-за покупки игровой валюты/предметов. Санкции: возврат до 50%.',
      '3.5. Утрата покупателем аккаунта из-за восстановления доступа продавцом или первым владельцем (через поддержку игры или иным способом). Санкции: возврат до 100%.',
      '3.6. Блокировка аккаунта администрацией игры из-за факта покупки/продажи. Санкции: возврат до 50%.',
      '3.7. Существенное изменение характеристик при оказании услуги без согласования с покупателем. Санкции: возможна компенсация ущерба.',
      '3.8. Отрицательный результат услуги (например, снижение рейтинга). Санкции: возврат 100% и компенсация ущерба.',
      '3.9. Задержка оговорённых с покупателем сроков. Санкции: оплата выполненной работы снижается пропорционально задержке.',
      'Каждый спор рассматривается индивидуально; договорённости в чате учитываются.',
    ],
  },
  {
    title: '4. Sotib olgandan keyingi muammolar',
    titleRu: '4. Проблемы после покупки аккаунта',
    items: [
      'Akkauntni sotib olgandan keyin paydo bo\'ladigan muammolar (masalan, o\'yindagi keyingi bloklar, shaxsiy ishlatishdagi muammolar, uchinchi shaxs da\'vosi va b.) uchun WibeStore javobgarlik olmaydi. Faqat Escrow va qoidalarda ko\'rsatilgan holatlar (sotuvchi qayta kirish tiklash, o\'yin administratsiyasi bloki va h.k.) bo\'yicha qaytarish va yordam qoidalariga amal qilinadi.',
    ],
    itemsRu: [
      'WibeStore не несёт ответственности за проблемы, возникшие после покупки аккаунта (например, последующие блокировки в игре, проблемы при личном использовании, претензии третьих лиц и т.д.). Возвраты и поддержка осуществляются только в случаях, указанных в правилах Escrow (восстановление доступа продавцом, блокировка администрацией игры и т.п.).',
    ],
  },
];

/** Quiz savollari: { id, questionUz, questionEn, questionRu, optionsUz, optionsEn, optionsRu, correctIndex } */
export const sellerRulesQuiz = [
  {
    id: 'q1',
    questionUz: 'To\'lov qayerda amalga oshirilishi kerak?',
    questionEn: 'Where must payment be made?',
    questionRu: 'Где должна производиться оплата?',
    optionsUz: ['Faqat WibeStore (Escrow) orqali', 'Telegram orqali', 'To\'g\'ridan-to\'g\'ri sotuvchiga', 'Istalgan usulda'],
    optionsEn: ['Only via WibeStore (Escrow)', 'Via Telegram', 'Directly to seller', 'Any method'],
    optionsRu: ['Только через WibeStore (Escrow)', 'Через Telegram', 'Напрямую продавцу', 'Любым способом'],
    correctIndex: 0,
  },
  {
    id: 'q2',
    questionUz: 'Xaridor bilan qanday muloqot qilish mumkin?',
    questionEn: 'How may you communicate with the buyer?',
    questionRu: 'Как можно общаться с покупателем?',
    optionsUz: ['Faqat WibeStore chat orqali', 'Telegram yoki boshqa tashqari kanallar', 'Telefon orqali', 'Istalgan usulda'],
    optionsEn: ['Only via WibeStore chat', 'Telegram or other external channels', 'By phone', 'Any method'],
    optionsRu: ['Только через чат WibeStore', 'Telegram или другие внешние каналы', 'По телефону', 'Любым способом'],
    correctIndex: 0,
  },
  {
    id: 'q3',
    questionUz: 'Xaridor akkauntni olgach sotuvchi qayta kirish huquqini tiklasa nima bo\'ladi?',
    questionEn: 'If the seller restores access to the account after the buyer receives it, what happens?',
    questionRu: 'Если продавец восстановит доступ к аккаунту после получения покупателем, что произойдёт?',
    optionsUz: ['To\'liq qaytariladi (100%)', 'Qaytarilmaydi', 'Faqat ogohlantirish', '50% qaytariladi'],
    optionsEn: ['Full refund (100%)', 'No refund', 'Warning only', '50% refund'],
    optionsRu: ['Полный возврат (100%)', 'Без возврата', 'Только предупреждение', 'Возврат 50%'],
    correctIndex: 0,
  },
  {
    id: 'q4',
    questionUz: 'Platformadan tashqarida to\'lov talab qilish qanday qoidalangan?',
    questionEn: 'Asking for payment outside the platform is:',
    questionRu: 'Требование оплаты вне платформы:',
    optionsUz: ['Taqiqlanadi', 'Ruxsat etiladi', 'Faqat Premium uchun', 'Xaridor roziligi bilan ruxsat'],
    optionsEn: ['Prohibited', 'Allowed', 'Allowed for Premium only', 'Allowed with buyer consent'],
    optionsRu: ['Запрещено', 'Разрешено', 'Только для Premium', 'Разрешено с согласия покупателя'],
    correctIndex: 0,
  },
  {
    id: 'q5',
    questionUz: 'Reyting tizimini noto\'g\'ri ishlatish (nakrutka, shantaj) qanday jazoga olib keladi?',
    questionEn: 'Misusing the rating system (fake reviews, blackmail) leads to:',
    questionRu: 'Неправильное использование рейтинга (накрутка, шантаж) приводит к:',
    optionsUz: ['Reyting o\'chiriladi, takrorida akkaunt blok', 'Faqat ogohlantirish', 'Jazo yo\'q', 'Komissiya oshadi'],
    optionsEn: ['Review removed, account block on repeat', 'Warning only', 'No penalty', 'Higher commission'],
    optionsRu: ['Отзыв удалён, при повторении блок аккаунта', 'Только предупреждение', 'Без наказания', 'Повышение комиссии'],
    correctIndex: 0,
  },
  {
    id: 'q6',
    questionUz: 'Xaridorning savollarini asossiz e\'tiborsiz qoldirish:',
    questionEn: 'Ignoring buyer questions without good reason:',
    questionRu: 'Игнорирование вопросов покупателя без причины:',
    optionsUz: ['Ogohlantirish, takrorida vaqtincha blok', 'Jazo yo\'q', 'Faqat reyting pasayadi', 'To\'lov rad etiladi'],
    optionsEn: ['Warning, temporary block on repeat', 'No penalty', 'Only rating drops', 'Payout refused'],
    optionsRu: ['Предупреждение, при повторении временный блок', 'Без наказания', 'Только снижение рейтинга', 'Выплата отказана'],
    correctIndex: 0,
  },
  {
    id: 'q7',
    questionUz: 'O\'yin administratsiyasi akkauntni savdo tufayli bloklasa xaridor uchun nima qilinadi?',
    questionEn: 'If the game admin blocks the account due to the sale, what happens for the buyer?',
    questionRu: 'Если администрация игры заблокирует аккаунт из-за продажи, что будет с покупателем?',
    optionsUz: ['Qisman qaytariladi (masalan 50%)', 'To\'liq qaytariladi', 'Qaytarilmaydi', 'Faqat yangi akkaunt beriladi'],
    optionsEn: ['Partial refund (e.g. 50%)', 'Full refund', 'No refund', 'Only a new account is provided'],
    optionsRu: ['Частичный возврат (например 50%)', 'Полный возврат', 'Без возврата', 'Только выдача нового аккаунта'],
    correctIndex: 0,
  },
  {
    id: 'q8',
    questionUz: 'Boshqa savdo platformalarida bir xil akkauntni sotish maqsadida reklama qilish:',
    questionEn: 'Advertising the same account on other trading platforms for sale is:',
    questionRu: 'Реклама одного аккаунта на других площадках для продажи:',
    optionsUz: ['Taqiqlanadi; to\'lovlar rad etiladi', 'Ruxsat etiladi', 'Faqat Premium uchun ruxsat', 'Ruxsat agar narx bir xil bo\'lsa'],
    optionsEn: ['Prohibited; payouts refused', 'Allowed', 'Allowed for Premium only', 'Allowed if price is same'],
    optionsRu: ['Запрещено; выплаты отклонены', 'Разрешено', 'Только для Premium', 'Разрешено при той же цене'],
    correctIndex: 0,
  },
  {
    id: 'q9',
    questionUz: 'Noyob yoki noqonuniy yo\'l bilan olingan mahsulotlarni sotish:',
    questionEn: 'Selling items obtained illegally or by exploit:',
    questionRu: 'Продажа предметов, полученных незаконно или эксплойтом:',
    optionsUz: ['Taqiqlanadi', 'Ruxsat etiladi', 'Faqat kichik miqdorda', 'O\'yin turiga qarab'],
    optionsEn: ['Prohibited', 'Allowed', 'Allowed in small amounts', 'Depends on game type'],
    optionsRu: ['Запрещено', 'Разрешено', 'В малых количествах', 'Зависит от типа игры'],
    correctIndex: 0,
  },
  {
    id: 'q10',
    questionUz: 'Xaridordan buyurtma bajarilishidan oldin tasdiqlashni so\'rash (aldov belgilari bo\'lmasa):',
    questionEn: 'Asking the buyer to confirm the order before it is actually completed (no signs of fraud):',
    questionRu: 'Просить покупателя подтвердить заказ до фактического выполнения (без признаков мошенничества):',
    optionsUz: ['Taqiqlanadi; vaqtincha blok', 'Ruxsat etiladi', 'Faqat Premium uchun ruxsat', 'Xaridor roziligi bilan ruxsat'],
    optionsEn: ['Prohibited; temporary block', 'Allowed', 'Allowed for Premium', 'Allowed with buyer consent'],
    optionsRu: ['Запрещено; временный блок', 'Разрешено', 'Разрешено для Premium', 'С согласия покупателя'],
    correctIndex: 0,
  },
];

/** 5 ta tasodifiy savol tanlash (sotuvchi) */
export function getRandomQuizQuestions(count = 5) {
  const shuffled = [...sellerRulesQuiz].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// ─── Xaridor qoidalari (sotib olishdan oldin har safar) ────────────────────

/** Xaridor qoidalari bo'limlari (uz, ru) */
export const buyerRulesSectionsUz = [
  {
    title: '1. Umumiy qoidalar (xaridor)',
    titleRu: '1. Общие правила (покупатель)',
    items: [
      'To\'lov faqat WibeStore (Escrow) orqali. Sotuvchiga to\'g\'ridan-to\'g\'ri pul o\'tkazish yoki platformadan tashqarida to\'lov qilish taqiqlanadi.',
      'Muloqot faqat WibeStore chat orqali. Telegram, telefon va boshqa tashqari kanallar orqali to\'lov yoki ma\'lumot almashish taqiqlanadi.',
      'Akkauntni olganingizdan keyin sotuvchi qayta kirish huquqini tiklasa, to\'liq qaytariladi (100%).',
      'O\'yin administratsiyasi akkauntni savdo tufayli bloklasa — qisman qaytariladi (masalan 50%).',
    ],
    itemsRu: [
      'Оплата только через WibeStore (Escrow). Запрещены переводы напрямую продавцу и оплата вне платформы.',
      'Общение только через чат WibeStore. Запрещены оплата или обмен данными через Telegram, телефон и др.',
      'Если после получения аккаунта продавец восстановит доступ — полный возврат (100%).',
      'Если администрация игры заблокирует аккаунт из-за продажи — частичный возврат (например 50%).',
    ],
  },
  {
    title: '2. Xaridor uchun mas\'uliyat',
    titleRu: '2. Ответственность покупателя',
    items: [
      'Buyurtmani tasdiqlashdan oldin akkauntni tekshiring. Tasdiqlaganingizdan keyin nizo qiyinlashadi.',
      'Sotuvchi bilan chatdagi kelishuvlar nizo hal qilinishida hisobga olinadi.',
      'Shubhali takliflar yoki noto\'g\'ri ma\'lumot uchun sayt orqali shikoyat qilishingiz mumkin.',
    ],
    itemsRu: [
      'Проверьте аккаунт до подтверждения заказа. После подтверждения спор решить сложнее.',
      'Договорённости в чате с продавцом учитываются при разборе споров.',
      'По подозрительным предложениям или неверным данным можно пожаловаться через сайт.',
    ],
  },
  {
    title: '3. Sotib olgandan keyingi muammolar',
    titleRu: '3. Проблемы после покупки аккаунта',
    items: [
      'Akkauntni sotib olgandan keyin yuzaga keladigan muammolar (o\'yindagi keyingi bloklar, shaxsiy foydalanishdagi muammolar, uchinchi shaxs da\'vosi va b.) uchun WibeStore javob bermaydi. Qaytarish va yordam faqat qoidalarda ko\'rsatilgan holatlar (sotuvchi qayta kirish tiklash, o\'yin bloki va h.k.) bo\'yicha amalga oshiriladi.',
    ],
    itemsRu: [
      'WibeStore не несёт ответственности за проблемы, возникшие после покупки аккаунта (последующие блокировки в игре, проблемы при личном использовании, претензии третьих лиц и т.д.). Возвраты и поддержка осуществляются только в случаях, указанных в правилах (восстановление доступа продавцом, блокировка игрой и т.п.).',
    ],
  },
];

/** Xaridor quiz savollari */
export const buyerRulesQuiz = [
  { id: 'bq1', questionUz: 'To\'lov qayerda amalga oshirilishi kerak?', questionEn: 'Where must payment be made?', questionRu: 'Где должна производиться оплата?', optionsUz: ['Faqat WibeStore (Escrow) orqali', 'Telegram orqali', 'To\'g\'ridan-to\'g\'ri sotuvchiga', 'Istalgan usulda'], optionsEn: ['Only via WibeStore (Escrow)', 'Via Telegram', 'Directly to seller', 'Any method'], optionsRu: ['Только через WibeStore (Escrow)', 'Через Telegram', 'Напрямую продавцу', 'Любым способом'], correctIndex: 0 },
  { id: 'bq2', questionUz: 'Sotuvchi bilan qanday muloqot qilish kerak?', questionEn: 'How should you communicate with the seller?', questionRu: 'Как следует общаться с продавцом?', optionsUz: ['Faqat WibeStore chat orqali', 'Telegram orqali', 'Telefon orqali', 'Istalgan usulda'], optionsEn: ['Only via WibeStore chat', 'Via Telegram', 'By phone', 'Any method'], optionsRu: ['Только через чат WibeStore', 'Через Telegram', 'По телефону', 'Любым способом'], correctIndex: 0 },
  { id: 'bq3', questionUz: 'Akkauntni olgach sotuvchi qayta kirish huquqini tiklasa nima bo\'ladi?', questionEn: 'If the seller restores access after you receive the account?', questionRu: 'Если продавец восстановит доступ после получения вами аккаунта?', optionsUz: ['To\'liq qaytariladi (100%)', 'Qaytarilmaydi', '50% qaytariladi', 'Faqat ogohlantirish'], optionsEn: ['Full refund (100%)', 'No refund', '50% refund', 'Warning only'], optionsRu: ['Полный возврат (100%)', 'Без возврата', 'Возврат 50%', 'Только предупреждение'], correctIndex: 0 },
  { id: 'bq4', questionUz: 'Buyurtmani tasdiqlashdan oldin nima qilish kerak?', questionEn: 'Before confirming the order you should:', questionRu: 'Перед подтверждением заказа вы должны:', optionsUz: ['Akkauntni tekshirish', 'Tasdiqlamasdan to\'lash', 'Sotuvchiga tashqarida to\'lash', 'Hech narsa'], optionsEn: ['Check the account', 'Pay without checking', 'Pay outside the platform', 'Nothing'], optionsRu: ['Проверить аккаунт', 'Оплатить без проверки', 'Оплатить вне платформы', 'Ничего'], correctIndex: 0 },
  { id: 'bq5', questionUz: 'O\'yin administratsiyasi akkauntni savdo tufayli bloklasa xaridor uchun nima qilinadi?', questionEn: 'If the game admin blocks the account due to the sale?', questionRu: 'Если администрация игры заблокирует аккаунт из-за продажи?', optionsUz: ['Qisman qaytariladi (masalan 50%)', 'To\'liq qaytariladi', 'Qaytarilmaydi', 'Yangi akkaunt beriladi'], optionsEn: ['Partial refund (e.g. 50%)', 'Full refund', 'No refund', 'New account provided'], optionsRu: ['Частичный возврат (например 50%)', 'Полный возврат', 'Без возврата', 'Выдаётся новый аккаунт'], correctIndex: 0 },
  { id: 'bq6', questionUz: 'Sotuvchi platformadan tashqarida to\'lov so\'rasa nima qilish kerak?', questionEn: 'If the seller asks for payment outside the platform?', questionRu: 'Если продавец просит оплату вне платформы?', optionsUz: ['Rad etish va sayt orqali to\'lash', 'Telegram orqali to\'lash', 'Sotuvchiga to\'g\'ridan-to\'g\'ri to\'lash', 'Istalgan usulda to\'lash'], optionsEn: ['Refuse and pay via site', 'Pay via Telegram', 'Pay directly to seller', 'Pay any way'], optionsRu: ['Отказать и оплатить через сайт', 'Оплатить через Telegram', 'Оплатить напрямую продавцу', 'Оплатить любым способом'], correctIndex: 0 },
];

export function getRandomBuyerQuizQuestions(count = 5) {
  const shuffled = [...buyerRulesQuiz].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
