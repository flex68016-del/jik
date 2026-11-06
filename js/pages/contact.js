/* ============================================================
   JIK — Contact : accordéon FAQ (hauteur animée, accessible)
   ============================================================ */

JIK.page = (() => {
  function initFaq() {
    document.querySelectorAll('[data-faq] .faq-item').forEach((item) => {
      const btn = item.querySelector('.faq-item__question');
      const answer = item.querySelector('.faq-item__answer');

      btn.addEventListener('click', () => {
        const open = item.dataset.open === 'true';
        item.dataset.open = String(!open);
        btn.setAttribute('aria-expanded', String(!open));

        if (window.anime && !JIK.utils.prefersReducedMotion()) {
          anime.animate(answer, {
            height: open ? 0 : answer.scrollHeight,
            duration: open ? 200 : 320,
            ease: 'outQuad',
            onComplete: () => {
              if (!open) answer.style.height = 'auto';
            },
          });
        } else {
          answer.style.height = open ? '0px' : 'auto';
        }
      });
    });
  }

  return {
    init() {
      initFaq();
    },
  };
})();
