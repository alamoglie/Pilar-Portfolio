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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountComponents);
  } else {
    mountComponents();
  }
})();
