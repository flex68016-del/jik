/* ============================================================
   JIK — Transitions de pages (couches noire + crème)
   - Interception des liens internes
   - Historique avant/arrière + URLs directes fonctionnent
     (les couches s'ouvrent puis se referment au chargement)
   ============================================================ */

JIK.initPageTransition = function initPageTransition() {
  const overlay = document.querySelector('[data-page-transition]');
  if (!overlay) return;
  if (!window.gsap) { overlay.style.display = 'none'; return; }

  const cream = overlay.querySelector('.page-transition__layer--cream');
  const black = overlay.querySelector('.page-transition__layer--black');
  const logo = overlay.querySelector('.page-transition__logo');

  const reduce = JIK.utils.prefersReducedMotion() || !window.gsap;

  function cover(onCovered) {
    if (reduce) { onCovered(); return; }
    const tl = gsap.timeline({ onComplete: onCovered });
    tl.set([cream, black], { transformOrigin: 'bottom', scaleY: 0, display: 'block' })
      .to(cream, { scaleY: 1, duration: 0.45, ease: 'power3.in' })
      .to(black, { scaleY: 1, duration: 0.45, ease: 'power3.in' }, '-=0.3')
      .fromTo(logo, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35 }, '-=0.2');
  }

  function uncover() {
    if (reduce) { overlay.style.display = 'none'; return; }
    gsap.timeline()
      .to(logo, { opacity: 0, y: -20, duration: 0.3 })
      .to(black, { transformOrigin: 'top', scaleY: 0, duration: 0.45, ease: 'power3.inOut' }, '-=0.05')
      .to(cream, { transformOrigin: 'top', scaleY: 0, duration: 0.45, ease: 'power3.inOut' }, '-=0.35')
      .set(overlay, { display: 'none' });
  }

  // Au chargement : l'écran se dévoile
  gsap.set(overlay, { display: 'grid' });
  window.addEventListener('load', () => requestAnimationFrame(uncover));
  // Fallback si load déjà déclenché ou lent
  setTimeout(() => { if (overlay.style.display !== 'none') uncover(); }, 2500);

  // Interception des liens internes
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link || link.target === '_blank' || e.metaKey || e.ctrlKey) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;

    // Même page (ancre ou URL identique) → navigation normale
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.search === location.search) return;

    e.preventDefault();
    cover(() => { location.href = link.href; });
  });

  // Retour navigateur : page restaurée depuis le cache → dévoiler
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) uncover();
  });
};
