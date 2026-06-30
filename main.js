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
    navSpacer.style.height = `${navWrapper.offsetHeight}px`;
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
