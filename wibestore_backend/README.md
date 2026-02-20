# WibeStore Backend

Django REST API для маркетплейса игровых аккаунтов WibeStore.

## 🚀 Быстрый старт

### Требования

- Python 3.12+
- PostgreSQL 16+
- Redis 7+

### Установка

```bash
# Создать виртуальное окружение
python -m venv venv

# Активировать
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Установить зависимости
pip install -r requirements.txt

# Скопировать .env
copy .env.example .env  # Windows
cp .env.example .env  # Linux/Mac

# Применить миграции
python manage.py migrate

# Создать суперпользователя
python manage.py createsuperuser

# Запустить сервер
python manage.py runserver
```

### Docker

```bash
# Запустить все сервисы
docker-compose up -d

# Миграции
docker-compose exec web python manage.py migrate

# Суперпользователь
docker-compose exec web python manage.py createsuperuser
```

## 📁 Структура проекта

```
wibestore_backend/
├── apps/                    # Django приложения
│   ├── accounts/           # Аутентификация и пользователи
│   ├── games/              # Игры
│   ├── marketplace/        # Listings, покупки/продажи
│   ├── payments/           # Платежи
│   ├── subscriptions/      # Подписки
│   ├── messaging/          # Чат
│   ├── notifications/      # Уведомления
│   ├── reviews/            # Отзывы
│   ├── reports/            # Жалобы
│   └── admin_panel/        # Админ панель
├── config/                  # Настройки Django
│   ├── settings/           # Настройки для разных окружений
│   ├── urls.py             # Корневой URLconf
│   ├── asgi.py             # ASGI config (WebSocket)
│   └── wsgi.py             # WSGI config
├── core/                    # Общие утилиты
│   ├── constants.py        # Константы
│   ├── validators.py       # Валидаторы
│   └── utils.py            # Утилиты
├── templates/              # Django templates
├── static/                 # Статические файлы
├── media/                  # Медиа файлы
├── logs/                   # Логи
├── tests/                  # Тесты
├── manage.py               # Django management
├── requirements.txt        # Зависимости
├── docker-compose.yml      # Docker Compose
└── Dockerfile              # Docker image
```

## 🔌 API Endpoints

### Authentication

- `POST /api/v1/auth/register/` - Регистрация
- `POST /api/v1/auth/login/` - Login
- `POST /api/v1/auth/logout/` - Logout
- `POST /api/v1/auth/refresh/` - Refresh token
- `POST /api/v1/auth/google/` - Google OAuth
- `GET /api/v1/auth/me/` - Текущий пользователь
- `PATCH /api/v1/auth/me/` - Обновить профиль

### Games

- `GET /api/v1/games/` - Список игр
- `GET /api/v1/games/{slug}/` - Игра по slug
- `GET /api/v1/games/{slug}/listings/` - Listings игры

### Listings

- `GET /api/v1/listings/` - Список listing'ов
- `POST /api/v1/listings/` - Создать listing
- `GET /api/v1/listings/{id}/` - Listing по ID
- `PUT/PATCH /api/v1/listings/{id}/` - Обновить listing
- `DELETE /api/v1/listings/{id}/` - Удалить listing
- `POST /api/v1/listings/{id}/favorite/` - В избранное
- `POST /api/v1/listings/{id}/view/` - Засчитать просмотр

### Profile

- `GET /api/v1/profile/` - Профиль
- `PATCH /api/v1/profile/` - Обновить профиль
- `GET /api/v1/profile/listings/` - Мои listings
- `GET /api/v1/profile/favorites/` - Избранное
- `GET /api/v1/profile/purchases/` - Покупки
- `GET /api/v1/profile/sales/` - Продажи
- `GET /api/v1/profile/notifications/` - Уведомления

### Payments

- `POST /api/v1/payments/deposit/` - Депозит
- `POST /api/v1/payments/withdraw/` - Вывод
- `GET /api/v1/payments/transactions/` - История транзакций

### Subscriptions

- `GET /api/v1/subscriptions/plans/` - Планы подписок
- `POST /api/v1/subscriptions/purchase/` - Купить подписку
- `GET /api/v1/subscriptions/my/` - Мои подписки
- `POST /api/v1/subscriptions/{id}/cancel/` - Отменить подписку

### Chat

- `GET /api/v1/chats/` - Список чатов
- `POST /api/v1/chats/` - Создать чат
- `GET /api/v1/chats/{id}/` - Чат по ID
- `GET /api/v1/chats/{id}/messages/` - Сообщения
- `WS /ws/chat/{id}/` - WebSocket для real-time чата

### Reviews

- `POST /api/v1/reviews/` - Создать отзыв
- `GET/PUT/DELETE /api/v1/reviews/{id}/` - CRUD отзыва
- `POST /api/v1/reviews/{id}/response/` - Ответ на отзыв
- `POST /api/v1/reviews/{id}/helpful/` - Отметить как полезный

### Admin

- `GET /api/v1/admin-panel/dashboard/` - Dashboard
- `GET /api/v1/admin-panel/users/` - Пользователи
- `GET /api/v1/admin-panel/listings/` - Listings
- `GET /api/v1/admin-panel/reports/` - Жалобы
- `GET /api/v1/admin-panel/transactions/` - Транзакции

## 📚 Документация

Swagger UI доступен на `/api/v1/docs/` после запуска сервера.

## 🧪 Тестирование

```bash
# Запустить тесты
pytest

# С coverage
pytest --cov=apps

# Конкретный файл
pytest apps/accounts/tests/test_auth.py -v
```

## 🔧 Настройки

### Переменные окружения

См. `.env.example` для полного списка переменных.

### Database

```env
DATABASE_URL=postgresql://wibestore:wibestore_password@localhost:5432/wibestore_db
```

### Redis

```env
REDIS_URL=redis://localhost:6379/0
```

### JWT

```env
JWT_SECRET_KEY=your-secret-key
JWT_ACCESS_TOKEN_LIFETIME=15
JWT_REFRESH_TOKEN_LIFETIME=10080
```

## 📦 Production

### Сборка статики

```bash
python manage.py collectstatic --noinput
```

### Миграции

```bash
python manage.py migrate
```

### Запуск с Gunicorn

```bash
gunicorn config.wsgi:application --bind 0.0.0.0:8000
```

### Celery Worker

```bash
celery -A config worker -l INFO --concurrency=4
```

### Celery Beat

```bash
celery -A config beat -l INFO
```

## 🐛 Debugging

### Включить debug logging

В `development.py`:

```python
LOGGING["loggers"]["apps"]["level"] = "DEBUG"
```

### Django Debug Toolbar

Установлен в development режиме. Доступен на `/__debug__/`.

## 📞 Support

- Email: support@wibestore.uz
- Telegram: @wibestore_support

---

WibeStore © 2024
