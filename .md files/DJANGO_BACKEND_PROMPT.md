# 🚀 ЗАДАНИЕ: РАЗРАБОТКА ПРОФЕССИОНАЛЬНОГО BACKEND НА DJANGO 6.0 ДЛЯ WIBESTORE

## 📋 ОБЩЕЕ ОПИСАНИЕ ПРОЕКТА

**WibeStore** — это маркетплейс для покупки и продажи игровых аккаунтов (PUBG Mobile, Steam, Free Fire, Standoff 2, Mobile Legends, Clash of Clans, Roblox и 40+ других игр). Платформа включает систему премиум-подписок, безопасные сделки через Escrow, внутренний чат, уведомления, систему отзывов и рейтингов, а также мощную админ-панель.

**Текущий статус:** Существует полностью рабочий React + Vite фронтенд. Требуется разработать профессиональный, production-ready backend на Django 6.0.

---

## 🎯 ЦЕЛЬ И ТРЕБОВАНИЯ К РЕЗУЛЬТАТУ

Необходимо создать **полноценный, масштабируемый, безопасный backend** с профессиональной архитектурой, готовый к развертыванию в production. Код должен быть образцовым, следовать best practices Django-сообщества и включать все необходимые компоненты современного веб-приложения.

---

## 🏗️ АРХИТЕКТУРА И СТРУКТУРА ПРОЕКТА

### 1. Общая структура Django-проекта

Создайте следующую структуру проекта:

```
wibestore_backend/
├── manage.py
├── pyproject.toml                  # Современная конфигурация зависимостей (Poetry/uv)
├── requirements.txt                # Альтернатива для pip
├── .env.example                    # Шаблон переменных окружения
├── .gitignore
├── docker-compose.yml              # Docker Compose для локальной разработки
├── Dockerfile                      # Docker образ для production
├── README.md                       # Документация проекта
│
├── config/                         # Конфигурация Django проекта
│   ├── __init__.py
│   ├── asgi.py                     # ASGI конфигурация
│   ├── wsgi.py                     # WSGI конфигурация
│   ├── urls.py                     # Корневой URLconf
│   ├── settings/                   # Разделенные настройки
│   │   ├── __init__.py
│   │   ├── base.py                 # Базовые настройки
│   │   ├── development.py          # Настройки для разработки
│   │   ├── production.py           # Настройки для production
│   │   └── testing.py              # Настройки для тестирования
│   └── celery.py                   # Celery конфигурация
│
├── apps/                           # Django приложения
│   ├── __init__.py
│   │
│   ├── accounts/                   # Пользователи и аутентификация
│   │   ├── __init__.py
│   │   ├── models.py               # Custom User модель
│   │   ├── serializers.py          # DRF сериализаторы
│   │   ├── views.py                # API ViewSets
│   │   ├── urls.py                 # Маршруты
│   │   ├── services.py             # Бизнес-логика
│   │   ├── selectors.py            # Функции выборки данных
│   │   ├── tasks.py                # Celery задачи
│   │   ├── signals.py              # Django сигналы
│   │   ├── permissions.py          # Кастомные разрешения
│   │   ├── throttling.py           # Rate limiting
│   │   └── tests/                  # Тесты
│   │       ├── __init__.py
│   │       ├── test_models.py
│   │       ├── test_views.py
│   │       └── test_services.py
│   │
│   ├── games/                      # Игры и каталог
│   │   ├── __init__.py
│   │   ├── models.py               # Game, Category, Genre
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── services.py
│   │   ├── admin.py
│   │   └── tests/
│   │
│   ├── marketplace/                # Аккаунты и сделки
│   │   ├── __init__.py
│   │   ├── models.py               # Account, Listing, Order, Transaction
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── services.py
│   │   ├── selectors.py
│   │   ├── permissions.py
│   │   └── tests/
│   │
│   ├── payments/                   # Платежи (Payme, Click, Paynet, Uzcard, Humo)
│   │   ├── __init__.py
│   │   ├── models.py               # Payment, PaymentMethod, Transaction
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── services.py
│   │   ├── webhooks.py             # Обработка webhook от платежных систем
│   │   └── tests/
│   │
│   ├── subscriptions/              # Премиум подписки
│   │   ├── __init__.py
│   │   ├── models.py               # Subscription, Plan, UserSubscription
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── services.py
│   │   └── tests/
│   │
│   ├── messaging/                  # Чат между пользователями
│   │   ├── __init__.py
│   │   ├── models.py               # Conversation, Message
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── consumers.py            # Django Channels WebSocket
│   │   ├── routing.py              # WebSocket routing
│   │   └── tests/
│   │
│   ├── notifications/              # Уведомления
│   │   ├── __init__.py
│   │   ├── models.py               # Notification, NotificationType
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── services.py
│   │   ├── signals.py
│   │   └── tests/
│   │
│   ├── reviews/                    # Отзывы и рейтинги
│   │   ├── __init__.py
│   │   ├── models.py               # Review, Rating
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── tests/
│   │
│   ├── reports/                    # Жалобы и модерация
│   │   ├── __init__.py
│   │   ├── models.py               # Report, ModerationLog
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── tests/
│   │
│   └── admin_panel/                # Кастомная админ-панель API
│       ├── __init__.py
│       ├── serializers.py
│       ├── views.py
│       ├── urls.py
│       ├── permissions.py
│       └── tests/
│
├── core/                           # Общие компоненты
│   ├── __init__.py
│   ├── models.py                   # Abstract base models
│   ├── serializers.py              # Общие сериализаторы
│   ├── pagination.py               # Кастомная пагинация
│   ├── permissions.py              # Общие разрешения
│   ├── exceptions.py               # Кастомные exception классы
│   ├── middleware.py               # Кастомные middleware
│   ├── validators.py               # Валидаторы
│   ├── utils.py                    # Утилиты
│   └── constants.py                # Константы
│
├── static/                         # Статические файлы (для admin)
│   └── admin/
│
├── media/                          # Медиа файлы (user uploads)
│   └── .gitkeep
│
├── templates/                      # HTML шаблоны (email, admin)
│   ├── emails/
│   │   ├── base.html
│   │   ├── welcome.html
│   │   ├── password_reset.html
│   │   └── notification.html
│   └── admin/
│
├── scripts/                        # Скрипты для разработки
│   ├── seed_data.py                # Наполнение БД тестовыми данными
│   ├── create_admin.py             # Создание суперпользователя
│   └── backup_db.sh
│
├── logs/                           # Логи приложения
│   └── .gitkeep
│
└── tests/                          # Интеграционные и E2E тесты
    ├── __init__.py
    ├── conftest.py                 # Pytest fixtures
    ├── factories.py                # Factory Boy фабрики
    └── test_integration.py
```

