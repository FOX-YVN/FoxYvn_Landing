#!/bin/bash
# FoxYvn Landing - Container Management Script
# Rootless Podman для безопасной изоляции

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONTAINER_DIR="$PROJECT_DIR/container"
PROJECT_SOURCE="$PROJECT_DIR"
IMAGE_NAME="foxyvn-landing:dev"
CONTAINER_NAME="foxyvn-landing-dev"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if podman is installed
check_podman() {
    if ! command -v podman &> /dev/null; then
        log_error "Podman не установлен. Установи: sudo apt install podman"
        exit 1
    fi
}

# Load secrets from 1Password
load_secrets() {
    if [ -f "$PROJECT_DIR/load_secrets.sh" ]; then
        log_info "Загрузка секретов из 1Password..."
        "$PROJECT_DIR/load_secrets.sh"
    else
        log_warning "load_secrets.sh не найден. Используется существующий .env"
    fi
}

# Build container image
build() {
    log_info "Сборка Docker образа..."
    cd "$CONTAINER_DIR"
    podman build -t "$IMAGE_NAME" -f Dockerfile ..
    log_success "Образ $IMAGE_NAME успешно собран!"
}

# Start container
start() {
    load_secrets
    log_info "Запуск контейнера..."
    cd "$CONTAINER_DIR"
    podman-compose up -d
    log_success "Контейнер запущен!"
    log_info "Vite dev server доступен на: http://localhost:5173"
}

# Stop container
stop() {
    log_info "Остановка контейнера..."
    cd "$CONTAINER_DIR"
    podman-compose down
    log_success "Контейнер остановлен!"
}

# Restart container
restart() {
    stop
    start
}

# Show logs
logs() {
    log_info "Логи контейнера:"
    podman logs -f "$CONTAINER_NAME"
}

# Enter container shell
shell() {
    log_info "Вход в контейнер..."
    podman exec -it "$CONTAINER_NAME" /bin/sh
}

# Show status
status() {
    log_info "Статус контейнера:"
    podman ps -a --filter "name=$CONTAINER_NAME"
    echo ""
    log_info "Образы:"
    podman images --filter "reference=$IMAGE_NAME"
}

# Clean up
clean() {
    log_warning "Удаление контейнера и образа..."
    podman stop "$CONTAINER_NAME" 2>/dev/null || true
    podman rm "$CONTAINER_NAME" 2>/dev/null || true
    podman rmi "$IMAGE_NAME" 2>/dev/null || true
    log_success "Очистка завершена!"
}

# Install dependencies inside container
install() {
    log_info "Установка зависимостей..."
    podman exec -it "$CONTAINER_NAME" pnpm install
    log_success "Зависимости установлены!"
}

# Run codex for analysis and improvements
codex_analyze() {
    log_info "Запуск Codex для анализа и улучшения..."
    log_info "Codex будет работать как веб-дизайнер эксперт"
    cd "$PROJECT_SOURCE"

    # Check if AGENTS.md exists
    if [ ! -f "AGENTS.md" ]; then
        log_warning "AGENTS.md не найден. Создай его сначала!"
        exit 1
    fi

    # Run Codex in autonomous mode
    codex "Ты - веб-дизайнер эксперт. Проанализируй этот React landing page:
    1. Проверь best practices для React 19 + TypeScript + Vite + Tailwind CSS 4
    2. Проверь UI/UX дизайн, доступность (a11y), performance
    3. Проверь responsive design, мобильную адаптацию
    4. Найди и исправь все ошибки
    5. Улучши код quality, читаемость, структуру
    6. Оптимизируй производительность
    7. Добавь недостающие лучшие практики

    Читай AGENTS.md для контекста проекта. Работай автономно."
}

# Show help
help() {
    echo "FoxYvn Landing - Container Management"
    echo ""
    echo "Использование: ./manage.sh [command]"
    echo ""
    echo "Команды:"
    echo "  build       - Собрать Docker образ"
    echo "  start       - Запустить контейнер"
    echo "  stop        - Остановить контейнер"
    echo "  restart     - Перезапустить контейнер"
    echo "  logs        - Показать логи"
    echo "  shell       - Войти в контейнер"
    echo "  status      - Статус контейнера"
    echo "  install     - Установить зависимости"
    echo "  clean       - Удалить контейнер и образ"
    echo "  codex       - Запустить Codex для анализа (требует AGENTS.md)"
    echo "  help        - Показать эту справку"
    echo ""
    echo "Примеры:"
    echo "  ./manage.sh build && ./manage.sh start"
    echo "  ./manage.sh shell"
    echo "  ./manage.sh codex"
}

# Main
check_podman

case "${1:-help}" in
    build)
        build
        ;;
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        restart
        ;;
    logs)
        logs
        ;;
    shell)
        shell
        ;;
    status)
        status
        ;;
    install)
        install
        ;;
    clean)
        clean
        ;;
    codex)
        codex_analyze
        ;;
    help|*)
        help
        ;;
esac
