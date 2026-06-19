document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const navItems = document.querySelectorAll('.nav-item');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentSlideIndex = 0;

  // Mapa de valores iniciales para evitar que se distorsionen tras múltiples animaciones
  const counterValues = {};

  // Guardar y preparar valores numéricos de los contadores
  document.querySelectorAll('.stat-val').forEach((el, i) => {
    const rawText = el.innerText;
    el.setAttribute('data-target', rawText);
    counterValues[i] = rawText;
  });

  // Función para animar contadores numéricos
  function animateCounters(slide) {
    const counters = slide.querySelectorAll('.stat-val');
    counters.forEach(counter => {
      const targetText = counter.getAttribute('data-target');
      if (!targetText) return;

      // Resetear temporalmente a 0 antes de animar
      counter.innerText = targetText.startsWith('+') ? '+0' : '0%';

      // Regex para identificar número, decimales y sufijos (+ o %)
      const match = targetText.match(/^([+-])?(\d+(?:\.\d+)?)(%|\+)?$/);
      if (match) {
        const sign = match[1] || '';
        const target = parseFloat(match[2]);
        const suffix = match[3] || '';
        
        let current = 0;
        const duration = 1200; // Duración de la animación en ms
        const stepTime = 30; // 30ms por cuadro
        const steps = duration / stepTime;
        const increment = target / steps;
        
        let stepCount = 0;
        const timer = setInterval(() => {
          current += increment;
          stepCount++;
          
          if (stepCount >= steps || current >= target) {
            current = target;
            clearInterval(timer);
          }
          
          // Formatear decimal si correspondía
          const formattedNum = targetText.includes('.') ? current.toFixed(1) : Math.floor(current);
          counter.innerText = sign + formattedNum + suffix;
        }, stepTime);
      }
    });
  }

  // Función para ir a un Slide específico por índice
  function goToSlide(index) {
    if (index < 0 || index >= slides.length) return;

    // Desactivar slide y nav actual
    slides[currentSlideIndex].classList.remove('active');
    navItems[currentSlideIndex].classList.remove('active');

    // Cambiar índice
    currentSlideIndex = index;

    // Activar nuevo slide y nav
    slides[currentSlideIndex].classList.add('active');
    navItems[currentSlideIndex].classList.add('active');

    // Lanzar animación de números si la diapositiva tiene estadísticas
    animateCounters(slides[currentSlideIndex]);

    // Lógica específica para animar la línea de tiempo de fases
    if (slides[currentSlideIndex].querySelector('.fases-timeline')) {
      animateTimeline(slides[currentSlideIndex]);
    }

    // Auto-scroll del menú lateral en móviles si es necesario
    const activeNavBtn = navItems[currentSlideIndex];
    activeNavBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

    // Deshabilitar botones de control en extremos
    if (prevBtn && nextBtn) {
      prevBtn.style.opacity = currentSlideIndex === 0 ? '0.4' : '1';
      prevBtn.style.pointerEvents = currentSlideIndex === 0 ? 'none' : 'auto';

      nextBtn.style.opacity = currentSlideIndex === slides.length - 1 ? '0.4' : '1';
      nextBtn.style.pointerEvents = currentSlideIndex === slides.length - 1 ? 'none' : 'auto';
    }
  }

  // Animación interactiva secuencial para la línea de tiempo
  function animateTimeline(slide) {
    const nodes = slide.querySelectorAll('.fase-node');
    nodes.forEach(node => node.classList.remove('active'));
    
    nodes.forEach((node, idx) => {
      setTimeout(() => {
        if (currentSlideIndex === 6) { // Solo si seguimos en el slide de modelo productivo
          node.classList.add('active');
        }
      }, idx * 400); // 400ms de retraso entre cada nodo para efecto cascada
    });
  }

  // Event Listeners para la navegación lateral
  navItems.forEach((item, index) => {
    const btn = item.querySelector('button');
    if (btn) {
      btn.addEventListener('click', () => {
        goToSlide(index);
      });
    }
  });

  // Botones de navegación (Flechas flotantes)
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentSlideIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentSlideIndex + 1);
    });
  }

  // Soporte de navegación por teclado (Izquierda / Derecha / Espacio)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      goToSlide(currentSlideIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToSlide(currentSlideIndex - 1);
    }
  });

  // Inicialización de la vista
  goToSlide(0);

  // --- LÓGICA DE FONDO ROTATIVO (SLIDESHOW) ---
  const bgImages = [
    'assets/img/healthy_lunch_bg.png',
    'assets/img/healthy_fresh_salad.png',
    'assets/img/office_lunch_box.png',
    'assets/img/healthy_bowls_desk.png'
  ];
  
  const slideshowBg = document.querySelector('.slideshow-bg');
  let currentBgIndex = 0;

  function changeBackground() {
    if (!slideshowBg) return;
    
    // Cambiar la imagen de fondo con una transición suave
    slideshowBg.style.backgroundImage = `url('${bgImages[currentBgIndex]}')`;
    
    // Incrementar el índice para el siguiente cambio
    currentBgIndex = (currentBgIndex + 1) % bgImages.length;
  }

  // Establecer fondo inicial e iniciar rotación cada 10 segundos
  if (slideshowBg) {
    changeBackground();
    setInterval(changeBackground, 10000);
  }

  // --- LÓGICA DE PESTAÑAS (TABS) PARA LA SECCIÓN DE MARILIN ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Desactivar botones y paneles
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      // Activar botón y panel seleccionado
      btn.classList.add('active');
      const targetPane = document.getElementById(targetTab);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // --- LÓGICA DE SUB-PESTAÑAS DE SEMANAS (WEEK TABS) ---
  const weekButtons = document.querySelectorAll('.week-btn');
  const weekPanes = document.querySelectorAll('.week-pane');

  weekButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetWeek = btn.getAttribute('data-week');

      // Desactivar botones y paneles de semanas
      weekButtons.forEach(b => b.classList.remove('active'));
      weekPanes.forEach(p => p.classList.remove('active'));

      // Activar botón y panel de semana seleccionado
      btn.classList.add('active');
      const targetPane = document.querySelector(`.week-pane[data-week="${targetWeek}"]`);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
});