---

## 📦 ТЕХНОЛОГИЧЕСКИЙ СТЕК

### Обязательные технологии:

1. **Django 6.0** — основной фреймворк
2. **Django REST Framework 3.15+** — REST API
3. **PostgreSQL 16+** — основная база данных
4. **Redis 7+** — кэширование, Celery broker, WebSocket layer
5. **Celery 5.3+** — асинхронные задачи
6. **Django Channels 4.2+** — WebSocket поддержка (для чата)
7. **djangorestframework-simplejwt** — JWT аутентификация
8. **django-cors-headers** — CORS
9. **django-filter** — фильтрация API
10. **drf-spectacular** — OpenAPI/Swagger документация

### Дополнительные библиотеки:

11. **Pillow** — обработка изображений
12. **django-storages + boto3** — S3 хранилище (для production)
13. **gunicorn** — WSGI сервер
14. **uvicorn** — ASGI сервер
15. **psycopg[binary]** — PostgreSQL драйвер
16. **python-decouple** или **django-environ** — управление переменными окружения
17. **pydantic** — валидация данных
18. **factory-boy + faker** — тестовые данные
19. **pytest + pytest-django** — тестирование
20. **coverage** — покрытие кода
21. **black + ruff + isort** — форматирование и линтинг
22. **pre-commit** — git hooks

---

## 🔐 СИСТЕМА АУТЕНТИФИКАЦИИ И АВТОРИЗАЦИИ

### 1. Custom User модель

Создайте кастомную модель пользователя со следующими полями:

```
- id (UUID, primary key)
- email (unique, индексированный)
- username (unique, опционально)
- phone_number (уникальный, с валидацией для Узбекистана)
- full_name
- avatar (ImageField)
- is_active
- is_staff
- is_superuser
- is_verified (верифицирован ли email/телефон)
- rating (Decimal, по умолчанию 5.0)
- total_sales (Integer)
- total_purchases (Integer)
- balance (Decimal, по умолчанию 0)
- language (choices: uz, ru, en)
- timezone
- created_at
- updated_at
- last_login
- deleted_at (soft delete)
```

### 2. Методы аутентификации

Реализуйте **гибридную систему аутентификации**:

1. **JWT Token (основной метод)**
   - Access token (15 минут)
   - Refresh token (7 дней)
   - Вращение refresh токенов
   - Blacklist для отозванных токенов

