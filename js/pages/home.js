/* ============================================================
   JIK — Page d'accueil : rendus dynamiques
   ============================================================ */

JIK.page = (() => {
  function lang() {
    return JIK.i18n ? JIK.i18n.lang : JIK_CONFIG.defaultLanguage;
  }

  function renderCollection() {
    const grid = document.querySelector('[data-collection-grid]');
    if (!grid) return;
    // Sélection éditoriale : 4 pièces sur la home, la grille complète est en boutique
    const featured = ['jik-003', 'jik-001', 'jik-006', 'jik-002']
      .map((id) => JIK.utils.productById(id))
      .filter(Boolean);
    grid.innerHTML = featured.map((p) => JIK.productCard(p, lang())).join('');
  }

  function renderLookbookPreview() {
    const track = document.querySelector('[data-lookbook-preview]');
    if (!track) return;
    const L = lang();
    const items = [
      { img: 'assets/products/jik-006-left-99.jpg', alt: { fr: 'T-shirt beige — He Left The 99', en: 'Cream tee — He Left The 99' }, caption: { fr: 'Éditorial 01 — La brebis perdue', en: 'Editorial 01 — The lost sheep' } },
      { img: 'assets/products/jik-003-faith-over-fear.jpg', alt: { fr: 'T-shirt noir — Faith Over Fear', en: 'Black tee — Faith Over Fear' }, caption: { fr: 'Éditorial 02 — La foi', en: 'Editorial 02 — Faith' } },
      { img: 'assets/products/jik-005-combat.jpg', alt: { fr: 'T-shirt gris — Combat', en: 'Grey tee — Combat' }, caption: { fr: 'Éditorial 03 — Le combat', en: 'Editorial 03 — The fight' } },
      { img: 'assets/products/jik-001-yohanes.jpg', alt: { fr: 'T-shirt gris — Yohanes 14:6', en: 'Grey tee — Yohanes 14:6' }, caption: { fr: 'Éditorial 04 — Les racines', en: 'Editorial 04 — The roots' } },
    ];

    track.innerHTML = items.map((it) => `
      <figure class="lookbook-preview__item" data-cursor="view">
        <img src="${it.img}" alt="${JIK.utils.esc(it.alt[L])}" loading="lazy" width="1200" height="800">
        <figcaption class="lookbook-preview__caption">
          <span>${JIK.utils.esc(it.caption[L])}</span>
          <span>JIK</span>
        </figcaption>
      </figure>`).join('');
  }

  function rerenderOnLangChange() {
    renderCollection();
    renderLookbookPreview();
    // Rejouer les animations d'entrée pour les nouveaux nœuds
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }

  return {
    init() {
      renderCollection();
      renderLookbookPreview();
      document.addEventListener('jik:langchange', rerenderOnLangChange);
      document.addEventListener('jik:langchange', () => JIK.i18n.apply(JIK.i18n.lang));
      // Héros : fallback si GSAP absent
      if (!window.gsap) {
        document.querySelectorAll('[data-hero]').forEach((el) => (el.style.opacity = '1'));
      }
    },
  };
})();
