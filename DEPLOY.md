# 🚀 Деплой на GitHub Pages

## ⚡ Автоматический деплой

Проект настроен на автоматический деплой на GitHub Pages при каждом push в ветку `main`.

## 🧰 Требования

- Node.js 20.19+ или 22.12+ (Vite 7)
- pnpm или npm

## 🛠️ Настройка (одноразово)

### 1. Включите GitHub Pages в настройках репозитория

1. Откройте **Settings** → **Pages**
2. В разделе **Source** выберите **GitHub Actions**
3. Сохраните изменения

### 2. Push изменений в main

```bash
git checkout main
git pull
git push origin main
```

После push в `main` автоматически запустится GitHub Actions workflow, который:
- Установит зависимости
- Соберет проект
- Задеплоит на GitHub Pages

## 📱 URL сайта

**https://e3fe3.github.io/Fox_Yvn_Landing/**

## 🔍 Проверка статуса

1. Откройте репозиторий на GitHub
2. Перейдите во вкладку **Actions**
3. Проверьте статус последнего workflow "Deploy to GitHub Pages"

## ⚙️ Локальная сборка

```bash
pnpm install
pnpm run build:client
pnpm run preview
```

## 🧩 Технические детали

- **Base URL**: `/Fox_Yvn_Landing/` (в GitHub Actions)
- **Build directory**: `dist/public`
- **Workflow**: `.github/workflows/deploy.yml`
- **Vite config**: `vite.config.ts`
- **Meta/OG ссылки**: используют `VITE_SITE_URL`
- **Ассеты**: используют `%BASE_URL%` (не ломаются на GitHub Pages)

## 🐛 Troubleshooting

### Сайт не открывается
- Проверьте статус workflow в Actions
- Убедитесь, что GitHub Pages включены в Settings → Pages
- Проверьте, что Source выбран "GitHub Actions"

### Стили не загружаются
- Проверьте base path в `vite.config.ts`
- Проверьте `VITE_SITE_URL`, если используются absolute OG/Canonical URL

### 404 ошибки
- Убедитесь, что все ассеты используют относительные пути
- Проверьте, что `base` в `vite.config.ts` соответствует имени репозитория