2. **Email + Password**
   - Хеширование паролей через Argon2
   - Валидация сложности пароля
   - История последних 5 паролей (запрет повторного использования)

3. **Google OAuth 2.0**
   - Интеграция через django-allauth или social-auth-app-django
   - Автоматическое создание пользователя при первом входе
   - Связывание Google аккаунта с существующим пользователем

4. **Телефон + OTP (опционально)**
   - Отправка SMS через локальный провайдер
   - Rate limiting на запросы OTP

### 3. Endpoints аутентификации

```
POST /api/v1/auth/register/           # Регистрация
POST /api/v1/auth/login/              # Логин (JWT)
POST /api/v1/auth/logout/             # Логаут
POST /api/v1/auth/refresh/            # Обновление токена
POST /api/v1/auth/google/             # Google OAuth
POST /api/v1/auth/password/reset/     # Запрос сброса пароля
POST /api/v1/auth/password/reset/confirm/  # Подтверждение сброса
POST /api/v1/auth/email/verify/       # Верификация email
POST /api/v1/auth/email/resend/       # Повторная отправка письма
POST /api/v1/auth/otp/request/        # Запрос OTP (если реализовано)
POST /api/v1/auth/otp/verify/         # Верификация OTP
GET  /api/v1/auth/me/                 # Текущий пользователь
PATCH /api/v1/auth/me/                # Обновление профиля
```

### 4. Безопасность

- Rate limiting на все auth endpoints
- Защита от brute force (django-axes)
- HTTPS только куки для refresh токена в production
- CORS настройка для конкретного домена фронтенда
- Content Security Policy headers

---

## 📊 МОДЕЛИ ДАННЫХ

### 1. Приложение Games (Игры)

**Game:**
```
- id (UUID)
- name (CharField, unique)
- slug (SlugField, unique, автогенерация)
- description (TextField)
- icon (CharField, emoji)
- image (ImageField)
- color (CharField, hex color)
- is_active (Boolean)
- sort_order (Integer)
- created_at, updated_at
```

**Category/Genre (опционально):**
```
- id, name, slug, parent (self FK)
```

### 2. Приложение Marketplace (Аккаунты)

**Listing (Аккаунт на продажу):**
```
- id (UUID)
- seller (FK User)
- game (FK Game)
- title (CharField)
- description (TextField)
- price (DecimalField)
- original_price (DecimalField, для скидок)
- status (choices: pending, active, sold, blocked, archived)
- is_premium (Boolean, выделение listing)
- views_count (Integer)
- favorites_count (Integer)
- login_method (choices: email, phone, username, social)
- account_email (EncryptedField)
- account_password (EncryptedField)
- account_additional_info (JSONField)
- level (CharField)
- rank (CharField)
- skins_count (IntegerField)
- features (JSONField, список фич)
- images (ManyToMany к ListingImage)
- moderated_by (FK User, админ)
- moderated_at (DateTime)
- approved_at (DateTime)
- rejected_at (DateTime)
- rejection_reason (TextField)
- sold_at (DateTime)
- created_at, updated_at
- deleted_at (soft delete)
```

**ListingImage:**
```
- id, listing (FK), image (ImageField), is_primary (Boolean), sort_order
```

**Favorite (Избранное):**
```
- id, user (FK), listing (FK), created_at
- Unique constraint: user + listing
```

**View (Просмотры):**
```
- id, listing (FK), user (FK, nullable), ip_address, viewed_at
- Unique constraint: listing + user + date (для уникальных просмотров в день)
```

### 3. Приложение Payments (Платежи)

**PaymentMethod:**
```
- id, name (Payme, Click, Paynet, Uzcard, Humo)
- code (unique), icon, is_active, config (JSONField)
```

**Transaction:**
```
- id (UUID)
- user (FK User)
- amount (DecimalField)
- currency (CharField, по умолчанию UZS)
- type (choices: deposit, withdrawal, purchase, refund, commission, subscription)
- status (choices: pending, processing, completed, failed, cancelled)
- payment_method (FK PaymentMethod, nullable)
- provider_transaction_id (CharField)
- description (TextField)
- metadata (JSONField)
- processed_at, failed_at
- created_at
```

**EscrowTransaction (Безопасная сделка):**
```
- id, listing (FK Listing), buyer (FK User), seller (FK User)
- amount (DecimalField)
- commission_amount (DecimalField, 10% по умолчанию)
- seller_earnings (DecimalField)
- status (choices: pending_payment, paid, delivered, confirmed, disputed, refunded)
- buyer_confirmed_at, seller_paid_at, admin_released_at
- dispute_reason, dispute_resolved_by, dispute_resolution
- created_at, updated_at
```

