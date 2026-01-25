# 🦊 КАСТОМИЗАЦИЯ: Замена логотипа + Matrix символы

## 📋 БЫСТРЫЙ ОБЗОР

У тебя есть:
- ✅ Логотип лисы (fox-logo.jpg, fox-logo-64.jpg, fox-logo-256.jpg)
- ✅ Нужно его вставить в Matrix интро
- ✅ Нужно менять Matrix символы

**Время реализации:** 30–60 минут (copy-paste + тестирование)

---

## 🦊 ШАГ 1: Подготовка логотипа лисы

### Вариант А: Использовать IMG (САМЫЙ ПРОСТОЙ) ✅ РЕКОМЕНДУЕТСЯ

**Преимущества:**
- Никаких конвертаций
- Можно использовать любой формат (JPG, PNG, SVG)
- Работает везде
- Logo масштабируется автоматически

**Недостатки:**
- Нельзя применить Matrix эффект прямо на логотип
- Логотип появится отдельно

### Вариант Б: Конвертировать в SVG (ПРОДВИНУТЫЙ)

**Преимущества:**
- Векторное качество
- Можно применить эффекты
- Масштабируется идеально

**Недостатки:**
- Нужен конвертор (vectorize.io, potrace)
- Сложнее для photo

### Вариант В: Использовать как маску для Canvas (ПРОДВИНУТЫЙ)

**Преимущества:**
- Полный контроль
- Эффекты на логотип

**Недостатки:**
- Самый сложный вариант
- Требует дополнительной обработки

---

## 🎯 РЕКОМЕНДУЕМЫЙ ПОДХОД

### **Вариант: IMG + Logo Assembly (Гибридный)**

1. **Matrix rain** — падает оранжевый текст (как было)
2. **Logo Assembly** — частицы собираются в контур твоего логотипа лисы
3. **Финальный логотип** — показывается исходная картинка лисы

---

## 💻 КОД: КАСТОМИЗАЦИЯ LOGO ASSEMBLY ДЛЯ ТВОЕЙ ЛИСЫ

### Шаг 1: HTML (добавить IMG)

```html
<!-- В intro-overlay добавь изображение логотипа -->
<div class="intro-overlay" id="introOverlay">
  <canvas id="introCanvas"></canvas>
  
  <!-- ТВОЙ ЛОГОТИП (покажется после сборки) -->
  <img 
    id="finalLogo" 
    src="path/to/fox-logo-256.jpg" 
    alt="Fox Logo"
    class="final-logo"
  />
  
  <button class="skip-intro" onclick="skipIntro()">Skip</button>
</div>
```

### Шаг 2: CSS (стили для логотипа)

```css
/* Логотип скрыт в начале */
.final-logo {
  position: absolute;
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  filter: drop-shadow(0 0 15px rgba(255, 122, 0, 0.3));
  z-index: 100;
  
  /* Появляется с fade */
  animation: logoFadeIn 600ms ease-out forwards;
  animation-delay: 2600ms;
}

@keyframes logoFadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
```

### Шаг 3: JavaScript (ГЛАВНОЕ)

**ВАРИАНТ 1: Частицы собираются в КОНТУР лисы**

