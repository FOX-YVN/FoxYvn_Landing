# 💻 COPY-PASTE READY CODE: Matrix Effects для Лендингов

## 🚀 Быстрый старт (5 минут)

### 1. HTML (вставь в body)
```html
<div class="intro-overlay" id="introOverlay">
  <canvas id="introCanvas"></canvas>
  <button class="skip-intro" onclick="skipIntro()">
    Skip Intro →
  </button>
</div>

<main id="mainContent" style="display: none;">
  <!-- Твой основной контент -->
  <h1>Welcome to my site</h1>
</main>
```

### 2. CSS (вставь в <style> или external.css)
```css
:root {
  --orange-primary: #FF7A00;
  --orange-light: #FF9933;
  --bg-dark: #0a0a0a;
  --text-primary: #ffffff;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--bg-dark);
  color: var(--text-primary);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  overflow: hidden;
}

.intro-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0a0a0a, #1a0a00);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

#introCanvas {
  display: block;
  max-width: 100%;
  filter: drop-shadow(0 0 15px rgba(255, 122, 0, 0.2));
}

.skip-intro {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  background: transparent;
  border: 2px solid var(--orange-primary);
  color: var(--orange-primary);
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px;
  transition: all 200ms ease-out;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.skip-intro:hover {
  background: var(--orange-primary);
  color: var(--bg-dark);
  box-shadow: 0 0 20px rgba(255, 122, 0, 0.5);
}

.skip-intro:active {
  background: #CC6200;
}

/* Доступность */
@media (prefers-reduced-motion: reduce) {
  .intro-overlay {
    display: none !important;
  }
  
  * {
    animation: none !important;
    transition: none !important;
  }
}

@media (max-width: 768px) {
  .skip-intro {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
    bottom: 1rem;
    right: 1rem;
  }
}
```

