# FoxYvn Landing - Быстрый Старт 🚀

> Всё уже настроено и работает!

---

## ✅ Что Готово

1. **Репозиторий склонирован** из GitHub: `~/lab/foxyvn-landing/project/`
2. **Podman контейнер собран и запущен:** `foxyvn-landing-dev`
3. **Vite dev server работает:** доступен на **http://localhost:5173**
4. **AGENTS.md создан** - инструкции для Codex AI веб-дизайнера
5. **Полная изоляция** - rootless контейнер, безопасность ✓

---

## 🎯 Доступ к Лендингу

### Из Windows
Открой в браузере: **http://localhost:5173**

### Из WSL
```bash
curl -I http://localhost:5173
```

---

## 🔧 Управление Контейнером

### Проверка статуса
```bash
podman ps --filter "name=foxyvn-landing-dev"
```

### Просмотр логов
```bash
podman logs -f foxyvn-landing-dev
```

### Остановка
```bash
podman stop foxyvn-landing-dev
```

### Запуск после остановки
```bash
podman start foxyvn-landing-dev
```

### Вход в контейнер (shell)
```bash
podman exec -it foxyvn-landing-dev /bin/sh
```

### Перезапуск
```bash
podman restart foxyvn-landing-dev
```

### Полное удаление
```bash
podman stop foxyvn-landing-dev
podman rm foxyvn-landing-dev
podman volume rm foxyvn-node-modules
```

---

## 🤖 Codex AI - Веб-Дизайнер Эксперт

Codex настроен как профессиональный веб-дизайнер. Он прочитает `AGENTS.md` и выполнит полный анализ.

### Запуск анализа

```bash
cd ~/lab/foxyvn-landing/project
codex
```

**Codex автоматически:**
1. Прочитает `AGENTS.md` (инструкции)
2. Проанализирует весь React код
3. Проверит:
   - UI/UX дизайн
   - Responsive design (все breakpoints)
   - Accessibility (WCAG 2.1 AA)
   - Performance (Core Web Vitals)
   - Code quality (TypeScript best practices)
   - React 19 patterns
   - Tailwind CSS 4 usage
4. Найдёт все проблемы
5. Исправит их автоматически (автономный режим!)
6. Оптимизирует код

### Или запусти с конкретной задачей

```bash
cd ~/lab/foxyvn-landing/project

# Проверка responsive design
codex "Проверь responsive design на всех breakpoints (320px, 768px, 1024px, 1440px+). Исправь все проблемы с адаптацией."

# Audit accessibility
codex "Сделай полный accessibility audit по WCAG 2.1 AA. Исправь все найденные проблемы."

# Performance optimization
codex "Оптимизируй performance: bundle size, lazy loading, image optimization, Core Web Vitals."

# Code quality
codex "Проверь TypeScript code quality, исправь все антипаттерны, улучши структуру."
```

---

## 📁 Структура Проекта

```
~/lab/foxyvn-landing/
├── project/                    # Исходный код (изменяй здесь!)
│   ├── client/src/            # React компоненты
│   ├── AGENTS.md              # 🔥 Инструкции для Codex
│   └── package.json
├── container/                  # Docker конфигурация
│   ├── Dockerfile
│   └── docker-compose.yml
├── README.md                   # Полная документация
├── QUICKSTART.md               # Этот файл
└── manage.sh                   # Скрипт управления (опционально)
```

---

## 🎨 Редактирование Кода

### Файлы синхронизируются автоматически!

Изменяй файлы в `~/lab/foxyvn-landing/project/` любым редактором:

```bash
# VS Code
code ~/lab/foxyvn-landing/project

# Vim
vim ~/lab/foxyvn-landing/project/client/src/App.tsx

# Nano
nano ~/lab/foxyvn-landing/project/client/src/App.tsx
```

**Hot Module Replacement работает** - изменения видны сразу в браузере!

---

## 🔍 Важные Команды

### Установка новых зависимостей
```bash
podman exec -it foxyvn-landing-dev pnpm add имя-пакета
podman exec -it foxyvn-landing-dev pnpm add -D имя-dev-пакета
```