```javascript
// Определяем контурные точки логотипа лисы
// (для лисы это примерно так: уши, нос, контур морды)
function getLogo PointsForFox() {
  // Контур лисы (примерные координаты)
  // Ты можешь отредактировать под свой точный логотип
  
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const scale = 80; // Размер логотипа на экране
  
  const points = [];
  
  // Левое ухо
  points.push({ 
    x: centerX - 40, 
    y: centerY - 80, 
    angle: 0 
  });
  points.push({ 
    x: centerX - 50, 
    y: centerY - 100, 
    angle: 0 
  });
  
  // Правое ухо
  points.push({ 
    x: centerX + 40, 
    y: centerY - 80, 
    angle: 0 
  });
  points.push({ 
    x: centerX + 50, 
    y: centerY - 100, 
    angle: 0 
  });
  
  // Левая щека
  for (let i = 0; i < 5; i++) {
    const angle = Math.PI * 0.3 + (i / 5) * Math.PI * 0.4;
    points.push({
      x: centerX - Math.cos(angle) * 60,
      y: centerY - Math.sin(angle) * 40,
      angle: angle
    });
  }
  
  // Правая щека
  for (let i = 0; i < 5; i++) {
    const angle = Math.PI * 0.3 + (i / 5) * Math.PI * 0.4;
    points.push({
      x: centerX + Math.cos(angle) * 60,
      y: centerY - Math.sin(angle) * 40,
      angle: angle
    });
  }
  
  // Подбородок/нос (контур внизу)
  points.push({ 
    x: centerX - 30, 
    y: centerY + 40 
  });
  points.push({ 
    x: centerX, 
    y: centerY + 60 
  });
  points.push({ 
    x: centerX + 30, 
    y: centerY + 40 
  });
  
  return points;
}

// Использование в ParticleAssembly
class ParticleAssembly {
  constructor(isLogo = false) {
    this.particles = [];
    this.centerX = canvas.width / 2;
    this.centerY = canvas.height / 2;
    this.initRadius = Math.min(canvas.width, canvas.height) / 5;
    this.isLogo = isLogo;
  }
  
  init() {
    this.particles = [];
    
    // Вариант 1: Контур лисы (точки)
    const targetPoints = this.isLogo 
      ? getLogoPointsForFox() 
      : getDefaultCirclePoints();
    
    targetPoints.forEach((targetPoint, i) => {
      // Стартовая позиция (дальше от контура)
      const startAngle = Math.random() * Math.PI * 2;
      const distance = 150 + Math.random() * 100;
      
      this.particles.push({
        x: targetPoint.x + Math.cos(startAngle) * distance,
        y: targetPoint.y + Math.sin(startAngle) * distance,
        targetX: targetPoint.x,
        targetY: targetPoint.y,
        opacity: 0,
        startTime: i * 12, // Каскадная задержка
      });
    });
  }
}

// Инициализация для логотипа
const assemblyLogo = new ParticleAssembly(true);
assemblyLogo.init();
```

---

## 🔤 ШАГ 2: Менять Matrix символы

### ВАРИАНТ 1: Простые символы (без специального кода)

**Текущие символы:**
```javascript
matrixChars: 'ｦｦｦｦｦｦｦｦｦｦｦｦｦｦｦ01Σ∑∫∂∇'
```

**Замени на свои (примеры):**

```javascript
// Вариант 1: Английские буквы
matrixChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

// Вариант 2: Русские буквы
matrixChars: 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789'

// Вариант 3: Смешанные (буквы + символы)
matrixChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()'

// Вариант 4: Только цифры
matrixChars: '0123456789'

// Вариант 5: Только буквы + цифры (лис)
matrixChars: 'FOXRABBIT0123456789'

// Вариант 6: Кириллица + лиса (для бренда)
matrixChars: 'ЛИСФОКС🦊0123456789'  // Emoji тоже работают!
```

### ВАРИАНТ 2: Продвинутый — разные символы на разных фазах

```javascript
const config = {
  // Фаза 1: Matrix Rain
  matrixChars: 'ｦｦｦｦｦｦ01Σ∑∫',
  
  // Фаза 2: Logo Assembly (другие символы)
  assemblyChars: '●■▲◆◇▪▫',
  
  // Фаза 3: Final (опциональные специальные символы)
  finalChars: '★✦✧✩✨',
};

// Использование в коде
if (elapsed < config.rainDuration) {
  // Использовать matrixChars
  const char = config.matrixChars[Math.floor(Math.random() * config.matrixChars.length)];
} else if (elapsed < config.fadeStart) {
  // Для assembly может быть свой набор
  // (опционально - обычно только точки ●)
}
```

---

## 🎨 ШАГ 3: Менять цвета лисы

### Оранжевая палитра (текущая):
```javascript
matrixColor: '#FF7A00',  // Основной оранжевый
```

### Замени на цвета лисы:

