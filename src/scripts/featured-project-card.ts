/**
 * Featured project card GitHub link handling.
 * Stops propagation on GitHub links to prevent card navigation.
 */

// Track if listener already attached
let listenerAttached = false;

function initFeaturedProjectCards(): void {
  // Use event delegation for efficiency - safe to call multiple times
  // as we only attach one delegated listener to document
  if (listenerAttached) return;
  listenerAttached = true;

  document.addEventListener('click', event => {
    const target = event.target as HTMLElement;
    const githubLink = target.closest('[data-github-link]');
    if (githubLink) {
      event.stopPropagation();
    }
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFeaturedProjectCards);
} else {
  initFeaturedProjectCards();
}

// Re-initialize on page navigation (for Astro view transitions)
// Event delegation is already set up, no need to re-attach
document.addEventListener('astro:page-load', initFeaturedProjectCards);
