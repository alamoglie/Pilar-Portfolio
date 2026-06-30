/**
 * Floating island navbar — GSAP + ScrollTrigger
 * Top: full-width white bar. Scrolled: fixed transparent shell + white edge islands.
 */
(function () {
  const navWrapper = document.getElementById('nav-wrapper');
  if (!navWrapper) return;

  let navSpacer = document.getElementById('nav-spacer');
  if (!navSpacer) {
    navSpacer = document.createElement('div');
    navSpacer.id = 'nav-spacer';
    navSpacer.className = 'nav-spacer';
    navSpacer.setAttribute('aria-hidden', 'true');
    navWrapper.insertAdjacentElement('afterend', navSpacer);
  }

  const islands = navWrapper.querySelectorAll('.nav__island');
  let islandActive = false;

  function syncSpacer() {
    navSpacer.style.height = islandActive ? `${navWrapper.offsetHeight}px` : '0';
  }

  function setIslandMode(active, animate) {
    if (active === islandActive) return;
    islandActive = active;

    if (active) {
      navWrapper.classList.add('nav-wrapper--fixed', 'nav-wrapper--island');
      syncSpacer();

      if (animate && window.gsap) {
        window.gsap.fromTo(
          islands,
          { scale: 0.96, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            ease: 'power2.out',
            stagger: 0.05,
            overwrite: true,
          }
        );
      }
    } else {
      navWrapper.classList.remove('nav-wrapper--fixed', 'nav-wrapper--island');
      navSpacer.style.height = '0';

      if (animate && window.gsap) {
        window.gsap.set(islands, { scale: 1, opacity: 1, clearProps: 'transform' });
      }
    }
  }

  function initScrollTrigger() {
    if (!window.gsap || !window.ScrollTrigger) {
      window.addEventListener(
        'scroll',
        function () {
          const top = navSpacer.getBoundingClientRect().top;
          setIslandMode(top <= 0, false);
        },
        { passive: true }
      );
      return;
    }

    window.gsap.registerPlugin(window.ScrollTrigger);

    window.ScrollTrigger.create({
      trigger: navSpacer,
      start: 'top top',
      onEnter: () => setIslandMode(true, true),
      onLeaveBack: () => setIslandMode(false, true),
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollTrigger);
  } else {
    initScrollTrigger();
  }

  window.addEventListener('resize', syncSpacer, { passive: true });
})();