### 4. Приложение Subscriptions (Подписки)

**SubscriptionPlan:**
```
- id, name (Free, Premium, Pro)
- slug (unique)
- price_monthly (DecimalField)
- price_yearly (DecimalField, со скидкой)
- commission_rate (DecimalField, 0.10 для Free, 0.08 для Premium, 0.05 для Pro)
- features (JSONField, список возможностей)
- is_premium (Boolean)
- is_pro (Boolean)
- sort_order, is_active
- created_at, updated_at
```

**UserSubscription:**
```
- id, user (FK User), plan (FK SubscriptionPlan)
- status (choices: active, cancelled, expired)
- start_date, end_date
- auto_renew (Boolean)
- cancelled_at, cancel_reason
- payment_history (JSONField)
- created_at, updated_at
```

### 5. Приложение Messaging (Чат)

**Conversation:**
```
- id (UUID)
- listing (FK Listing, nullable для общих чатов)
- buyer (FK User)
- seller (FK User)
- is_read (Boolean)
- last_message_at (DateTime, индексированный)
- created_at, updated_at
- deleted_by_buyer, deleted_by_seller (soft delete)
```

**Message:**
```
- id (UUID)
- conversation (FK Conversation)
- sender (FK User)
- text (TextField)
- message_type (choices: text, image, file, system)
- attachment (FileField, nullable)
- is_read (Boolean)
- read_at (DateTime)
- edited_at (DateTime)
- is_deleted (Boolean)
- created_at
```

### 6. Приложение Notifications (Уведомления)

**NotificationType:**
```
- id, name, code (unique), icon, is_active
```

**Notification:**
```
- id (UUID)
- user (FK User)
- type (FK NotificationType)
- title (CharField)
- message (TextField)
- data (JSONField, дополнительная информация)
- is_read (Boolean)
- read_at (DateTime)
- action_url (CharField, nullable)
- created_at
```

### 7. Приложение Reviews (Отзывы)

**Review:**
```
- id (UUID)
- listing (FK Listing)
- reviewer (FK User, покупатель)
- reviewee (FK User, продавец)
- transaction (FK EscrowTransaction)
- rating (IntegerField, 1-5)
- title (CharField)
- comment (TextField)
- is_verified_purchase (Boolean)
- helpful_count (IntegerField)
- response (TextField, ответ продавца)
- response_at (DateTime)
- is_moderated (Boolean)
- created_at, updated_at
```

### 8. Приложение Reports (Жалобы)

**Report:**
```
- id (UUID)
- reporter (FK User)
- listing (FK Listing, nullable)
- user (FK User, nullable, если жалоба на пользователя)
- reason (choices: scam, false_info, inappropriate, other)
- description (TextField)
- status (choices: pending, investigating, resolved, rejected)
- resolved_by (FK User, admin)
- resolution_notes (TextField)
- created_at, updated_at, resolved_at
```

---

## 🌐 REST API DESIGN

### Общие принципы:

1. **Версионирование:** `/api/v1/...`
2. **Формат ответов:** JSON
3. **Пагинация:** CursorPagination для больших списков, LimitOffsetPagination для остальных
4. **Фильтрация:** django-filter с query params
5. **Сортировка:** `?ordering=-created_at` или `?ordering=price`
6. **Поля:** `?fields=id,title,price` для выборки конкретных полей
7. **Расширение:** `?expand=seller,game` для вложенных объектов

### Стандартный формат ответа:

```json
{
  "count": 100,
  "next": "https://api.wibestore.uz/api/v1/listings/?page=2",
  "previous": null,
  "results": [...]
}
```

