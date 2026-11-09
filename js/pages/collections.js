/* ============================================================
   JIK — Boutique : catalogue
   ============================================================ */

JIK.page = (() => {
  const gridEl = () => document.querySelector('[data-shop-grid]');

  function lang() {
    return JIK.i18n ? JIK.i18n.lang : JIK_CONFIG.defaultLanguage;
  }

  function getProducts() {
    const L = lang();
    const list = [...JIK_PRODUCTS];
    // Tri par référence par défaut
    list.sort((a, b) => a.ref.localeCompare(b.ref));
    return list;
  }

  function render() {
    const grid = gridEl();
    if (!grid) return;
    const L = lang();
    const products = getProducts();

    grid.innerHTML = products.length
      ? products.map((p) => JIK.productCard(p, L)).join('')
      : `<p class="shop-empty" data-i18n="shop.empty">${JIK.utils.t('shop.empty')}</p>`;

    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }

  function retranslate() {
    render();
    JIK.i18n.apply(JIK.i18n.lang);
  }

  return {
    init() {
      render();
      document.addEventListener('jik:langchange', retranslate);
    },
  };
})();
