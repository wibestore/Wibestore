# 🚀 WibeStore Integration Guide

Полное руководство по интеграции Frontend + Backend + Database.

## 📋 Содержание

1. [Быстрый старт](#быстрый-старт)
2. [Настройка окружения](#настройка-окружения)
3. [API Integration](#api-integration)
4. [WebSocket Integration](#websocket-integration)
5. [Docker Deployment](#docker-deployment)
6. [Production Checklist](#production-checklist)

---

## 🏃 Быстрый старт

### Требования

- **Node.js** 20+
- **Python** 3.12+
- **PostgreSQL** 16+
- **Redis** 7+
- **Docker** (опционально)

### 1. Backend запуск

```bash
cd wibestore_backend

# Создать виртуальное окружение
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Установить зависимости
pip install -r requirements.txt

# Настроить .env (скопировать из .env.example)
copy .env.example .env  # Windows
cp .env.example .env  # Linux/Mac

# Запустить миграции
python manage.py migrate

# Создать суперпользователя
python manage.py createsuperuser

# Запустить сервер
python manage.py runserver
```

### 2. Frontend запуск

```bash
cd c:\WibeStore\Wibestore

# Установить зависимости
npm install

# Настроить .env (уже создан)
# VITE_API_BASE_URL=http://localhost:8000/api/v1

# Запустить dev сервер
npm run dev
```

### 3. Docker запуск (рекомендуется)

```bash
cd wibestore_backend

# Запустить все сервисы
docker-compose up -d

# Применить миграции
docker-compose exec web python manage.py migrate

# Создать суперпользователя
docker-compose exec web python manage.py createsuperuser

# Просмотр логов
docker-compose logs -f
```

---

## ⚙️ Настройка окружения

### Backend (.env)

```env
# Django
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DATABASE_URL=postgresql://wibestore:wibestore_password@localhost:5432/wibestore_db

# Redis
REDIS_URL=redis://localhost:6379/0

# JWT
JWT_SECRET_KEY=your-jwt-secret
JWT_ACCESS_TOKEN_LIFETIME=15
JWT_REFRESH_TOKEN_LIFETIME=10080

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# Payments (test mode)
PAYME_MERCHANT_ID=test-merchant-id
PAYME_SECRET_KEY=test-secret-key
```

### Frontend (.env)

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_WS_BASE_URL=ws://localhost:8000

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your-google-client-id

# Sentry (production)
VITE_SENTRY_DSN=your-sentry-dsn

# Environment
VITE_ENVIRONMENT=development
```

---

## 🔌 API Integration

### API Client

Централизованный клиент находится в `src/lib/apiClient.js`:

```javascript
import apiClient from './lib/apiClient';

// GET запрос
const { data } = await apiClient.get('/games/');

// POST запрос
const { data } = await apiClient.post('/listings/', listingData);

// PUT/PATCH запрос
const { data } = await apiClient.patch('/profile/', updates);

// DELETE запрос
await apiClient.delete(`/listings/${id}/`);
```

### Автоматическая авторизация

API клиент автоматически:
- Добавляет JWT токен в заголовки
- Обновляет токен при 401 ошибке
- Выполняет logout при 403 ошибке
- Показывает toast уведомления об ошибках

### React Query Hooks

Все hooks находятся в `src/hooks/`:

```javascript
import {
  useGames,
  useListing,
  useProfile,
  useCreateListing,
  useAddToFavorites,
} from './hooks';

// Использование
const { data: games } = useGames();
const { data: listing } = useListing(id);
const { data: profile } = useProfile();

const createListing = useCreateListing();
const addToFavorites = useAddToFavorites();
```

### Доступные Hooks

| Hook | Описание |
|------|----------|
| `useGames()` | Список игр |
| `useGame(slug)` | Конкретная игра |
| `useListings(filters)` | Список listing'ов |
| `useListing(id)` | Конкретный listing |
| `useProfile()` | Профиль пользователя |
| `useChats()` | Список чатов |
| `useChat(chatId)` | Конкретный чат |
| `useNotifications()` | Уведомления |
| `useTransactions()` | Транзакции |
| `useAdminDashboard()` | Admin статистика |

---

## 🔌 WebSocket Integration

### Подключение

```javascript
import { useWebSocket } from './hooks';

const { isConnected, sendMessage, lastMessage } = useWebSocket(
  'ws://localhost:8000/ws/chat/room-id/',
  {
    onMessage: (data) => console.log('Message:', data),
    onOpen: () => console.log('Connected'),
    onClose: () => console.log('Disconnected'),
  }
);
```

### Чат

```javascript
import { useChatWebSocket } from './hooks';

const { isConnected, sendMessage, lastMessage } = useChatWebSocket(chatId, {
  onMessage: (message) => {
    // Handle new message
  },
});

// Отправить сообщение
sendMessage({ type: 'chat.message', content: 'Hello!' });
```

### Уведомления

```javascript
import { useNotificationWebSocket } from './hooks';

const { lastMessage } = useNotificationWebSocket({
  onMessage: (notification) => {
    // Show toast notification
  },
});
```

---

## 🐳 Docker Deployment

### docker-compose.yml

```yaml
services:
  web:
    build: .
    ports:
      - "8000:8000"
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:16-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

  celery_worker:
    build: .
    command: celery -A config worker -l INFO

  celery_beat:
    build: .
    command: celery -A config beat -l INFO

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
```

### Команды

```bash
# Запуск
docker-compose up -d

# Остановка
docker-compose down

# Логи
docker-compose logs -f

# Миграции
docker-compose exec web python manage.py migrate

# Создать суперпользователя
docker-compose exec web python manage.py createsuperuser

# Тесты
docker-compose exec web pytest

# Сборка статики
docker-compose exec web python manage.py collectstatic --noinput
```

---

## ✅ Production Checklist

### Backend

- [ ] SECRET_KEY установлен в production
- [ ] DEBUG = False
- [ ] ALLOWED_HOSTS настроен
- [ ] DATABASE_URL для production
- [ ] REDIS_URL для production
- [ ] EMAIL_HOST настроен
- [ ] HTTPS включен
- [ ] Static files собраны
- [ ] Media storage настроен (S3)
- [ ] Celery worker запущен
- [ ] Celery beat запущен
- [ ] Nginx настроен
- [ ] Gunicorn настроен
- [ ] Logs настроены
- [ ] Sentry настроен

### Frontend

- [ ] VITE_API_BASE_URL установлен
- [ ] VITE_GOOGLE_CLIENT_ID установлен
- [ ] VITE_SENTRY_DSN установлен
- [ ] Сборка прошла успешно
- [ ] Code splitting работает
- [ ] Sourcemaps для production
- [ ] Gzip/Brotli сжатие

### Security

- [ ] HTTPS настроен
- [ ] CORS настроен
- [ ] CSRF защита включена
- [ ] Rate limiting включен
- [ ] SQL Injection защита (ORM)
- [ ] XSS защита

### Monitoring

- [ ] Health check endpoints работают
- [ ] Sentry настроен
- [ ] Логирование включено
- [ ] Metrics endpoint работает

---

## 📝 API Endpoints

### Authentication

| Method | Endpoint | Описание |
|--------|----------|----------|
| POST | `/api/v1/auth/register/` | Регистрация |
| POST | `/api/v1/auth/login/` | Login |
| POST | `/api/v1/auth/logout/` | Logout |
| POST | `/api/v1/auth/refresh/` | Refresh token |
| POST | `/api/v1/auth/google/` | Google OAuth |
| GET | `/api/v1/auth/me/` | Текущий пользователь |
| PATCH | `/api/v1/auth/me/` | Обновить профиль |

### Games

| Method | Endpoint | Описание |
|--------|----------|----------|
| GET | `/api/v1/games/` | Список игр |
| GET | `/api/v1/games/{slug}/` | Игра по slug |
| GET | `/api/v1/games/{slug}/listings/` | Listings игры |

### Listings

| Method | Endpoint | Описание |
|--------|----------|----------|
| GET | `/api/v1/listings/` | Список listing'ов |
| POST | `/api/v1/listings/` | Создать listing |
| GET | `/api/v1/listings/{id}/` | Listing по ID |
| PUT/PATCH | `/api/v1/listings/{id}/` | Обновить listing |
| DELETE | `/api/v1/listings/{id}/` | Удалить listing |
| POST | `/api/v1/listings/{id}/favorite/` | В избранное |
| DELETE | `/api/v1/listings/{id}/favorite/` | Из избранного |
| POST | `/api/v1/listings/{id}/view/` | Засчитать просмотр |

### Profile

| Method | Endpoint | Описание |
|--------|----------|----------|
| GET | `/api/v1/profile/` | Профиль |
| PATCH | `/api/v1/profile/` | Обновить профиль |
| GET | `/api/v1/profile/listings/` | Мои listings |
| GET | `/api/v1/profile/favorites/` | Избранное |
| GET | `/api/v1/profile/purchases/` | Покупки |
| GET | `/api/v1/profile/sales/` | Продажи |
| GET | `/api/v1/profile/notifications/` | Уведомления |

### Payments

| Method | Endpoint | Описание |
|--------|----------|----------|
| POST | `/api/v1/payments/deposit/` | Депозит |
| POST | `/api/v1/payments/withdraw/` | Вывод |
| GET | `/api/v1/payments/transactions/` | История |

### Subscriptions

| Method | Endpoint | Описание |
|--------|----------|----------|
| GET | `/api/v1/subscriptions/plans/` | Планы |
| POST | `/api/v1/subscriptions/purchase/` | Купить |
| GET | `/api/v1/subscriptions/my/` | Мои подписки |
| POST | `/api/v1/subscriptions/{id}/cancel/` | Отменить |

### Chat

| Method | Endpoint | Описание |
|--------|----------|----------|
| GET | `/api/v1/chats/` | Список чатов |
| POST | `/api/v1/chats/` | Создать чат |
| GET | `/api/v1/chats/{id}/` | Чат по ID |
| GET | `/api/v1/chats/{id}/messages/` | Сообщения |
| WS | `/ws/chat/{id}/` | WebSocket чат |

### Reviews

| Method | Endpoint | Описание |
|--------|----------|----------|
| POST | `/api/v1/reviews/` | Создать отзыв |
| GET | `/api/v1/reviews/{id}/` | Отзыв по ID |
| PUT | `/api/v1/reviews/{id}/` | Обновить отзыв |
| DELETE | `/api/v1/reviews/{id}/` | Удалить отзыв |
| POST | `/api/v1/reviews/{id}/response/` | Ответ на отзыв |
| POST | `/api/v1/reviews/{id}/helpful/` | Полезный отзыв |

### Admin

| Method | Endpoint | Описание |
|--------|----------|----------|
| GET | `/api/v1/admin-panel/dashboard/` | Dashboard |
| GET | `/api/v1/admin-panel/users/` | Пользователи |
| PATCH | `/api/v1/admin-panel/users/{id}/` | Обновить пользователя |
| GET | `/api/v1/admin-panel/listings/` | Listings |
| PATCH | `/api/v1/admin-panel/listings/{id}/` | Модерация |
| GET | `/api/v1/admin-panel/reports/` | Жалобы |
| GET | `/api/v1/admin-panel/transactions/` | Транзакции |

---

## 🧪 Testing

### Backend

```bash
# Запустить тесты
pytest

# С coverage
pytest --cov=apps

# Конкретный тест
pytest apps/accounts/tests/test_auth.py
```

### Frontend

```bash
# Запустить линтер
npm run lint

# Сборка
npm run build

# Preview production сборки
npm run preview
```

---

## 📞 Support

- **Документация**: `/api/v1/docs/` (Swagger UI)
- **Health Check**: `/health/`
- **Detailed Health**: `/health/detailed/`

---

## 📄 License

WibeStore © 2024. Все права защищены.
