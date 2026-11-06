/* ============================================================
   JIK — Layout partagé : navbar, menu mobile, footer, overlays
   Injecté sur chaque page depuis JS (source unique).
   ============================================================ */

JIK.layout = (() => {
  const B = () => JIK.utils.base;

  const WHATSAPP_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`;
  const INSTAGRAM_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`;

  const NAV_ITEMS = [
    { key: 'home', href: 'index.html' },
    { key: 'shop', href: 'pages/collections.html' },
    { key: 'story', href: 'pages/identite.html' },
    { key: 'lookbook', href: 'pages/lookbook.html' },
    { key: 'contact', href: 'pages/contact.html' },
  ];

  function navHref(href) {
    // Depuis /pages, les liens remontent d'un niveau
    return document.body.dataset.basePath ? href.replace('pages/', '') : href;
  }

  function isCurrentPage(key) {
    return document.body.dataset.page === key || (key === 'shop' && document.body.dataset.page === 'product');
  }

  function renderNav() {
    const links = NAV_ITEMS.map(
      (item) => `<li><a class="navbar__link" href="${navHref(item.href)}"${isCurrentPage(item.key) ? ' aria-current="page"' : ''} data-i18n="nav.${item.key}">${JIK.utils.t('nav.' + item.key)}</a></li>`
    ).join('');

    const mobileLinks = NAV_ITEMS.map(
      (item, i) => `<li class="mobile-menu__item"><a class="mobile-menu__link" href="${navHref(item.href)}"><span class="mobile-menu__index">0${i + 1}</span><span data-i18n="nav.${item.key}">${JIK.utils.t('nav.' + item.key)}</span></a></li>`
    ).join('');

    return `
      <header class="navbar" data-navbar>
        <a href="${navHref('index.html')}" class="navbar__logo" aria-label="JIK — Jésus Is King" data-magnetic>
          <img src="${B()}assets/brand/jik-logo-white.png" alt="JIK — Jésus Is King" class="logo-img" width="163" height="145">
        </a>
        <nav aria-label="Navigation principale">
          <ul class="navbar__links">${links}</ul>
        </nav>
        <div class="navbar__actions">
          <div class="lang-switch" role="group" aria-label="Langue / Language">
            <button class="lang-switch__btn" data-lang="fr" type="button">FR</button>
            <button class="lang-switch__btn" data-lang="en" type="button">EN</button>
          </div>
          <a class="navbar__whatsapp" href="#" data-whatsapp-link>${WHATSAPP_ICON}<span data-i18n="nav.whatsapp">Commander</span></a>
          <button class="navbar__burger" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle aria-label="${JIK.utils.t('a11y.openMenu')}">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>
      <div class="mobile-menu" id="mobile-menu" data-mobile-menu aria-hidden="true">
        <ul class="mobile-menu__list">${mobileLinks}</ul>
        <div class="mobile-menu__footer">
          <div class="lang-switch" role="group" aria-label="Langue / Language">
            <button class="lang-switch__btn" data-lang="fr" type="button">FR</button>
            <button class="lang-switch__btn" data-lang="en" type="button">EN</button>
          </div>
          <a class="navbar__whatsapp" href="#" data-whatsapp-link>${WHATSAPP_ICON}<span data-i18n="nav.whatsapp">Commander</span></a>
        </div>
      </div>`;
  }

  function renderFooter() {
    const year = new Date().getFullYear();
    return `
      <footer class="footer">
        <div class="footer__grid">
          <div class="footer__brand">
            <img src="${B()}assets/brand/jik-logo-white.png" alt="JIK — Jésus Is King" class="logo-img" width="163" height="145" loading="lazy">
            <p data-i18n="footer.tagline">${JIK.utils.t('footer.tagline')}</p>
            <p class="footer__signature" data-i18n="footer.signature">${JIK.utils.t('footer.signature')}</p>
          </div>
          <div>
            <h2 class="footer__title" data-i18n="footer.navigate">${JIK.utils.t('footer.navigate')}</h2>
            <ul class="footer__list">
              ${NAV_ITEMS.map((i) => `<li><a class="footer__link" href="${navHref(i.href)}" data-i18n="nav.${i.key}">${JIK.utils.t('nav.' + i.key)}</a></li>`).join('')}
            </ul>
          </div>
          <div>
            <h2 class="footer__title" data-i18n="footer.follow">${JIK.utils.t('footer.follow')}</h2>
            <ul class="footer__list">
              <li><a class="footer__link" href="#" data-whatsapp-link>WhatsApp</a></li>
              <li><a class="footer__link" href="#" data-instagram-link>Instagram</a></li>
            </ul>
          </div>
          <div>
            <h2 class="footer__title" data-i18n="footer.legal">${JIK.utils.t('footer.legal')}</h2>
            <ul class="footer__list">
              <li><a class="footer__link" href="${navHref('pages/contact.html')}#privacy" data-i18n="footer.privacy">${JIK.utils.t('footer.privacy')}</a></li>
              <li><a class="footer__link" href="${navHref('pages/contact.html')}#terms" data-i18n="footer.terms">${JIK.utils.t('footer.terms')}</a></li>
            </ul>
          </div>
        </div>
        <div class="footer__bottom">
          <span>© ${year} JIK — Jesus Is King. <span data-i18n="footer.rights">${JIK.utils.t('footer.rights')}</span></span>
          <div class="lang-switch" role="group" aria-label="Langue / Language">
            <button class="lang-switch__btn" data-lang="fr" type="button">FR</button>
            <button class="lang-switch__btn" data-lang="en" type="button">EN</button>
          </div>
        </div>
      </footer>`;
  }

  function renderOverlays() {
    return `
      <a class="skip-link" href="#main" data-i18n="a11y.skip">${JIK.utils.t('a11y.skip')}</a>
      <div class="jik-cursor" data-cursor aria-hidden="true"><span class="jik-cursor__label" data-cursor-label></span></div>
      <div class="page-transition" data-page-transition aria-hidden="true">
        <div class="page-transition__layer page-transition__layer--cream"></div>
        <div class="page-transition__layer page-transition__layer--black"></div>
        <img class="page-transition__logo" src="${B()}assets/brand/jik-logo-white.png" alt="">
      </div>`;
  }

  function renderFab() {
    return `<a class="whatsapp-fab" href="#" data-whatsapp-link aria-label="WhatsApp" data-magnetic>${WHATSAPP_ICON}</a>`;
  }

  function initMenu() {
    const toggle = document.querySelector('[data-menu-toggle]');
    const menu = document.querySelector('[data-mobile-menu]');
    if (!toggle || !menu) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('is-open', open);
      menu.setAttribute('aria-hidden', String(!open));
      toggle.setAttribute('aria-label', JIK.utils.t(open ? 'a11y.closeMenu' : 'a11y.openMenu'));
      if (JIK.lenis) open ? JIK.lenis.stop() : JIK.lenis.start();
      document.body.style.overflow = open ? 'hidden' : '';
    }

    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) setOpen(false);
    });
  }

  function initLinks() {
    document.querySelectorAll('[data-whatsapp-link]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const url = JIK.utils.waUrl("Bonjour JIK ! Je souhaite avoir des informations.\n\nJIK — S'affirmer sans parler.");
        if (!url) {
          e.preventDefault();
          alert(JIK.utils.t('contact.waUnavailable'));
        } else {
          a.href = url;
          a.target = '_blank';
          a.rel = 'noopener';
        }
      });
    });

    const ig = document.querySelectorAll('[data-instagram-link]');
    ig.forEach((a) => {
      if (JIK_CONFIG.instagramUrl) {
        a.href = JIK_CONFIG.instagramUrl;
        a.target = '_blank';
        a.rel = 'noopener';
      } else {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          alert(JIK.utils.t('contact.pending'));
        });
      }
    });
  }

  function init() {
    document.body.insertAdjacentHTML('afterbegin', renderNav() + renderOverlays());
    document.body.insertAdjacentHTML('beforeend', renderFooter() + renderFab());

    const main = document.querySelector('main');
    if (main) main.id = 'main';

    initMenu();
    initLinks();
  }

  return { init };
})();
