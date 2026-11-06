/* ============================================================
   JIK — Internationalisation FR / EN
   - data-i18n="key"      → textContent
   - data-i18n-html="key" → innerHTML (riches)
   - data-i18n-attr="placeholder:key;aria-label:key"
   - Persistance localStorage + mise à jour <html lang> + <title>/meta
   ============================================================ */

JIK.i18n = (() => {
  const STORAGE_KEY = 'jik-lang';

  function initialLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && JIK_I18N[saved]) return saved;
    return JIK_CONFIG.defaultLanguage;
  }

  function apply(lang) {
    const dict = JIK_I18N[lang] || JIK_I18N.fr;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const v = dict[el.dataset.i18n];
      if (v !== undefined) el.textContent = v;
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const v = dict[el.dataset.i18nHtml];
      if (v !== undefined) el.innerHTML = v;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      el.dataset.i18nAttr.split(';').forEach((pair) => {
        const [attr, key] = pair.split(':');
        if (dict[key] !== undefined) el.setAttribute(attr, dict[key]);
      });
    });

    // Métadonnées
    const pageKey = document.body.dataset.page || 'home';
    const title = dict[`meta.${pageKey}.title`];
    if (title) document.title = title;
    const desc = document.querySelector('meta[name="description"]');
    const metaDesc = dict[`meta.${pageKey}.description`];
    if (desc && metaDesc) desc.setAttribute('content', metaDesc);

    // Switch visuelle
    document.querySelectorAll('.lang-switch__btn').forEach((btn) => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  return {
    get lang() {
      return document.documentElement.lang || initialLang();
    },
    init() {
      const lang = initialLang();
      apply(lang);

      document.querySelectorAll('.lang-switch__btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (btn.dataset.lang === this.lang) return;
          localStorage.setItem(STORAGE_KEY, btn.dataset.lang);
          apply(btn.dataset.lang);
          document.dispatchEvent(new CustomEvent('jik:langchange', { detail: { lang: btn.dataset.lang } }));
        });
      });
    },
    apply,
  };
})();
