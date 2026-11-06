/* ============================================================
   JIK — Fiche produit : rendu, sélecteurs, validation, WhatsApp
   URL : pages/produit.html?product=jik-001
   ============================================================ */

JIK.page = (() => {
  let product = null;
  const selection = { size: null, color: null, qty: 1 };

  const lang = () => (JIK.i18n ? JIK.i18n.lang : JIK_CONFIG.defaultLanguage);

  function currentColorName() {
    if (!selection.color) return '';
    const c = product.colors.find((c) => c.hex === selection.color);
    return c ? c.name[lang()] : '';
  }

  function render() {
    const root = document.querySelector('[data-product-root]');
    if (!root) return;

    const id = new URLSearchParams(location.search).get('product');
    product = JIK.utils.productById(id || '');

    if (!product) {
      root.innerHTML = `
        <div class="product-hero__panel" style="min-height:80vh;justify-content:center;">
          <h1 class="product-hero__title">${JIK.utils.t('product.notFound')}</h1>
          <p class="product-hero__concept">${JIK.utils.t('product.notFoundBody')}</p>
          <a class="btn" href="collections.html" data-i18n="common.backToShop">${JIK.utils.t('common.backToShop')}</a>
        </div>`;
      return;
    }

    const L = lang();
    const t = (k) => JIK.utils.t(k);

    root.innerHTML = `
      <div class="product-hero__gallery" data-reveal="image">
        <span class="product-hero__ref">${product.ref}</span>
        <img id="product-image" src="${JIK.utils.base}${product.image}" alt="${JIK.utils.esc(product.alt[L])}" width="1200" height="800">
      </div>
      <div class="product-hero__panel">
        <p class="eyebrow eyebrow--gold">${t('product.eyebrow')}</p>
        <h1 class="product-hero__title">${JIK.utils.esc(product.name[L])}</h1>
        <p class="product-hero__price" data-price>${product.price !== null ? product.price + ' ' + JIK_CONFIG.currency : ''}</p>
        <blockquote class="product-hero__verse">
          « ${JIK.utils.esc(product.bibleVerse[L])} »
          <span class="product-hero__verse-ref">${JIK.utils.esc(product.bibleRef[L])}</span>
        </blockquote>
        <p class="product-hero__concept"><strong>${t('product.description')} — </strong>${JIK.utils.esc(product.concept[L])}</p>
        ${product.ewe ? `
        <figure class="product-hero__ewe">
          <figcaption class="product-hero__ewe-label">${t('product.ewe')}</figcaption>
          <p style="margin:0;">« ${product.ewe} »</p>
        </figure>` : ''}
        <p class="product-hero__availability">${t('product.availability')} : ${t('product.availabilityValue')}</p>

        <div class="option-group">
          <div class="option-group__label">
            <span>${t('product.size')}</span>
            <button type="button" class="footer__link" data-size-guide-toggle>${t('product.sizeGuide')}</button>
          </div>
          <div class="option-row" data-size-row role="radiogroup" aria-label="${t('product.size')}">
            ${JIK_CONFIG.sizes.map((s) => `<button type="button" class="size-btn" data-size="${s}" role="radio" aria-checked="false">${s}</button>`).join('')}
          </div>
          <p class="option-group__error" data-size-error aria-live="polite"></p>
        </div>

        <div class="option-group">
          <div class="option-group__label"><span>${t('product.color')}</span></div>
          <div class="option-row" data-color-row role="radiogroup" aria-label="${t('product.color')}">
            ${product.colors.map((c) => `
              <button type="button" class="color-btn" data-color="${c.hex}" role="radio" aria-checked="false"
                title="${JIK.utils.esc(c.name[L])}" aria-label="${JIK.utils.esc(c.name[L])}"
                style="background:${c.hex};"></button>`).join('')}
          </div>
          <p class="option-group__error" data-color-error aria-live="polite"></p>
        </div>

        <div class="option-group">
          <div class="option-group__label"><span>${t('product.quantity')}</span></div>
          <div class="quantity">
            <button type="button" class="quantity__btn" data-qty="-1" aria-label="−">−</button>
            <span class="quantity__value" data-qty-value aria-live="polite">1</span>
            <button type="button" class="quantity__btn" data-qty="1" aria-label="+">+</button>
          </div>
        </div>

        <a class="btn btn--gold" href="#" data-order-btn data-magnetic data-cursor="explore" style="justify-content:center;">${t('common.orderWhatsapp')}</a>

        <div class="size-guide" data-size-guide hidden>
          <h2 class="footer__title" style="margin:0;">${t('product.sizeGuideTitle')}</h2>
          <table>
            <thead><tr><th>${t('product.size')}</th><th>${t('product.chest')}</th><th>${t('product.length')}</th></tr></thead>
            <tbody>
              <tr><td>S</td><td>—</td><td>—</td></tr>
              <tr><td>M</td><td>—</td><td>—</td></tr>
              <tr><td>L</td><td>—</td><td>—</td></tr>
              <tr><td>XL</td><td>—</td><td>—</td></tr>
              <tr><td>XXL</td><td>—</td><td>—</td></tr>
            </tbody>
          </table>
          <p class="size-guide__note">${t('product.sizeGuideBody')}</p>
        </div>
      </div>`;

    renderRelated();
    bindInteractions();
    updateMetadata();
  }

  function renderRelated() {
    const related = JIK_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);
    const section = document.createElement('section');
    section.className = 'section related';
    section.innerHTML = `
      <div class="container">
        <h2 class="related__title" data-reveal>${JIK.utils.t('product.related')}</h2>
        <div class="related__grid" data-stagger>
          ${related.map((p) => JIK.productCard(p, lang())).join('')}
        </div>
      </div>`;
    document.querySelector('main').appendChild(section);
  }

  function updateMetadata() {
    const L = lang();
    document.title = `${product.name[L]} — ${product.ref} | JIK`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', product.concept[L]);
    const og = document.querySelector('meta[property="og:image"]');
    if (og) og.setAttribute('content', `${JIK.utils.base}${product.image}`);
  }

  /* ---------- Interactions ---------- */

  function bindInteractions() {
    const root = document.querySelector('[data-product-root]');

    // Tailles
    root.querySelectorAll('[data-size]').forEach((btn) => {
      btn.addEventListener('click', () => {
        selection.size = btn.dataset.size;
        root.querySelectorAll('[data-size]').forEach((b) => {
          const on = b === btn;
          b.classList.toggle('is-selected', on);
          b.setAttribute('aria-checked', String(on));
        });
        root.querySelector('[data-size-error]').textContent = '';
      });
    });

    // Couleurs
    root.querySelectorAll('[data-color]').forEach((btn) => {
      btn.addEventListener('click', () => {
        selection.color = btn.dataset.color;
        root.querySelectorAll('[data-color]').forEach((b) => {
          const on = b === btn;
          b.classList.toggle('is-selected', on);
          b.setAttribute('aria-checked', String(on));
        });
        root.querySelector('[data-color-error]').textContent = '';
      });
    });

    // Quantité
    root.querySelectorAll('[data-qty]').forEach((btn) => {
      btn.addEventListener('click', () => {
        selection.qty = Math.min(99, Math.max(1, selection.qty + Number(btn.dataset.qty)));
        root.querySelector('[data-qty-value]').textContent = selection.qty;
      });
    });

    // Guide des tailles
    const guideToggle = root.querySelector('[data-size-guide-toggle]');
    const guide = root.querySelector('[data-size-guide]');
    if (guideToggle && guide) {
      guideToggle.addEventListener('click', () => {
        guide.hidden = !guide.hidden;
      });
    }

    // Commande WhatsApp avec validation
    root.querySelector('[data-order-btn]').addEventListener('click', (e) => {
      e.preventDefault();
      const okSize = !!selection.size;
      const okColor = !!selection.color;

      root.querySelector('[data-size-error]').textContent = okSize ? '' : JIK.utils.t('product.selectSize');
      root.querySelector('[data-color-error]').textContent = okColor ? '' : JIK.utils.t('product.selectColor');

      if (!okSize || !okColor) {
        const firstError = root.querySelector(okSize ? '[data-color-row]' : '[data-size-row]');
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      const msg = JIK.utils.orderMessage(product, selection.size, currentColorName(), selection.qty, lang());
      const url = JIK.utils.waUrl(msg);

      if (!url) {
        alert(JIK.utils.t('contact.waUnavailable'));
        return;
      }

      window.open(url, '_blank', 'noopener');
    });
  }

  function retranslate() {
    render();
    JIK.i18n.apply(JIK.i18n.lang);
  }

  return {
    init() {
      render();
      document.addEventListener('jik:langchange', retranslate);
      document.addEventListener('jik:langchange', () => JIK.i18n.apply(JIK.i18n.lang));
    },
  };
})();
