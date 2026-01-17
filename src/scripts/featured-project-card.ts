/**
 * Featured project card GitHub link handling.
 * Stops propagation on GitHub links to prevent card navigation.
 */

let initialized = false;

function initFeaturedProjectCards(): void {
  // Prevent multiple initializations
  if (initialized) return;
  initialized = true;

  // Use event delegation for efficiency
  document.addEventListener('click', event => {
    const target = event.target as HTMLElement;
    const githubLink = target.closest('[data-github-link]');
    if (githubLink) {
      event.stopPropagation();
    }
  });
}

// Initialize on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFeaturedProjectCards);
} else {
  initFeaturedProjectCards();
}
