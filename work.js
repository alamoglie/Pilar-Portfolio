(function () {
  const filterButtons = document.querySelectorAll('[data-work-filter]');
  const workItems = document.querySelectorAll('.work-item, .work-pair');

  function applyFilter(filter) {
    workItems.forEach((item) => {
      if (filter === 'featured') {
        item.hidden = item.dataset.featured !== 'true';
      } else {
        item.hidden = false;
      }
    });

    filterButtons.forEach((button) => {
      const isActive = button.dataset.workFilter === filter;
      button.classList.toggle('nav__link--active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      applyFilter(button.dataset.workFilter);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  applyFilter(new URLSearchParams(window.location.search).get('filter') === 'all' ? 'all' : 'featured');
})();
