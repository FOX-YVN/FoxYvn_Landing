#!/bin/bash
# FoxYvn Landing - Load Environment Variables from 1Password
# Загружает переменные окружения из 1Password и создаёт .env файл

set -e

VAULT_ID="mmk7y5jgqpp56u32al7ul3qpsq"
ITEM_ID="iyjj5lhaqwspnpalcs7e7bibvi"
ENV_FILE="$(dirname "$0")/.env"

echo "🔐 Загрузка секретов из 1Password..."

# Проверка что op CLI доступен
if ! command -v op &> /dev/null; then
    echo "❌ 1Password CLI (op) не установлен"
    echo "   Установи: https://developer.1password.com/docs/cli/get-started/"
    exit 1
fi

# Загрузка всех полей из записи
echo "📥 Получение переменных окружения..."
FIELDS=$(op item get "$ITEM_ID" --vault "$VAULT_ID" --format json | jq -r '.fields[] | select(.label != "notesPlain" and .label != "notes") | "\(.label)=\(.value)"')

if [ -z "$FIELDS" ]; then
    echo "❌ Не удалось загрузить переменные из 1Password"
    exit 1
fi

# Создание .env файла
echo "# FoxYvn Landing - Environment Variables" > "$ENV_FILE"
echo "# Автоматически сгенерировано из 1Password $(date '+%Y-%m-%d %H:%M:%S')" >> "$ENV_FILE"
echo "" >> "$ENV_FILE"

# Добавление переменных
echo "$FIELDS" >> "$ENV_FILE"

# Установка прав доступа (только владелец может читать)
chmod 600 "$ENV_FILE"

echo "✅ Секреты загружены в $ENV_FILE"
echo "🔒 Права доступа: 600 (только владелец)"

# Показать что загружено (без значений)
echo ""
echo "📋 Загруженные переменные:"
grep -v "^#" "$ENV_FILE" | grep -v "^$" | cut -d= -f1 | sed 's/^/  - /'
