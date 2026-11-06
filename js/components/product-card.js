/* ============================================================
   JIK — Carte produit réutilisable (homepage + boutique + liés)
   ============================================================ */

JIK.productCard = function productCard(product, lang, { index = 0 } = {}) {
  const base = JIK.utils.base;
  const t = (k) => JIK.utils.t(k);
  return `
    <a class="product-card" href="${base}pages/produit.html?product=${product.id}" data-product-card data-cursor="view" aria-label="${JIK.utils.esc(product.name[lang])} — ${product.ref}">
      <div class="product-card__frame" data-reveal="image">
        <img src="${base}${product.image}" alt="${JIK.utils.esc(product.alt[lang])}" loading="lazy" width="1200" height="800">
        <span class="product-card__ref">${product.ref}</span>
      </div>
      <div class="product-card__meta">
        <h3 class="product-card__name">${JIK.utils.esc(product.name[lang])}</h3>
        <span class="product-card__view">${t('common.viewProduct')}</span>
      </div>
    </a>`;
};
