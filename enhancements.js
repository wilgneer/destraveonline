/* ==========================================================
   UI Enhancements (Scroll Reveal, Header, UX micro-interactions)
   - Does NOT touch modal/back-end logic (kept in script.js)
   ========================================================== */

(() => {
  'use strict';

  // Marca presença de JS para permitir animações sem ocultar conteúdo quando scripts falham.
  document.documentElement.classList.add('js');

  // ------------------------------
  // Scroll Reveal
  // ------------------------------
  const revealNodes = Array.from(document.querySelectorAll('[data-reveal]'));
  const reducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (revealNodes.length) {
    if (reducedMotion || !('IntersectionObserver' in window)) {
      revealNodes.forEach((el) => el.classList.add('is-inview'));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-inview');
            io.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      );

      revealNodes.forEach((el) => io.observe(el));
    }
  }

  // ------------------------------
  // Header blur/contrast on scroll
  // ------------------------------
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ------------------------------
  // Smooth anchor scroll
  // ------------------------------
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const id = a.getAttribute('href');
    if (!id || id.length < 2) return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  });
})();