### 3. JavaScript (ГЛАВНЫЙ КОД — 150 строк)
```javascript
(function() {
  'use strict';
  
  // ============================================
  // КОНФИГУРАЦИЯ
  // ============================================
  const config = {
    // Matrix rain параметры
    matrixFontSize: 16,
    matrixChars: 'ｦｦｦｦｦｦｦｦｦｦｦｦｦｦｦ01Σ∑∫∂∇',
    matrixColor: '#FF7A00',
    matrixTrailAlpha: 0.08,
    matrixDensity: 0.7,
    matrixFps: 30,
    
    // Timing
    rainDuration: 800,      // 0–800ms
    assemblyStart: 800,     // 800ms
    assemblyDuration: 1200, // 800–2000ms (1.2s assembly)
    fadeStart: 2200,        // 2200ms
    fadeDuration: 600,      // 2200–2800ms
    totalTime: 2800,        // Total: ~3 sec
  };
  
  // ============================================
  // CANVAS SETUP
  // ============================================
  const canvas = document.getElementById('introCanvas');
  const ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // ============================================
  // MATRIX RAIN LOGIC
  // ============================================
  const columns = Math.floor(canvas.width / config.matrixFontSize);
  let drops = Array(columns).fill(1);
  
  function drawMatrixRain(elapsed) {
    // Trail эффект (быстрее чем clearRect)
    ctx.fillStyle = `rgba(10, 10, 10, ${config.matrixTrailAlpha})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Отрисовка символов
    ctx.fillStyle = config.matrixColor;
    ctx.font = `bold ${config.matrixFontSize}px "Courier New", monospace`;
    
    for (let i = 0; i < drops.length; i++) {
      // Вероятностное отображение (контролирует плотность)
      if (Math.random() > config.matrixDensity) continue;
      
      // Случайный символ
      const char = config.matrixChars[
        Math.floor(Math.random() * config.matrixChars.length)
      ];
      
      // Отрисовка
      ctx.fillText(
        char,
        i * config.matrixFontSize,
        drops[i] * config.matrixFontSize
      );
      
      // Движение вниз
      drops[i]++;
      
      // Перезагрузка когда выходит за пределы
      if (drops[i] * config.matrixFontSize > canvas.height && Math.random() > 0.95) {
        drops[i] = 1;
      }
    }
  }
  
  // ============================================
  // PARTICLE ASSEMBLY LOGIC
  // ============================================
  class ParticleAssembly {
    constructor() {
      this.particles = [];
      this.centerX = canvas.width / 2;
      this.centerY = canvas.height / 2;
      this.initRadius = Math.min(canvas.width, canvas.height) / 5;
    }
    
    init() {
      this.particles = [];
      const particleCount = 180; // Оптимум для мобильных
      
      // Генерируем контурные точки логотипа (круг)
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2;
        const targetX = this.centerX + Math.cos(angle) * this.initRadius;
        const targetY = this.centerY + Math.sin(angle) * this.initRadius;
        
        // Стартовая позиция (дальше от контура)
        const startAngle = Math.random() * Math.PI * 2;
        const distance = 150 + Math.random() * 100;
        
        this.particles.push({
          x: targetX + Math.cos(startAngle) * distance,
          y: targetY + Math.sin(startAngle) * distance,
          targetX: targetX,
          targetY: targetY,
          opacity: 0,
          startTime: i * 12, // 12ms каскадная задержка
        });
      }
    }
    
    update(elapsedInPhase) {
      this.particles.forEach(p => {
        const progress = Math.min(
          (elapsedInPhase - p.startTime) / config.assemblyDuration,
          1
        );
        
        if (progress < 0) return;
        
        // Ease-out cubic: быстро начинает, медленно заканчивает
        const eased = 1 - Math.pow(1 - progress, 3);
        
        // Интерполяция позиции
        p.x += (p.targetX - p.x) * eased;
        p.y += (p.targetY - p.y) * eased;
        
        // Fade in (sine для мягкого эффекта)
        p.opacity = Math.sin(progress * Math.PI) * 0.9;
      });
    }
    
    render() {
      ctx.font = 'bold 18px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      this.particles.forEach(p => {
        ctx.fillStyle = `rgba(255, 122, 0, ${p.opacity})`;
        ctx.fillText('●', p.x, p.y);
      });
    }
  }
  
  const assembly = new ParticleAssembly();
  assembly.init();
  
  // ============================================
  // MAIN ANIMATION LOOP
  // ============================================
  let animationStartTime = null;
  let animationComplete = false;
  
  function animate(timestamp) {
    if (!animationStartTime) animationStartTime = timestamp;
    
    const elapsed = timestamp - animationStartTime;
    
    // ---- PHASE 1: Matrix Rain (0–800ms) ----
    if (elapsed < config.rainDuration) {
      drawMatrixRain(elapsed);
    }
    
    // ---- PHASE 2: Logo Assembly (800–2200ms) ----
    else if (elapsed < config.fadeStart) {
      // Затвор Matrix
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Обновляем и отрисовываем частицы
      const elapsedInPhase = elapsed - config.assemblyStart;
      assembly.update(elapsedInPhase);
      assembly.render();
    }
    
    // ---- PHASE 3: Fade & Show Content (2200–2800ms) ----
    else if (elapsed < config.totalTime) {
      const fadeFraction = (elapsed - config.fadeStart) / config.fadeDuration;
      
      // Градуальная затемнение
      ctx.fillStyle = `rgba(10, 10, 10, ${1 - fadeFraction * 0.3})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Логотип замирает
      ctx.fillStyle = `rgba(255, 122, 0, ${1 - fadeFraction})`;
      ctx.font = 'bold 64px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('●', canvas.width / 2, canvas.height / 2);
    }
    
    // ---- PHASE 4: Hide Overlay & Show Content ----
    else {
      if (!animationComplete) {
        animationComplete = true;
        hideIntroOverlay();
      }
      return; // Остановить animation loop
    }
    
    // Продолжить анимацию
    requestAnimationFrame(animate);
  }
  
  // ============================================
  // UTILITY FUNCTIONS
  // ============================================
  function hideIntroOverlay() {
    const overlay = document.getElementById('introOverlay');
    overlay.style.transition = 'opacity 300ms ease-out';
    overlay.style.opacity = '0';
    
    setTimeout(() => {
      overlay.style.display = 'none';
      overlay.style.pointerEvents = 'none';
      
      // Показать главный контент
      const main = document.getElementById('mainContent');
      main.style.display = 'block';
    }, 300);
  }
  
  window.skipIntro = function() {
    hideIntroOverlay();
  };
  
  // ============================================
  // START ANIMATION
  // ============================================
  
  // Проверка prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReduced) {
    // Для пользователей с reduced motion: пропустить всё
    hideIntroOverlay();
  } else {
    // Стандартная анимация
    requestAnimationFrame(animate);
  }
  
})();
```

---

## 📦 ПОЛНЫЙ HTML FILE (All-in-one)

Если хочешь **всё в одном файле** (no external CSS/JS):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Matrix Intro Effect</title>
  <style>
    :root {
      --orange: #FF7A00;
      --dark: #0a0a0a;
    }
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      background: var(--dark);
      color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      overflow: hidden;
    }
    
    .intro-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #0a0a0a, #1a0a00);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    canvas {
      display: block;
      max-width: 100%;
      filter: drop-shadow(0 0 15px rgba(255, 122, 0, 0.2));
    }
    
    .skip-intro {
      position: absolute;
      bottom: 2rem;
      right: 2rem;
      background: transparent;
      border: 2px solid var(--orange);
      color: var(--orange);
      padding: 0.75rem 1.5rem;
      font-weight: 600;
      cursor: pointer;
      border-radius: 6px;
      transition: all 200ms;
    }
    
    .skip-intro:hover {
      background: var(--orange);
      color: var(--dark);
      box-shadow: 0 0 20px rgba(255, 122, 0, 0.5);
    }
    
    main { display: none; padding: 2rem; max-width: 1200px; margin: 0 auto; }
    
    @media (prefers-reduced-motion: reduce) {
      .intro-overlay { display: none !important; }
      main { display: block !important; }
    }
  </style>
