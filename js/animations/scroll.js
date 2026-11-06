/* ============================================================
   JIK — Système d'animations au scroll (GSAP ScrollTrigger)
   Utilitaires réutilisables, déclarés via data-attributes :
   - data-reveal            → fade + rise
   - data-reveal="image"    → clip-path reveal (masque)
   - data-split="chars|words" → découpe + stagger (SplitText-like natif)
   - data-parallax="0.2"    → translation verticale au scroll
   - data-stagger           → enfants révélés en cascade
   ============================================================ */

JIK.motion = (() => {
  const reduce = () => JIK.utils.prefersReducedMotion();
  const hasGSAP = () => window.gsap && window.ScrollTrigger;

  /** Découpe un texte en mots/chars (SplitText-like, sans plugin premium) */
  function splitText(el) {
    const mode = el.dataset.split;
    const text = el.textContent;
    el.setAttribute('aria-label', text.trim());
    el.textContent = '';

    if (mode === 'chars') {
      const words = text.split(/(\s+)/);
      words.forEach((word) => {
        if (/^\s+$/.test(word)) {
          el.appendChild(document.createTextNode(' '));
          return;
        }
        const wordWrap = document.createElement('span');
        wordWrap.style.display = 'inline-block';
        wordWrap.setAttribute('aria-hidden', 'true');
        [...word].forEach((ch) => {
          const s = document.createElement('span');
          s.style.display = 'inline-block';
          s.textContent = ch;
          wordWrap.appendChild(s);
        });
        el.appendChild(wordWrap);
      });
      return el.querySelectorAll('span > span');
    }

    // words
    text.split(/(\s+)/).forEach((word) => {
      if (/^\s+$/.test(word)) {
        el.appendChild(document.createTextNode(' '));
        return;
      }
      const s = document.createElement('span');
      s.style.display = 'inline-block';
      s.setAttribute('aria-hidden', 'true');
      s.textContent = word;
      el.appendChild(s);
    });
    return el.querySelectorAll('span');
  }

  function init() {
    if (!hasGSAP()) {
      // Sans GSAP (CDN indisponible) : tout le contenu reste visible
      document.querySelectorAll('[data-reveal]').forEach((el) => (el.style.opacity = '1'));
      return;
    }
    const reduced = reduce();
    gsap.registerPlugin(ScrollTrigger);

    if (reduced) {
      // Motion réduite : tout visible, uniquement des fades discrets
      document.querySelectorAll('[data-reveal], [data-split]').forEach((el) => {
        el.style.opacity = '1';
      });
      return;
    }

    // ---- Reveals génériques ----
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      if (el.dataset.reveal === 'image') {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.1,
            ease: 'power4.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        );
        return;
      }
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        }
      );
    });

    // ---- Découpe de texte (chars / words) ----
    document.querySelectorAll('[data-split]').forEach((el) => {
      const parts = splitText(el);
      gsap.fromTo(
        parts,
        { opacity: 0, yPercent: 110 },
        {
          opacity: 1,
          yPercent: 0,
          duration: 0.7,
          ease: 'power4.out',
          stagger: el.dataset.split === 'chars' ? 0.025 : 0.06,
          scrollTrigger: { trigger: el, start: 'top 85%' },
        }
      );
    });

    // ---- Cascades ----
    document.querySelectorAll('[data-stagger]').forEach((parent) => {
      gsap.fromTo(
        parent.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: parent, start: 'top 82%' },
        }
      );
    });

    // ---- Parallaxe ----
    document.querySelectorAll('[data-parallax]').forEach((el) => {
      const amount = parseFloat(el.dataset.parallax) || 0.2;
      gsap.fromTo(
        el,
        { yPercent: -amount * 50 },
        {
          yPercent: amount * 50,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
    });
  }

  /** Hero : séquence d'entrée après l'intro */
  function heroIn() {
    if (!hasGSAP()) return;
    if (reduce()) {
      document.querySelectorAll('[data-hero]').forEach((el) => (el.style.opacity = '1'));
      return;
    }
    const targets = document.querySelectorAll('[data-hero]');
    if (!targets.length) return;
    gsap.fromTo(
      targets,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.12,
        delay: 0.15,
      }
    );
  }

  return { init, heroIn, splitText };
})();
