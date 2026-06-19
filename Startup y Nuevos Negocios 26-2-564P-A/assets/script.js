document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const navItems = document.querySelectorAll('.nav-item');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentSlideIndex = 0;

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
});
