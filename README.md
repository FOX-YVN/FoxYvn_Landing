# FoxYvn Landing

Премиальный одностраничный лендинг для FoxYvn: современный дизайн, быстрая загрузка, многоязычность.

## Технологии

- **Frontend**: React 18.3.1 + TypeScript 5.6.3
- **Build**: Vite 7
- **Стили**: Tailwind CSS 4 + custom animations
- **UI компоненты**: shadcn/ui
- **Иконки**: Lucide React
- **Роутинг**: Wouter

## Основные возможности

- Быстрый рендер и минимальный JavaScript
- Тёмная тема с оранжевым брендингом
- Переключатель языков (армянский / английский / русский)
- Glassmorphism дизайн
- Letter-by-letter текстовые анимации
- Smooth scroll эффекты
- Responsive layout для всех устройств
- ErrorBoundary для безопасного рендера
- Опциональная Umami аналитика

## Требования

- Node.js 20.19+ или 22.12+
- pnpm (рекомендуется) или npm
- Podman или Docker (для контейнерной разработки)

## Разработка

### Через Podman контейнер (рекомендуется)

```bash
# Сборка образа
./manage.sh build

# Запуск dev сервера
./manage.sh start

# Логи
./manage.sh logs

# Остановка
./manage.sh stop

# Вход в контейнер
./manage.sh shell
```

Dev server доступен на http://localhost:5173

### Локально

```bash
# Установка зависимостей
pnpm install

# Запуск dev сервера
pnpm dev

# Production сборка
pnpm build

# Просмотр production сборки
pnpm preview
```

## Структура проекта

```
foxyvn-landing/
├── client/              # Frontend код
│   ├── src/             # React компоненты, страницы
│   ├── public/          # Статические файлы
│   └── index.html       # HTML точка входа
├── container/           # Podman/Docker конфигурация
│   ├── Dockerfile
│   └── docker-compose.yml
├── package.json
├── vite.config.ts
├── manage.sh            # Скрипт управления контейнером
└── load_secrets.sh      # Загрузка переменных из 1Password
```

## Переменные окружения

Переменные хранятся в 1Password и загружаются автоматически через `load_secrets.sh`:

- `VITE_SITE_URL` - URL сайта для meta тегов
- `VITE_APP_TITLE` - Заголовок приложения
- `VITE_APP_LOGO` - Путь к логотипу
- `VITE_ANALYTICS_ENDPOINT` - Endpoint для Umami (опционально)
- `VITE_ANALYTICS_WEBSITE_ID` - Website ID для Umami (опционально)

## Production деплой

```bash
cd /home/e3fe3/lab/foxyvn_pod/foxyvn-landing
pnpm install
pnpm build
```

Результат в `dist/` готов для деплоя на:
- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages
- Любой статический хостинг

## Безопасность

- Rootless Podman контейнер (пользователь node)
- Переменные окружения в 1Password
- .env файлы исключены из git
- Права доступа .env: 600 (только владелец)
- No inline scripts
- Resource limits для контейнера
