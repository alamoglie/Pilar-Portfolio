/**
 * Navbar fija — siempre fixed desde el inicio, sin animación de scroll.
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

  function syncSpacer() {
    navSpacer.style.height = `${navWrapper.offsetHeight + 20}px`;
  }

  navWrapper.classList.add('nav-wrapper--fixed');
  syncSpacer();

  window.addEventListener('resize', syncSpacer, { passive: true });
})();

(function initWorkFilterNav() {
  const filterButtons = document.querySelectorAll('[data-work-filter]');
  if (!filterButtons.length || document.querySelector('.work-item')) return;

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      window.location.href = `work.html?filter=${button.dataset.workFilter}`;
    });
  });
})();

(function initReelModal() {
  const REEL_SRC = 'images/video/Reel.webm';
  const reelTriggers = document.querySelectorAll('a.nav__link[href="/reel"]');
  if (!reelTriggers.length) return;

  const modal = document.createElement('div');
  modal.className = 'reel-modal';
  modal.id = 'reel-modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="reel-modal__backdrop" data-reel-close tabindex="-1"></div>
    <div class="reel-modal__panel" role="dialog" aria-modal="true" aria-label="Showreel" tabindex="-1">
      <button type="button" class="reel-modal__close" data-reel-close aria-label="Close showreel">×</button>
      <video class="reel-modal__video layout--narrow" controls playsinline preload="metadata">
        <source src="${REEL_SRC}" type="video/webm" />
      </video>
    </div>
  `;
  document.body.appendChild(modal);

  const video = modal.querySelector('.reel-modal__video');
  const panel = modal.querySelector('.reel-modal__panel');
  let lastFocused = null;

  function openReel() {
    lastFocused = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('reel-modal-open');
    panel.focus();
  }

  function closeReel() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('reel-modal-open');
    video.pause();
    video.currentTime = 0;
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  reelTriggers.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      openReel();
    });
  });

  modal.addEventListener('click', (event) => {
    if (!modal.classList.contains('is-open')) return;
    if (event.target.closest('.reel-modal__video')) return;
    closeReel();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) closeReel();
  });
})();

window.initFooterTime = function initFooterTime() {
  if (window.__footerTimeInit) return;

  const timeEl = document.getElementById('footer-time');
  if (!timeEl) return;

  window.__footerTimeInit = true;

  function updateTime() {
    const ba = new Date().toLocaleTimeString('en-US', {
      timeZone: 'America/Argentina/Buenos_Aires',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    timeEl.textContent = 'BA ' + ba;
  }

  updateTime();
  setInterval(updateTime, 30000);
};
