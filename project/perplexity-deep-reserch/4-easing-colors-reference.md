# 🎨 Easing Functions & Color Reference — Matrix Effects

## EASING FUNCTIONS (2024 Best Practices)

### Рекомендуемые Cubic-Bezier для эффектов

#### 1️⃣ EASE-OUT-CUBIC (Основной выбор)
```css
cubic-bezier(0.25, 0.46, 0.45, 0.94)
```
**Визуально:** Быстро начинает → замедляется к концу  
**Когда использовать:** Logo assembly, particle reveal, main entrance  
**Ощущение:** Natural, cinematic, не рубящее  
**Math:** \(y = 1 - (1-x)^3\)

```javascript
// JavaScript реализация
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
```

#### 2️⃣ EASE-IN-OUT-CUBIC (Мягкие переходы)
```css
cubic-bezier(0.42, 0, 0.58, 1)
```
**Визуально:** Медленно начинает → ускоряется → замедляется  
**Когда использовать:** Dialog enter/exit, modal animations  
**Ощущение:** Smooth, polished, predictable  
**Math:** \(y = t < 0.5 ? 4t^3 : 1 - 4(1-t)^3\)

#### 3️⃣ EASE-OUT-QUAD (Быстрый финиш)
```css
cubic-bezier(0.25, 0.46, 0.45, 0.94)
```
**Визуально:** Более быстрый старт чем cubic  
**Когда использовать:** Button interactions, micro-animations  
**Ощущение:** Snappy, responsive  
**Math:** \(y = 1 - (1-x)^2\)

#### 4️⃣ EASE-OUT-BOUNCE (С отскоком)
```css
cubic-bezier(0.34, 1.56, 0.64, 1)
```
**Визуально:** Overshoots затем возвращается  
**Когда использовать:** Card reveals, celebratory effects  
**Ощущение:** Playful, energy-filled  
**Внимание:** Может быть отвлекающим на сложных сценах

---

## TIMING PRESETS для Matrix Effects

| Эффект | Duration | Easing | Cascade | Delay | Пример |
|--------|----------|--------|---------|-------|---------|
| **Matrix rain** | Continuous | linear | N/A | 0 | Падают символы |
| **Logo assembly** | 1.5s | ease-out³ | 15ms | 800ms | Сборка логотипа |
| **Particle fade-in** | 800ms | ease-out³ | 20ms | 0 | Появление частиц |
| **Logo scale-up** | 500ms | ease-out² | N/A | 2.3s | Увеличение логотипа |
| **Content fade-in** | 600ms | ease-in-out | N/A | 2.4s | Главный контент |
| **Ripple effect** | 800ms | ease-out | 50ms | 0 | Волна из центра |

---

## CSS ANIMATION PRESETS

### Preset 1: Logo Assembly (Основной)
```css
@keyframes particleAssembly {
  0% {
    opacity: 0;
    transform: translate(var(--from-x), var(--from-y));
  }
  100% {
    opacity: 0.95;
    transform: translate(var(--to-x), var(--to-y));
  }
}

.particle {
  animation: particleAssembly 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
```

### Preset 2: Matrix Rain (Continuous)
```css
@keyframes matrixRain {
  0% {
    transform: translateY(-100%);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}

.rain-char {
  animation: matrixRain 8s linear infinite;
}
```

### Preset 3: Fade & Scale (Content reveal)
```css
@keyframes contentReveal {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.hero-content {
  animation: contentReveal 600ms cubic-bezier(0.42, 0, 0.58, 1) 2400ms forwards;
  opacity: 0;
}
```

---

## ORANGE BRAND COLORS (Полная палитра)

### Primary Orange Palette
```css
:root {
  /* Core */
  --orange-50:   #fff8f0;  /* Lightest: backgrounds */
  --orange-100:  #ffe8d6;  /* Light: hover states */
  --orange-200:  #ffc99a;  /* Medium light: secondary */
  --orange-300:  #ffb366;  /* Medium: active states */
  --orange-400:  #ff9933;  /* Light accent: hover */
  --orange-500:  #ff8800;  /* Standard: primary actions */
  --orange-600:  #ff7a00;  /* Primary: main brand color ← USE THIS */
  --orange-700:  #e66b00;  /* Dark: active/focus */
  --orange-800:  #cc5c00;  /* Darker: disabled states */
  --orange-900:  #b34d00;  /* Darkest: shadows */
  
  /* Supporting */
  --black-primary: #0a0a0a;    /* Almost black: backgrounds */
  --black-secondary: #1a1a1a;  /* Dark gray: cards */
  --black-tertiary: #2a2a2a;   /* Light gray: hover */
  
  --text-primary: #ffffff;
  --text-secondary: #cccccc;
  --text-tertiary: #999999;
}
```

