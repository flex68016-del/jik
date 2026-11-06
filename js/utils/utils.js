/* ============================================================
   JIK — Utilitaires partagés
   ============================================================ */

const JIK = window.JIK || {};

JIK.utils = {
  /** Chemins relatifs corrects selon que la page est à la racine ou dans /pages */
  get base() {
    return document.body.dataset.basePath || '';
  },

  asset(path) {
    return JIK.utils.base + path;
  },

  t(key) {
    const lang = JIK.i18n ? JIK.i18n.lang : JIK_CONFIG.defaultLanguage;
    const dict = JIK_I18N[lang] || JIK_I18N.fr;
    return dict[key] ?? JIK_I18N.fr[key] ?? key;
  },

  esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  },

  productById(id) {
    return JIK_PRODUCTS.find((p) => p.id === id.toLowerCase());
  },

  /** URL WhatsApp commando — null si numéro non configuré */
  waUrl(message) {
    const num = JIK_CONFIG.whatsappNumber;
    if (!num || num.startsWith('REPLACE')) return null;
    return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
  },

  orderMessage(product, size, color, qty, lang) {
    if (lang === 'en') {
      return [
        'Hello JIK!',
        '',
        'I would like to order:',
        '',
        `Product: ${product.name.en.toUpperCase()}`,
        `Reference: ${product.ref}`,
        `Size: ${size}`,
        `Color: ${color}`,
        `Quantity: ${qty}`,
        '',
        'Please confirm availability and shipping details.',
        '',
        'JIK — S\'affirmer sans parler.',
      ].join('\n');
    }
    return [
      'Bonjour JIK !',
      '',
      'Je souhaite commander :',
      '',
      `Produit : ${product.name.fr.toUpperCase()}`,
      `Référence : ${product.ref}`,
      `Taille : ${size}`,
      `Couleur : ${color}`,
      `Quantité : ${qty}`,
      '',
      'Merci de me confirmer la disponibilité et les modalités de livraison.',
      '',
      "JIK — S'affirmer sans parler.",
    ].join('\n');
  },

  /** prefers-reduced-motion */
  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  isTouch() {
    return !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  },
};

window.JIK = JIK;