### Формат ошибки:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Некорректные данные",
    "details": {
      "email": ["Это поле обязательно."],
      "password": ["Пароль должен содержать минимум 8 символов."]
    }
  }
}
```

### Основные endpoints:

#### Игры
```
GET    /api/v1/games/                    # Список игр
GET    /api/v1/games/{slug}/             # Детали игры
GET    /api/v1/games/{slug}/listings/    # Аккаунты игры
```

#### Аккаунты (Listings)
```
GET    /api/v1/listings/                 # Список (с фильтрами)
POST   /api/v1/listings/                 # Создать
GET    /api/v1/listings/{id}/            # Детали
PUT    /api/v1/listings/{id}/            # Обновить (владелец)
PATCH  /api/v1/listings/{id}/            # Частичное обновление
DELETE /api/v1/listings/{id}/            # Удалить (soft delete)
POST   /api/v1/listings/{id}/favorite/   # В избранное
DELETE /api/v1/listings/{id}/favorite/   # Из избранного
POST   /api/v1/listings/{id}/view/       # Засчитать просмотр
GET    /api/v1/listings/{id}/reviews/    # Отзывы
```

#### Фильтры для listings:
```
?game=pubg-mobile
?status=active
?min_price=100000
?max_price=5000000
?is_premium=true
?ordering=-created_at (или price, -price, views_count, rating)
?search=keyword (поиск по title и description)
?seller=username
?has_images=true
```

#### Профиль пользователя
```
GET    /api/v1/profile/                  # Мой профиль
PATCH  /api/v1/profile/                  # Обновить
GET    /api/v1/profile/listings/         # Мои объявления
GET    /api/v1/profile/favorites/        # Избранное
GET    /api/v1/profile/purchases/        # Покупки
GET    /api/v1/profile/sales/            # Продажи
GET    /api/v1/profile/notifications/    # Уведомления
PATCH  /api/v1/profile/notifications/{id}/read/  # Прочитать
```

#### Платежи
```
POST   /api/v1/payments/deposit/         # Пополнение баланса
POST   /api/v1/payments/withdraw/        # Вывод средств
GET    /api/v1/payments/transactions/    # История транзакций
GET    /api/v1/payments/transactions/{id}/  # Детали транзакции
POST   /api/v1/payments/webhooks/{provider}/  # Webhook от провайдера
```

#### Подписки
```
GET    /api/v1/subscriptions/plans/      # Список планов
POST   /api/v1/subscriptions/purchase/   # Купить подписку
GET    /api/v1/subscriptions/my/         # Моя подписка
POST   /api/v1/subscriptions/cancel/     # Отменить подписку
```

#### Чат
```
GET    /api/v1/chats/                    # Список диалогов
POST   /api/v1/chats/                    # Начать диалог
GET    /api/v1/chats/{id}/               # Детали диалога
GET    /api/v1/chats/{id}/messages/      # Сообщения
WebSocket /ws/chat/{id}/                 # WebSocket для real-time
```

#### Отзывы
```
POST   /api/v1/reviews/                  # Создать отзыв
GET    /api/v1/reviews/{id}/             # Детали
PUT    /api/v1/reviews/{id}/             # Обновить (свой)
DELETE /api/v1/reviews/{id}/             # Удалить (свой или админ)
POST   /api/v1/reviews/{id}/response/    # Ответ продавца
POST   /api/v1/reviews/{id}/helpful/     # Пометить как полезный
```

#### Жалобы
```
POST   /api/v1/reports/                  # Создать жалобу
GET    /api/v1/reports/                  # Список (админ)
GET    /api/v1/reports/{id}/             # Детали (админ)
PATCH  /api/v1/reports/{id}/             # Обновить статус (админ)
```

---

## 🎯 БИЗНЕС-ЛОГИКА

### 1. Комиссия системы

- **Free:** 10% комиссия с продажи
- **Premium:** 8% комиссия
- **Pro:** 5% комиссия

Комиссия рассчитывается автоматически при создании EscrowTransaction.

### 2. Escrow (Безопасная сделка)

Процесс покупки:

1. Покупатель нажимает "Купить" → создается EscrowTransaction со статусом `pending_payment`
2. Покупатель оплачивает → статус `paid`, деньги замораживаются
3. Продавец получает уведомление → передает данные аккаунта
4. Покупатель подтверждает получение → статус `delivered`
5. Через 24 часа (если нет жалоб) → статус `confirmed`, деньги переводятся продавцу (за вычетом комиссии)
6. Деньги зачисляются на баланс продавца или выводятся

### 3. Премиум подписки

Преимущества Premium:
- Выделение listing в списке (visual badge)
- Приоритет в поиске и рекомендациях
- Пониженная комиссия
- Бейдж в профиле и чате
- Приоритетная поддержка

Преимущества Pro:
- Все преимущества Premium
- Минимальная комиссия 5%
- Быстрый вывод средств (24 часа)
- Персональный менеджер
- VIP бейдж

### 4. Модерация listing

1. Пользователь создает listing → статус `pending`
2. Админ получает уведомление
3. Админ проверяет listing:
   - Approve → статус `active`, listing публикуется
   - Reject → статус `rejected`, пользователь получает уведомление с причиной
4. Время модерации: до 24 часов

### 5. Система рейтингов

- Рейтинг продавца: среднее арифметическое всех отзывов
- Отзыв можно оставить только после подтвержденной покупки
- Один отзыв на одну транзакцию
- Продавец может ответить на отзыв

---

## 🔌 CELERY ЗАДАЧИ

### Реализовать следующие асинхронные задачи:

1. **Отправка email:**
   - `send_welcome_email(user_id)`
   - `send_password_reset_email(user_id, token)`
   - `send_email_verification(user_id, token)`
   - `send_notification_email(user_id, notification_data)`
   - `send_transaction_email(transaction_id, template)`

2. **Обработка платежей:**
   - `process_deposit(transaction_id)`
   - `process_withdrawal(transaction_id)`
   - `release_escrow_payment(transaction_id)` (автоматическое освобождение через 24 часа)

3. **Подписки:**
   - `check_subscription_expirations()` (cron: каждый час)
   - `auto_renew_subscription(user_subscription_id)`
   - `send_subscription_expiring_soon(user_id)` (за 3 дня до окончания)

4. **Модерация:**
   - `notify_admins_new_listing(listing_id)`
   - `auto_approve_if_timeout(listing_id)` (если админ не проверил за 48 часов)

5. **Очистка:**
   - `cleanup_old_notifications()` (старше 90 дней)
   - `cleanup_unverified_users()` (не подтвердили email за 7 дней)
   - `archive_old_listings()` (старше 180 дней без продаж)

6. **Аналитика:**
   - `calculate_daily_statistics()`
   - `update_search_index()` (для Elasticsearch/PostgreSQL full-text)

---

## 📡 WEBSOCKET (Django Channels)

### Реализовать real-time функциональность:

1. **Чат:**
   - Подключение: `ws://api.wibestore.uz/ws/chat/{conversation_id}/`
   - Аутентификация через JWT token в query params
   - События:
     - `send_message` → отправка сообщения
     - `message_received` → получение сообщения (broadcast)
     - `message_read` → статус прочтения
     - `typing_start`, `typing_stop` → индикатор набора текста
     - `user_online`, `user_offline` → статус онлайн

