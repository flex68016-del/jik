/* ============================================================
   JIK — Curseur custom (anime.js v4) + boutons magnétiques
   Desktop uniquement (hover + pointer fine), désactivé si
   reduced-motion. N'interfère jamais avec le pointeur natif.
   États : default / view / discover / explore / drag (via data-cursor).
   ============================================================ */

JIK.initCursor = function initCursor() {
  if (JIK.utils.isTouch() || JIK.utils.prefersReducedMotion() || !window.anime) return;

  const cursor = document.querySelector('[data-cursor]');
  const label = document.querySelector('[data-cursor-label]');
  if (!cursor) return;

  const pos = { x: innerWidth / 2, y: innerHeight / 2 };
  const render = { x: pos.x, y: pos.y };

  window.addEventListener('pointermove', (e) => {
    pos.x = e.clientX;
    pos.y = e.clientY;
  }, { passive: true });

  (function loop() {
    render.x += (pos.x - render.x) * 0.18;
    render.y += (pos.y - render.y) * 0.18;
    cursor.style.transform = `translate(${render.x}px, ${render.y}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  })();

  const LABELS = {
    view: { fr: 'Voir', en: 'View' },
    discover: { fr: 'Découvrir', en: 'Discover' },
    explore: { fr: 'Explorer', en: 'Explore' },
    drag: { fr: 'Glisser', en: 'Drag' },
  };

  function setState(state) {
    if (state && state !== 'default') {
      cursor.classList.add('is-active');
      label.textContent = LABELS[state]
        ? LABELS[state][JIK.i18n.lang] || LABELS[state].fr
        : '';
      anime.animate(label, { scale: [0, 1], duration: 250, ease: 'outBack' });
    } else {
      cursor.classList.remove('is-active');
      anime.animate(label, { scale: 0, duration: 150, ease: 'outQuad' });
    }
  }

  // Délégation : les cartes/CTA déclarent data-cursor="view" etc.
  document.addEventListener('pointerover', (e) => {
    const zone = e.target.closest('[data-cursor]');
    setState(zone ? zone.dataset.cursor : 'default');
  });
};

/* ---------- Boutons magnétiques (anime.js v4) ---------- */

JIK.initMagnetic = function initMagnetic() {
  if (JIK.utils.isTouch() || JIK.utils.prefersReducedMotion() || !window.anime) return;

  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      anime.animate(el, {
        translateX: x * 0.25,
        translateY: y * 0.25,
        duration: 400,
        ease: 'outQuad',
      });
    });

    el.addEventListener('pointerleave', () => {
      anime.animate(el, {
        translateX: 0,
        translateY: 0,
        duration: 600,
        ease: 'outElastic(1, .5)',
      });
    });
  });
};