</head>
<body>
  <div class="intro-overlay" id="introOverlay">
    <canvas id="introCanvas"></canvas>
    <button class="skip-intro" onclick="window.skipIntro?.()">Skip</button>
  </div>
  
  <main id="mainContent">
    <h1>🎉 Welcome!</h1>
    <p>Интро завершено, вот твой контент.</p>
  </main>
  
  <script>
    (function() {
      const canvas = document.getElementById('introCanvas');
      const ctx = canvas.getContext('2d');
      
      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      
      const config = {
        fontSize: 16,
        chars: 'ｦｦｦｦｦｦ01Σ∑∫',
        color: '#FF7A00',
        trailAlpha: 0.08,
        density: 0.7,
      };
      
      const columns = Math.floor(canvas.width / config.fontSize);
      let drops = Array(columns).fill(1);
      
      function drawRain() {
        ctx.fillStyle = `rgba(10, 10, 10, ${config.trailAlpha})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = config.color;
        ctx.font = `bold ${config.fontSize}px "Courier New", monospace`;
        
        for (let i = 0; i < drops.length; i++) {
          if (Math.random() > config.density) continue;
          const char = config.chars[Math.floor(Math.random() * config.chars.length)];
          ctx.fillText(char, i * config.fontSize, drops[i] * config.fontSize);
          drops[i]++;
          if (drops[i] * config.fontSize > canvas.height && Math.random() > 0.95) {
            drops[i] = 1;
          }
        }
      }
      
      let startTime = null;
      let done = false;
      
      function animate(ts) {
        if (!startTime) startTime = ts;
        const et = ts - startTime;
        
        if (et < 800) {
          drawRain();
        } else if (et < 2200) {
          ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else if (et < 2800) {
          const f = (et - 2200) / 600;
          ctx.fillStyle = `rgba(10, 10, 10, ${1 - f * 0.3})`;
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
  </script>
</body>
</html>
```

Сохрани как `index.html` и открой в браузере! 🚀

---

## ✅ CHECKLIST: Before Production

- [ ] Цвет оранжевый #FF7A00 (проверил контраст)
- [ ] Matrix rain: 30 FPS стабильно
- [ ] Тайминги: 800 + 1200 + 600 = 2600ms (~3 sec)
- [ ] Skip button видна и работает
- [ ] prefers-reduced-motion обработана
- [ ] Тестировал на мобильном (canvas масштабируется)
- [ ] Нет console ошибок
- [ ] Не более 3 сек (пользователь не ждёт)
- [ ] GPU-accelerated (transform + opacity)
- [ ] Cross-browser: Chrome, Safari, Firefox ✅

---

## 🎯 Как кастомизировать

### Менять цвет
```javascript
matrixColor: '#FF9933', // Вместо #FF7A00
```

### Менять символы
```javascript
matrixChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
```

### Менять скорость
```javascript
rainDuration: 1200,       // Увеличить rain на 1.2 сек
assemblyDuration: 1500,   // Сборка 1.5 сек вместо 1.2
```

---

**Готово к copy-paste! Просто скопируй и вставь в свой проект! 🚀**