2. **Уведомления:**
   - Подключение: `ws://api.wibestore.uz/ws/notifications/`
   - События:
     - `new_notification` → новое уведомление
     - `mark_as_read` → прочтение

3. **Статус listing:**
   - Подключение: `ws://api.wibestore.uz/ws/listings/{listing_id}/`
   - События:
     - `status_changed` → изменение статуса (для продавца и покупателя)
     - `new_offer` → новое предложение

### Channel Layers конфигурация:

Использовать Redis channel layers с групповой рассылкой.

---

## 🗄️ БАЗА ДАННЫХ

### PostgreSQL настройка:

1. **Расширения:**
   - `pg_trgm` — для нечеткого поиска
   - `unaccent` — для поиска без учета диакритики
   - `uuid-ossp` — для генерации UUID

2. **Индексы:**
   - Все foreign keys
   - Поля поиска: email, username, phone_number
   - Поля фильтрации: status, created_at, is_premium
   - Composite индексы: (seller, status), (game, status, created_at)
   - Full-text search индексы для title и description

3. **Партиционирование:**
   - Таблица Notification — по месяцам
   - Таблица Message — по месяцам
   - Таблица View — по месяцам

### Миграции:

- Именовать миграции осмысленно
- Создавать data migrations для начальных данных
- Тестировать миграции на staging перед production

---

## 🧪 ТЕСТИРОВАНИЕ

### Покрытие тестами:

- **Models:** 100% покрытие тестов на логику моделей
- **Services:** 90% покрытие бизнес-логики
- **Views/API:** 85% покрытие endpoints
- **Integration:** Критические user flows

### Типы тестов:

1. **Unit тесты:**
   - Тесты моделей (методы, свойства, валидация)
   - Тесты сервисов (бизнес-логика)
   - Тесты утилит

2. **Integration тесты:**
   - Тесты API endpoints
   - Тесты аутентификации
   - Тесты платежей (mock провайдеров)
   - Тесты WebSocket

3. **E2E тесты (опционально):**
   - Критические сценарии через Playwright

### Fixtures и Factories:

Использовать Factory Boy для создания тестовых данных:
- UserFactory
- GameFactory
- ListingFactory
- TransactionFactory
- SubscriptionFactory

### CI/CD:

Настроить GitHub Actions для:
- Запуска тестов при каждом PR
- Проверки покрытия (минимум 80%)
- Линтинга (black, ruff, isort)
- Безопасности (bandit)

