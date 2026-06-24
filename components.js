/**
 * Mount shared HTML components into [data-component] placeholders.
 * Primary source: components/<name>.html
 * Fallback: inline templates when fetch is unavailable (e.g. file://)
 */
(function () {
  const FALLBACK_TEMPLATES = {
    'other-projects': `<section class="other-projects layout--wide" aria-label="Other projects">
  <p class="other-projects__label">Other projects</p>

  <div class="other-projects__grid">
    <a href="work.html" class="other-projects__card" aria-label="Victoria — view project">
      <img src="images/other-projects/vicyori.png" alt="Victoria project" class="other-projects__card-img" />
    </a>
    <a href="work.html" class="other-projects__card" aria-label="Radio Disney — view project">
      <img src="images/other-projects/disney.png" alt="Radio Disney project" class="other-projects__card-img" />
    </a>
    <a href="hello-fresh.html" class="other-projects__card" aria-label="CookUnity / HelloFresh Sponsorship — view project">
      <img src="images/work/work_taco.png" alt="CookUnity / HelloFresh Sponsorship project" class="other-projects__card-img" />
    </a>
  </div>
</section>`
  };

  async function loadTemplate(name) {
    try {
      const response = await fetch(`components/${name}.html`);
      if (response.ok) return (await response.text()).trim();
    } catch (_) {
      /* fetch unavailable */
    }

    return FALLBACK_TEMPLATES[name] || '';
  }

  async function mountComponents() {
    const slots = document.querySelectorAll('[data-component]');

    await Promise.all([...slots].map(async (slot) => {
      const name = slot.dataset.component;
      if (!name) return;

      const html = await loadTemplate(name);
      if (html) slot.outerHTML = html;
    }));

    initOtherProjectsCursor();
  }

  function initOtherProjectsCursor() {
    const cards = document.querySelectorAll('.other-projects__card');
    if (!cards.length) return;

    let cursor = document.querySelector('.other-projects-cursor');
    if (!cursor) {
      cursor = document.createElement('div');
      cursor.className = 'other-projects-cursor';
      cursor.setAttribute('aria-hidden', 'true');
      cursor.innerHTML = '<img src="images/shared/icon.svg" alt="" />';
      document.body.appendChild(cursor);
    }

    if (cursor.dataset.bound === 'true') return;
    cursor.dataset.bound = 'true';

    window.addEventListener('mousemove', (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    }, { passive: true });

    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        cursor.classList.add('other-projects-cursor--visible');
      });
      card.addEventListener('mouseleave', () => {
        cursor.classList.remove('other-projects-cursor--visible');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountComponents);
  } else {
    mountComponents();
  }
})();