### Контрастность Matrix Effect на разных фонах

| Цвет | Фон | Контраст | WCAG | Использование |
|------|-----|----------|------|---------------|
| `#FF7A00` | `#0a0a0a` | **8.2:1** | ✅ AAA | Основной текст rain + логотип |
| `#FF7A00` | `#1a1a1a` | **7.8:1** | ✅ AAA | Вторичный текст |
| `#FF9933` | `#0a0a0a` | **6.5:1** | ✅ AA | Highlight/glow |
| `#FFB366` | `#0a0a0a` | **4.2:1** | ✗ Fail | Только для decorative |

---

## SHADOW & GLOW EFFECTS (Orange Brand)

### Subtle Glow (Рекомендуется)
```css
.logo-glow-subtle {
  filter: drop-shadow(0 0 8px rgba(255, 122, 0, 0.2));
}

.text-glow-subtle {
  text-shadow: 0 0 8px rgba(255, 122, 0, 0.15);
}
```

### Medium Glow (Для акцентов)
```css
.logo-glow-medium {
  filter: drop-shadow(0 0 15px rgba(255, 122, 0, 0.4));
}
```

### Intense Glow (Для hover/attention)
```css
.logo-glow-intense {
  filter: drop-shadow(0 0 25px rgba(255, 122, 0, 0.6));
  transition: filter 200ms ease-out;
}

.logo-glow-intense:hover {
  filter: drop-shadow(0 0 35px rgba(255, 122, 0, 0.8));
}
```

### Multiple Layers (для глубины)
```css
.logo-glow-layered {
  filter: 
    drop-shadow(0 0 4px rgba(255, 122, 0, 0.2))
    drop-shadow(0 0 10px rgba(255, 122, 0, 0.15))
    drop-shadow(0 0 20px rgba(255, 122, 0, 0.1));
}
```

---

## JAVASCRIPT EASING LIBRARY

### Готовые функции
```javascript
const Easing = {
  linear: (t) => t,
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => 1 - (1 - t) * (1 - t),
  easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  
  // Cubic (Рекомендуется)
  easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
  easeInCubic: (t) => t * t * t,
  easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  
  // Quartic
  easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
  easeInQuart: (t) => t * t * t * t,
  easeInOutQuart: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
  
  // Sine
  easeOutSine: (t) => Math.sin((t * Math.PI) / 2),
  easeInSine: (t) => 1 - Math.cos((t * Math.PI) / 2),
  easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
  
  // Exponential
  easeOutExpo: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  easeInExpo: (t) => t === 0 ? 0 : Math.pow(2, 10 * t - 10),
  
  // Bounce
  easeOutBounce: (t) => {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (t < 1 / d1) return n1 * t * t;
    else if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
    else if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
    else return n1 * (t -= 2.625 / d1) * t + 0.984375;
  },
};

// Использование
function animateValue(startVal, endVal, duration, easeFunc) {
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeFunc(progress);
    const current = startVal + (endVal - startVal) * eased;
    
    if (progress < 1) requestAnimationFrame(update);
  }
  
  requestAnimationFrame(update);
}
```

---

## PERFORMANCE: GPU-ACCELERATED TRANSFORMS

### Что БЫСТРО (GPU) ✅
```css
/* GPU accelerated */
.fast-animation {
  animation: moveRight 1s ease-out;
}

@keyframes moveRight {
  from { transform: translateX(0); }
  to { transform: translateX(100px); }
}

.fast-fade {
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### Что МЕДЛЕННО (CPU) ❌
```css
/* CPU-intensive */
.slow-animation {
  animation: widthChange 1s ease-out;
}

@keyframes widthChange {
  from { width: 0; }
  to { width: 100px; }
}
```

### Оптимизированная версия ✅
```css
.optimized {
  animation: optimizedMove 1s ease-out;
}

@keyframes optimizedMove {
  from {
    transform: translateX(-100px) scale(0.9);
    opacity: 0;
  }
  to {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
}
```

---

**Результат:** Профессиональный, доступный, высокопроизводительный интро с оранжевой палитрой бренда ✅
