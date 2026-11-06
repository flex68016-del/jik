/* ============================================================
   JIK — Intro cinématique (session-based)
   1. Fond noir plein écran
   2. Logo officiel révélé par masque (clip-path)
   3. JESUS IS KING
   4. S'AFFIRMER SANS PARLER
   5. Rideau vers le hero
   ~2.4s — une seule fois par session, jamais si reduced-motion.
   ============================================================ */

JIK.initIntro = function initIntro() {
  const intro = document.querySelector('[data-intro]');
  if (!intro) return;

  const reduce = JIK.utils.prefersReducedMotion();
  const seen = sessionStorage.getItem('jik-intro-seen');

  if (reduce || seen || !window.gsap) {
    intro.remove();
    JIK.motion.heroIn();
    return;
  }

  sessionStorage.setItem('jik-intro-seen', '1');

  if (JIK.lenis) JIK.lenis.stop();

  const logo = intro.querySelector('.intro__logo');
  const titleSpan = intro.querySelector('.intro__title span');
  const signature = intro.querySelector('.intro__signature');

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete: () => {
      intro.classList.add('is-done');
      intro.remove();
      if (JIK.lenis) JIK.lenis.start();
      JIK.motion.heroIn();
    },
  });

  tl.fromTo(intro, { opacity: 1 }, { duration: 0.01 })
    .fromTo(
      logo,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power4.inOut' }
    )
    .fromTo(
      titleSpan,
      { yPercent: 120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.6 },
      '-=0.35'
    )
    .fromTo(
      signature,
      { opacity: 0, letterSpacing: '0.8em' },
      { opacity: 1, letterSpacing: '0.4em', duration: 0.6 },
      '-=0.3'
    )
    .to(intro.querySelector('.intro__inner'), { opacity: 0, y: -30, duration: 0.45 }, '+=0.5')
    .to(intro, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.7,
      ease: 'power4.inOut',
    }, '-=0.15');
};
