/* ============================================================
   JIK — Smooth scroll (Lenis) + synchronisation GSAP ScrollTrigger
   - Désactivé si prefers-reduced-motion ou tactile faible perf
   ============================================================ */

JIK.lenis = null;

JIK.initSmoothScroll = function initSmoothScroll() {
  if (JIK.utils.prefersReducedMotion() || !window.Lenis) return;

  JIK.lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false, // tactile natif = plus fiable sur mobile
  });

  if (window.gsap && window.ScrollTrigger) {
    JIK.lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => JIK.lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) {
      JIK.lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Ancres internes compatibles Lenis
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      JIK.lenis.scrollTo(target, { offset: -80 });
    });
  });
};
