/**
 * Scroll Reveal Animation Script
 * Uses IntersectionObserver to trigger fade-in animations on elements with [data-reveal] attribute
 *
 * USAGE: Import this script in any page that uses [data-reveal] elements:
 *
 * ```astro
 * <script>
 *   import '../scripts/scroll-reveal';
 * </script>
 * ```
 *
 * NOTE: This script is intentionally NOT in BaseLayout to enable
 * optimal code splitting. Only pages with [data-reveal] elements
 * should import this script.
 *
 * Features:
 * - Observes elements with [data-reveal] attribute
 * - Adds 'revealed' class when element enters viewport (10% visible)
 * - Unobserves after reveal (one-time animation)
 * - Respects prefers-reduced-motion (handled via CSS)
 *
 * @usage Add data-reveal attribute to any element:
 * <div data-reveal>Content fades in on scroll</div>
 */

/**
 * Creates an IntersectionObserver for scroll reveal animations
 * @returns IntersectionObserver instance
 */
function createScrollReveal(): IntersectionObserver {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Unobserve after reveal - animation is one-time only
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of element is visible
      rootMargin: '0px 0px -50px 0px', // Start 50px before entering viewport
    },
  );

  return observer;
}

/**
 * Initialize scroll reveal functionality
 * Observes all elements with [data-reveal] attribute
 */
function init(): void {
  const observer = createScrollReveal();
  const revealElements = document.querySelectorAll('[data-reveal]');

  revealElements.forEach(el => {
    observer.observe(el);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Re-initialize on page navigation (for Astro view transitions)
document.addEventListener('astro:page-load', init);