### Production build
```bash
podman exec -it foxyvn-landing-dev pnpm build
```

### TypeScript check
```bash
podman exec -it foxyvn-landing-dev pnpm typecheck
```

### Lint check
```bash
podman exec -it foxyvn-landing-dev pnpm lint
```

### Preview production build
```bash
podman exec -it foxyvn-landing-dev pnpm preview
```

---

## 🛡️ Безопасность

✅ **Rootless контейнер** - работает от пользователя `node` (UID 1000)
✅ **Изолированный** - не может навредить системе WSL
✅ **Ограничения ресурсов** - max 2GB RAM, 2 CPU cores
✅ **No new privileges** - не может получить дополнительные привилегии
✅ **Named volume** - node_modules изолированы от хоста

---

## 🐛 Troubleshooting

### Сайт не открывается в браузере

```bash
# Проверь что контейнер запущен
podman ps --filter "name=foxyvn-landing-dev"

# Проверь логи
podman logs foxyvn-landing-dev

# Перезапусти
podman restart foxyvn-landing-dev
```

### Изменения кода не отображаются

```bash
# Перезапусти контейнер
podman restart foxyvn-landing-dev

# Очисти кеш браузера (Ctrl+Shift+R)
```

### Порт 5173 занят

```bash
# Найди процесс
lsof -i :5173

# Останови старый контейнер
podman stop foxyvn-landing-dev

# Или убей процесс
kill -9 <PID>
```

### Контейнер не стартует

```bash
# Пересоздай контейнер
podman stop foxyvn-landing-dev
podman rm foxyvn-landing-dev

# Запусти заново
podman run -d \
  --name foxyvn-landing-dev \
  --user node \
  -p 5173:3000 \
  -v ~/lab/foxyvn-landing/project:/workspace:rw \
  -v foxyvn-node-modules:/workspace/node_modules \
  --memory=2g \
  --cpus=2 \
  --security-opt=no-new-privileges:true \
  localhost/foxyvn-landing:dev
```

---

## 📊 Monitoring

### Использование ресурсов
```bash
podman stats foxyvn-landing-dev
```

### Информация о контейнере
```bash
podman inspect foxyvn-landing-dev
```

### Volumes
```bash
podman volume ls
podman volume inspect foxyvn-node-modules
```

---

## 🎯 Next Steps

### 1. Открой сайт
```
http://localhost:5173
```

### 2. Запусти Codex анализ
```bash
cd ~/lab/foxyvn-landing/project
codex "Ты - веб-дизайнер эксперт. Проанализируй этот landing page: UI/UX, responsive, a11y, performance, code quality. Исправь все проблемы. Читай AGENTS.md."
```

### 3. Проверь результат
Codex автоматически:
- Найдёт и исправит ошибки
- Улучшит дизайн
- Оптимизирует код
- Добавит best practices

### 4. Посмотри изменения
```bash
cd ~/lab/foxyvn-landing/project
git diff
```

### 5. Закоммить (если всё ок)
```bash
git add .
git commit -m "Codex improvements: UI/UX, responsive, a11y, performance"
git push
```

---

## 🔗 Ссылки

- **Проект на GitHub:** https://github.com/E3FE3/Fox_Yvn_Landing_v2
- **React 19:** https://react.dev
- **Vite 7:** https://vitejs.dev
- **Tailwind CSS 4:** https://tailwindcss.com
- **shadcn/ui:** https://ui.shadcn.com

---

## 💡 Полезные Советы

### Codex работает автономно!
Он сам принимает решения и исправляет код. Просто запусти и жди результата.

### AGENTS.md - твой лучший друг
Обнови `project/AGENTS.md` если:
- Изменилась архитектура
- Добавились новые правила кодирования
- Нужны специфичные инструкции для AI

### Контейнер изолирован
Можешь экспериментировать без страха сломать систему.

### Hot reload работает
Изменения в коде видны сразу в браузере.

---

**Готово! Всё работает и настроено.**

Открой **http://localhost:5173** и начинай! 🚀