---

## 📝 ЛОГИРОВАНИЕ

### Конфигурация logging:

1. **Формат:**
   ```
   %(asctime)s [%(levelname)s] %(name)s: %(message)s
   ```

2. **Handlers:**
   - ConsoleHandler (development)
   - FileHandler (production, ротация через logging.handlers.RotatingFileHandler)
   - SentryHandler (production, для ошибок)

3. **Loggers:**
   - `django` — общий лог Django
   - `django.request` — HTTP запросы
   - `django.db.backends` — SQL запросы (только development)
   - `apps.*` — логи приложений
   - `celery` — логи Celery

4. **Уровни:**
   - Development: DEBUG
   - Production: INFO
   - Errors: ERROR (отправка в Sentry)

### Что логировать:

- Все auth события (login, logout, register, password reset)
- Все платежные операции
- Ошибки валидации
- Изменения статусов listing
- Действия админов
- WebSocket подключения/отключения

---

## 🔒 БЕЗОПАСНОСТЬ

### Реализовать:

1. **HTTPS:** Принудительный redirect в production
2. **CORS:** Только для домена фронтенда
3. **CSRF:** Включен для session-based endpoints
4. **XSS Protection:** Content-Type headers, escape output
5. **SQL Injection:** Использовать ORM, никаких raw SQL
6. **Rate Limiting:**
   - Auth endpoints: 10 запросов в минуту
   - API endpoints: 100 запросов в минуту
   - WebSocket: 50 сообщений в минуту
7. **Input Validation:** Валидация всех входных данных
8. **Password Policy:**
   - Минимум 8 символов
   - Хотя бы 1 буква, 1 цифра
   - Проверка на распространенные пароли
9. **Account Security:**
   - django-axes для защиты от brute force
   - Уведомление о новом входе
   - Возможность завершить все сессии
10. **Data Encryption:**
    - Чувствительные данные (пароли аккаунтов) шифровать в БД
    - Использовать cryptography.fernet

---

## 🚀 PRODUCTION РАЗВЕРТЫВАНИЕ

### Docker конфигурация:

1. **Dockerfile:**
   - Multi-stage build
   - Python 3.12 slim image
   - Non-root пользователь
   - Оптимизированные слои

2. **docker-compose.yml:**
   - web (Django + Gunicorn)
   - worker (Celery)
   - beat (Celery Beat)
   - postgres
   - redis
   - nginx (reverse proxy)

### Production настройки:

1. **Gunicorn:**
   - workers = 4 (или 2-4 x CPU cores)
   - worker_class = gthread
   - threads = 4
   - timeout = 120

2. **Nginx:**
   - Reverse proxy
   - Static files serving
   - Rate limiting
   - SSL termination
   - Gzip compression

3. **PostgreSQL:**
   - Connection pooling (pgbouncer)
   - Настройка shared_buffers, work_mem
   - Regular backups

4. **Redis:**
   - Persistence (RDB + AOF)
   - Maxmemory policy

### Environment Variables:

```env
# Django
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=api.wibestore.uz,wibestore.uz

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/wibestore

# Redis
REDIS_URL=redis://localhost:6379/0

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-password
DEFAULT_FROM_EMAIL=noreply@wibestore.uz

# JWT
JWT_SECRET_KEY=your-jwt-secret
JWT_ACCESS_TOKEN_LIFETIME=15
JWT_REFRESH_TOKEN_LIFETIME=10080

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret

# Payments
PAYME_MERCHANT_ID=your-merchant-id
PAYME_SECRET_KEY=your-secret-key
CLICK_SECRET_KEY=your-secret-key

# S3 (для media)
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_STORAGE_BUCKET_NAME=wibestore-media
AWS_S3_REGION_NAME=ap-southeast-1

# Sentry
SENTRY_DSN=https://your-sentry-dsn

# Celery
CELERY_BROKER_URL=redis://localhost:6379/1
CELERY_RESULT_BACKEND=redis://localhost:6379/1
```

---

## 📚 ДОКУМЕНТАЦИЯ

### Создать:

1. **OpenAPI/Swagger:**
   - drf-spectacular для автогенерации
   - Доступно по `/api/v1/docs/`
   - Красивая UI тема

2. **README.md:**
   - Описание проекта
   - Быстрый старт
   - Установка зависимостей
   - Настройка окружения
   - Запуск миграций
   - Создание суперпользователя
   - Запуск сервера
   - Запуск Celery
   - Запуск тестов

