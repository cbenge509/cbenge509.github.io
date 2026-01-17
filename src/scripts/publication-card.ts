/**
 * Publication card abstract toggle functionality.
 * Progressive enhancement: abstracts visible by default, JS collapses them initially.
 */

function initPublicationCards(): void {
  document
    .querySelectorAll('[data-component="publication-card"]')
    .forEach(card => {
      const toggle = card.querySelector(
        '[data-toggle]',
      ) as HTMLButtonElement | null;
      const abstract = card.querySelector(
        '[data-abstract]',
      ) as HTMLElement | null;
      const toggleText = card.querySelector(
        '[data-toggle-text]',
      ) as HTMLElement | null;

      if (!toggle || !abstract || !toggleText) return;

      // Initially collapse abstracts (JS enhancement)
      abstract.classList.remove('expanded');
      toggle.setAttribute('aria-expanded', 'false');
      toggleText.textContent = 'Show Abstract';

      toggle.addEventListener('click', () => {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

        toggle.setAttribute('aria-expanded', String(!isExpanded));
        abstract.classList.toggle('expanded');
        toggleText.textContent = isExpanded ? 'Show Abstract' : 'Hide Abstract';
      });
    });
}

// Initialize on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPublicationCards);
} else {
  initPublicationCards();
}
