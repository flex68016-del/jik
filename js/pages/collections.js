/* ============================================================
   JIK — Boutique : catalogue, filtres, tri
   ============================================================ */

JIK.page = (() => {
  let state = { category: 'all', sort: 'default' };

  const gridEl = () => document.querySelector('[data-shop-grid]');
  const countEl = () => document.querySelector('[data-shop-count]');

  function lang() {
    return JIK.i18n ? JIK.i18n.lang : JIK_CONFIG.defaultLanguage;
  }

  function getProducts() {
    const L = lang();
    let list = [...JIK_PRODUCTS];

    if (state.category !== 'all') {
      list = list.filter((p) => p.category === state.category);
    }

    switch (state.sort) {
      case 'name':
        list.sort((a, b) => a.name[L].localeCompare(b.name[L], L));
        break;
      case 'nameDesc':
        list.sort((a, b) => b.name[L].localeCompare(a.name[L], L));
        break;
      default:
        list.sort((a, b) => a.ref.localeCompare(b.ref));
    }
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

    if (countEl()) {
      countEl().textContent = `${products.length} ${JIK.utils.t('shop.results')}`;
    }

    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }

  function initFilters() {
    document.querySelectorAll('[data-filter-chip]').forEach((chip) => {
      chip.addEventListener('click', () => {
        state.category = chip.dataset.filterChip;
        document.querySelectorAll('[data-filter-chip]').forEach((c) => {
          const active = c === chip;
          c.classList.toggle('is-active', active);
          c.setAttribute('aria-pressed', String(active));
        });
        render();
      });
    });

    const sort = document.querySelector('[data-shop-sort]');
    if (sort) {
      sort.addEventListener('change', () => {
        state.sort = sort.value;
        render();
      });
    }
  }

  function retranslate() {
    // Re-traduire les libellés dynamiques (chips, compteur)
    document.querySelectorAll('[data-filter-chip]').forEach((chip) => {
      const cat = JIK_CATEGORIES.find((c) => c.id === chip.dataset.filterChip);
      if (cat) chip.textContent = cat.label[lang()];
    });
    render();
  }

  return {
    init() {
      initFilters();
      render();
      document.addEventListener('jik:langchange', retranslate);
      document.addEventListener('jik:langchange', () => JIK.i18n.apply(JIK.i18n.lang));
    },
  };
})();