3. **API Documentation:**
   - Описание всех endpoints
   - Примеры запросов/ответов
   - Коды ошибок

4. **Deployment Guide:**
   - Инструкция по развертыванию
   - Production чеклист
   - Monitoring setup

---

## 📈 МОНИТОРИНГ

### Настроить:

1. **Sentry:**
   - Отслеживание ошибок
   - Performance monitoring
   - Release tracking

2. **Django Debug Toolbar (development):**
   - SQL запросы
   - Cache hits/misses
   - Request time

3. **Prometheus + Grafana (production, опционально):**
   - Метрики Django
   - Метрики Celery
   - Метрики БД

4. **Health Checks:**
   - `/health/` — базовая проверка
   - `/health/detailed/` — проверка БД, Redis, Celery

---

## 🎯 КРИТЕРИИ ПРИЕМКИ

Проект считается выполненным на 100%, если:

1. ✅ Все модели данных реализованы и протестированы
2. ✅ Все API endpoints работают согласно спецификации
3. ✅ Аутентификация (JWT + Google OAuth) полностью функциональна
4. ✅ Celery задачи выполняются корректно
5. ✅ WebSocket чат работает в real-time
6. ✅ Платежные webhook обрабатываются правильно
7. ✅ Админ-панель Django настроена для всех моделей
8. ✅ Тесты проходят с покрытием >80%
9. ✅ Документация API автогенерируется и доступна
10. ✅ Docker контейнеры запускаются без ошибок
11. ✅ Нет critical/security warnings от линтеров
12. ✅ Production настройки оптимизированы
13. ✅ Логирование настроено и работает
14. ✅ Обработка ошибок реализована повсеместно
15. ✅ Код отформатирован через black и ruff

---

## 📝 ДОПОЛНИТЕЛЬНЫЕ ТРЕБОВАНИЯ

### Код должен быть:

1. **Чистым:** Следовать DRY, KISS, YAGNI
2. **Читаемым:** Понятные имена переменных, функций, классов
3. **Модульным:** Логика разделена на сервисы, селекторы, views
4. **Типизированным:** Использовать type hints (Python 3.12+)
5. **Документированным:** Docstrings для публичных API

### Запрещается:

1. Business logic в views (только в services)
2. Hardcoded значения (использовать settings/constants)
3. N+1 queries (использовать select_related/prefetch_related)
4. Игнорирование exceptions
5. Коммиты с .env, __pycache__, db.sqlite3

### Рекомендуется:

1. Использовать async views где возможно
2. Кэширование часто запрашиваемых данных (Redis)
3. Database transactions для критических операций
4. Optimistic/pessimistic locking для конкурентных операций
5. Soft delete для важных моделей

---

## 🚀 ПЛАН РАЗРАБОТКИ

### Этап 1: Настройка проекта (1-2 дня)
- Инициализация Django проекта
- Настройка структуры папок
- Конфигурация Docker
- Настройка CI/CD

### Этап 2: Модели данных (2-3 дня)
- Реализация всех моделей
- Миграции
- Django Admin настройка
- Тесты моделей

### Этап 3: Аутентификация (2-3 дня)
- Custom User модель
- JWT настройка
- Google OAuth
- Тесты аутентификации

### Этап 4: API endpoints (4-5 дней)
- Games API
- Listings API
- Profile API
- Payments API
- Subscriptions API
- Chat API
- Reviews API
- Reports API

### Этап 5: Бизнес-логика (3-4 дня)
- Services слой
- Escrow логика
- Комиссия расчет
- Подписки логика

### Этап 6: Celery задачи (2-3 дня)
- Email отправка
- Платежи обработка
- Подписки мониторинг
- Очистка задач

### Этап 7: WebSocket (2-3 дня)
- Django Channels настройка
- Чат реализация
- Уведомления real-time

### Этап 8: Тестирование (3-4 дня)
- Unit тесты
- Integration тесты
- API тесты
- Performance тесты

### Этап 9: Документация и полировка (2-3 дня)
- OpenAPI документация
- README
- Production настройка
- Финальное тестирование

**Итого: 21-30 дней**

---

## 💪 ЗАКЛЮЧЕНИЕ

Это задание требует создания **профессионального, production-ready backend** для маркетплейса игровых аккаунтов. Все компоненты должны быть реализованы с соблюдением best practices, с акцентом на безопасность, производительность и масштабируемость.

Код должен быть образцовым, чтобы его можно было использовать как референс для других проектов. Каждый файл, каждая функция должны быть обоснованы и оптимизированы.

**Удачи в разработке! 🚀**
