/* ============================================================
   JIK — Bootstrap global de chaque page
   Ordonne : layout → i18n → smooth scroll → motion → overlays
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js');

  JIK.layout.init();
  JIK.i18n.init();

  // Le rendu dynamique de la page doit précéder l'init des animations
  if (JIK.page && typeof JIK.page.init === 'function') {
    JIK.page.init();
  }

  JIK.initSmoothScroll();
  JIK.motion.init();
  if (typeof JIK.initIntro === 'function') JIK.initIntro();
  JIK.initCursor();
  JIK.initMagnetic();
  JIK.initPageTransition();

  // Marquee partagé
  document.querySelectorAll('[data-marquee]').forEach((track) => {
    if (!window.gsap || JIK.utils.prefersReducedMotion()) return;
    gsap.to(track, {
      xPercent: -50,
      ease: 'none',
      duration: 22,
      repeat: -1,
      modifiers: { xPercent: (v) => `${((v % 100) + 100) % 100}` },
    });
  });

  // La page peut déclarer son propre module
  // (déjà initialisé plus haut, avant JIK.motion.init)
});