```javascript
// Если лиса коричнево-оранжевая:
matrixColor: '#FF8C00',   // Темный оранжевый (для лисы)

// Если лиса красная:
matrixColor: '#FF4500',   // OrangeRed

// Если лиса золотистая:
matrixColor: '#FFD700',   // Gold

// Если ты хочешь gradient:
ctx.fillStyle = 'linear-gradient(135deg, #FF7A00, #FF4500)';

// Или с прозрачностью:
ctx.fillStyle = 'rgba(255, 140, 0, 0.9)';  // Semi-transparent
```

---

## 📝 ПОЛНЫЙ ПРИМЕР: КАСТОМИЗОВАННЫЙ КОД

```javascript
(function() {
  'use strict';
  
  const canvas = document.getElementById('introCanvas');
  const ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // ============================================
  // КАСТОМИЗАЦИЯ: ТВОИ ПАРАМЕТРЫ
  // ============================================
  const config = {
    // Matrix символы (ЗАМЕНИ ЗДЕСЬ)
    matrixChars: 'FOXRABBIT0123456789',  // ← твои символы
    
    // Цвет (ЗАМЕНИ ЗДЕСЬ)
    matrixColor: '#FF8C00',  // ← цвет для лисы
    
    // Остальное как было
    fontSize: 16,
    density: 0.7,
    trailAlpha: 0.08,
    rainDuration: 800,
    assemblyStart: 800,
    assemblyDuration: 1200,
    fadeStart: 2200,
    fadeDuration: 600,
    totalTime: 2800,
  };
  
  // ============================================
  // MATRIX RAIN
  // ============================================
  const columns = Math.floor(canvas.width / config.fontSize);
  let drops = Array(columns).fill(1);
  
  function drawMatrixRain() {
    ctx.fillStyle = `rgba(10, 10, 10, ${config.trailAlpha})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = config.matrixColor;
    ctx.font = `bold ${config.fontSize}px "Courier New", monospace`;
    
    for (let i = 0; i < drops.length; i++) {
      if (Math.random() > config.density) continue;
      const char = config.matrixChars[
        Math.floor(Math.random() * config.matrixChars.length)
      ];
      ctx.fillText(char, i * config.fontSize, drops[i] * config.fontSize);
      drops[i]++;
      if (drops[i] * config.fontSize > canvas.height && Math.random() > 0.95) {
        drops[i] = 1;
      }
    }
  }
  
  // ============================================
  // LOGO ASSEMBLY (КОНТУР ЛИСЫ)
  // ============================================
  function getLogoPointsForFox() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const points = [];
    
    // Простой контур лисы (уши + морда + подбородок)
    
    // Левое ухо
    points.push({ x: centerX - 50, y: centerY - 80 });
    points.push({ x: centerX - 60, y: centerY - 110 });
    
    // Правое ухо
    points.push({ x: centerX + 50, y: centerY - 80 });
    points.push({ x: centerX + 60, y: centerY - 110 });
    
    // Левая щека
    for (let i = 0; i < 15; i++) {
      const angle = (i / 15) * Math.PI;
      points.push({
        x: centerX - Math.cos(angle) * 70,
        y: centerY - Math.sin(angle) * 50
      });
    }
    
    // Правая щека
    for (let i = 0; i < 15; i++) {
      const angle = (i / 15) * Math.PI;
      points.push({
        x: centerX + Math.cos(angle) * 70,
        y: centerY - Math.sin(angle) * 50
      });
    }
    
    // Подбородок
    for (let i = 0; i < 10; i++) {
      points.push({
        x: centerX - 40 + (i / 10) * 80,
        y: centerY + 50
      });
    }
    
    return points;
  }
  
  class ParticleAssembly {
    constructor() {
      this.particles = [];
      this.centerX = canvas.width / 2;
      this.centerY = canvas.height / 2;
    }
    
    init() {
      this.particles = [];
      const targetPoints = getLogoPointsForFox();
      
      targetPoints.forEach((target, i) => {
        const startAngle = Math.random() * Math.PI * 2;
        const distance = 150 + Math.random() * 100;
        
        this.particles.push({
          x: target.x + Math.cos(startAngle) * distance,
          y: target.y + Math.sin(startAngle) * distance,
          targetX: target.x,
          targetY: target.y,
          opacity: 0,
          startTime: i * 12,
        });
      });
    }
    
    update(elapsedInPhase) {
      this.particles.forEach(p => {
        const progress = Math.min(
          (elapsedInPhase - p.startTime) / config.assemblyDuration,
          1
        );
        
        if (progress < 0) return;
        
        const eased = 1 - Math.pow(1 - progress, 3);
        
        p.x += (p.targetX - p.x) * eased;
        p.y += (p.targetY - p.y) * eased;
        
        p.opacity = Math.sin(progress * Math.PI) * 0.9;
      });
    }
    
    render() {
      ctx.fillStyle = config.matrixColor;
      ctx.font = 'bold 16px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      this.particles.forEach(p => {
        ctx.fillStyle = `rgba(255, 140, 0, ${p.opacity})`;
        ctx.fillText('●', p.x, p.y);
      });
    }
  }
  
  const assembly = new ParticleAssembly();
  assembly.init();
  
  // ============================================
  // MAIN ANIMATION LOOP
  // ============================================
  let startTime = null;
  let done = false;
  
  function animate(ts) {
    if (!startTime) startTime = ts;
    const et = ts - startTime;
    
    if (et < config.rainDuration) {
      drawMatrixRain();
    } else if (et < config.fadeStart) {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const elapsedInPhase = et - config.assemblyStart;
      assembly.update(elapsedInPhase);
      assembly.render();
    } else if (et < config.totalTime) {
      const fadeFraction = (et - config.fadeStart) / config.fadeDuration;
      
      ctx.fillStyle = `rgba(10, 10, 10, ${1 - fadeFraction * 0.3})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      if (!done) {
        done = true;
        document.getElementById('introOverlay').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
      }
      return;
    }
    
    requestAnimationFrame(animate);
  }
  
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    requestAnimationFrame(animate);
  } else {
    document.getElementById('introOverlay').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
  }
  
  window.skipIntro = () => {
    document.getElementById('introOverlay').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
  };
})();
```

---

## 📊 ТАБЛИЦА: ЧТО МЕНЯТЬ

| Что менять | Где | Тип | Пример |
|-----------|-----|-----|---------|
| **Matrix символы** | `config.matrixChars` | String | `'FOXRABBIT0123456789'` |
| **Цвет Matrix** | `config.matrixColor` | HEX | `'#FF8C00'` |
| **Логотип (IMG)** | `fox-logo-256.jpg src` | URL | `path/to/your/logo.jpg` |
| **Контур лисы** | `getLogoPointsForFox()` | Points array | Координаты x, y |
| **Размер логотипа** | `.final-logo { width: }` | CSS | `200px` или `250px` |
| **Скорость сборки** | `assemblyDuration` | ms | `1200` или `1500` |
| **Плотность rain** | `density` | float | `0.7` или `0.8` |

---

## ✅ ФИНАЛЬНЫЙ CHECKLIST

```
КОД:
☑ Matrix символы изменены (FOXRABBIT... вместо японских)
☑ Цвет изменён на #FF8C00 (для лисы)
☑ Контур лисы нарисован в getLogoPointsForFox()
☑ IMG логотипа добавлен в HTML
☑ CSS стили для .final-logo добавлены
☑ No console errors

БРЕНДИНГ:
☑ Логотип лисы отображается
☑ Частицы собираются в контур лисы
☑ Цвет соответствует логотипу
☑ Тайминги отрегулированы (сборка не слишком быстра)

ТЕСТИРОВАНИЕ:
☑ На мобильном (canvas масштабируется)
☑ На ПК (полная анимация)
☑ Skip button работает
☑ prefers-reduced-motion обработана
```

---

## 🎯 СЛЕДУЮЩИЕ ШАГИ

1. **Замени символы в `config.matrixChars`**
2. **Замени цвет в `config.matrixColor`**
3. **Отредактируй `getLogoPointsForFox()`** под свой логотип
4. **Добавь путь к логотипу в `src`**
5. **Тестируй в браузере**

**ГОТОВО! 🦊✨**
