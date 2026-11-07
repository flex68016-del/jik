/* ============================================================
   JIK — Lookbook : galerie, lightbox
   Préparée pour accueillir les futures photos de campagne
   (assets/campaigns/) — ajoutées dans LOOKS ci-dessous.
   ============================================================ */

JIK.page = (() => {
  const lang = () => (JIK.i18n ? JIK.i18n.lang : JIK_CONFIG.defaultLanguage);

  /* Éditorial actuel : visuels produits officiels présentés en éditorial.
     Les futures campagnes photo iront dans assets/campaigns/ et s'ajouteront ici. */
  const LOOKS = [
    { type: 'full', img: 'assets/products/jik-002-all-we-need.jpg', ref: 'JIK-002', caption: { fr: 'La fondation', en: 'The foundation' } },
    { type: 'left', img: 'assets/products/jik-006-left-99.jpg', ref: 'JIK-006', caption: { fr: 'La brebis perdue', en: 'The lost sheep' } },
    { type: 'right', img: 'assets/products/jik-003-faith-over-fear.jpg', ref: 'JIK-003', caption: { fr: 'La foi, pas la peur', en: 'Faith, not fear' } },
    { type: 'duo', imgs: [
      { img: 'assets/products/jik-001-yohanes.jpg', ref: 'JIK-001', caption: { fr: 'Les racines', en: 'The roots' } },
      { img: 'assets/products/jik-005-combat.jpg', ref: 'JIK-005', caption: { fr: 'Le combat', en: 'The fight' } },
    ]},
    { type: 'full', img: 'assets/products/jik-004-pray-more.jpg', ref: 'JIK-004', caption: { fr: 'La paix', en: 'The peace' } },
    { type: 'full', img: 'assets/products/jik-007-jesus-a-tout-payé.jpg', ref: 'JIK-007', caption: { fr: 'Le paiement', en: 'The payment' } },
  ];

  function renderItem(item, index) {
    const L = lang();
    const open = (src, alt) => `data-lightbox-open data-src="${src}" data-alt="${JIK.utils.esc(alt)}"`;

    if (item.type === 'duo') {
      return `
        <div class="look-item look-item--duo" data-reveal>
          ${item.imgs.map((sub, i) => `
            <figure class="look-item look-item--${i === 0 ? 'left' : 'right'}">
              <div class="look-item__frame" data-cursor="view" ${open(JIK.utils.asset(sub.img), JIK.utils.esc(sub.caption[L]))}>
                <img src="${JIK.utils.asset(sub.img)}" alt="${JIK.utils.esc(sub.caption[L])} — ${sub.ref}" loading="lazy" width="1200" height="800">
              </div>
              <figcaption class="look-item__caption"><strong>${sub.ref}</strong><span>${JIK.utils.esc(sub.caption[L])}</span></figcaption>
            </figure>`).join('')}
        </div>`;
    }

    const single = item.imgs ? item.imgs[0] : item;
    return `
      <figure class="look-item look-item--${item.type}" data-reveal>
        <div class="look-item__frame" data-cursor="view" ${open(JIK.utils.asset(single.img), JIK.utils.esc(single.caption[L]))}>
          <img src="${JIK.utils.asset(single.img)}" alt="${JIK.utils.esc(single.caption[L])} — ${single.ref}" loading="lazy" width="1200" height="800">
        </div>
        <figcaption class="look-item__caption">
          <strong>${single.ref}</strong>
          <span>${JIK.utils.esc(single.caption[L])}</span>
          <span>${JIK.utils.t('lookbook.open')} ↗</span>
        </figcaption>
      </figure>`;
  }

  function renderGallery() {
    const gallery = document.querySelector('[data-lookbook-gallery]');
    if (!gallery) return;
    gallery.innerHTML = LOOKS.map(renderItem).join('');
  }

  function initLightbox() {
    const lightbox = document.querySelector('[data-lightbox]');
    const img = lightbox.querySelector('[data-lightbox-image]');
    const closeBtn = lightbox.querySelector('[data-lightbox-close]');

    function openLightbox(src, alt) {
      img.src = src;
      img.alt = alt || '';
      lightbox.classList.add('is-open');
      if (JIK.lenis) JIK.lenis.stop();
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      if (JIK.lenis) JIK.lenis.start();
      document.body.style.overflow = '';
    }

    document.addEventListener('click', (e) => {
      const opener = e.target.closest('[data-lightbox-open]');
      if (opener) openLightbox(opener.dataset.src, opener.dataset.alt);
    });
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
    });
  }

  return {
    init() {
      renderGallery();
      initLightbox();
      document.addEventListener('jik:langchange', renderGallery);
      document.addEventListener('jik:langchange', () => JIK.i18n.apply(JIK.i18n.lang));
    },
  };
})();
