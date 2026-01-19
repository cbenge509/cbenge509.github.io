/**
 * Navigation Script - Scroll behavior and mobile menu
 *
 * USAGE: This script is imported by Navigation.astro and handles:
 * - Scroll-based hide/reveal behavior
 * - Mobile menu open/close with accessibility
 * - Focus trap for mobile menu
 * - Keyboard navigation (Escape to close)
 *
 * NOTE: This script is bundled with Navigation.astro and only loads
 * on pages that include the Navigation component.
 */

/**
 * Initialize navigation functionality.
 * Sets up scroll behavior, mobile menu, and accessibility features.
 */
export function initNavigation(): void {
  const nav = document.querySelector(
    '[data-component="navigation"]',
  ) as HTMLElement | null;
  const menuToggle = document.querySelector(
    '[data-component="mobile-menu-toggle"]',
  ) as HTMLButtonElement | null;
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuPanel = mobileMenu?.querySelector(
    '.mobile-menu-panel',
  ) as HTMLElement | null;
  const mobileMenuBackdrop = mobileMenu?.querySelector(
    '.mobile-menu-backdrop',
  ) as HTMLElement | null;

  // ---------------------------------------------------------------------------
  // Scroll-based hide/reveal behavior
  // ---------------------------------------------------------------------------
  let lastScroll = 0;
  let ticking = false;
  let isMenuOpen = false;

  function handleScroll(): void {
    if (!nav || isMenuOpen) {
      ticking = false;
      return;
    }

    const currentScroll = window.scrollY;

    if (currentScroll < 50) {
      // Always show nav at top of page
      nav.classList.remove('nav-hidden');
    } else if (currentScroll > lastScroll + 5) {
      // Scrolling down - hide nav
      nav.classList.add('nav-hidden');
    } else if (currentScroll < lastScroll - 5) {
      // Scrolling up - show nav
      nav.classList.remove('nav-hidden');
    }

    lastScroll = currentScroll;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(handleScroll);
      ticking = true;
    }
  });

  // ---------------------------------------------------------------------------
  // Mobile menu functionality
  // ---------------------------------------------------------------------------

  function openMenu(): void {
    if (!nav || !menuToggle || !mobileMenu) return;

    isMenuOpen = true;
    nav.classList.add('menu-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close navigation menu');
    mobileMenu.setAttribute('aria-hidden', 'false');

    // Enable tabbing to menu items
    const menuFocusables = mobileMenuPanel?.querySelectorAll('a, button');
    menuFocusables?.forEach(el => el.removeAttribute('tabindex'));

    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden';

    // Focus first menu link
    const firstLink = mobileMenuPanel?.querySelector('a') as HTMLElement | null;
    firstLink?.focus();
  }

  function closeMenu(): void {
    if (!nav || !menuToggle || !mobileMenu) return;

    isMenuOpen = false;
    nav.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    mobileMenu.setAttribute('aria-hidden', 'true');

    // Disable tabbing to menu items when closed (for accessibility)
    const menuFocusables = mobileMenuPanel?.querySelectorAll('a, button');
    menuFocusables?.forEach(el => el.setAttribute('tabindex', '-1'));

    // Restore body scroll
    document.body.style.overflow = '';

    // Return focus to toggle button
    menuToggle.focus();
  }

  function toggleMenu(): void {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Toggle button click handler
  menuToggle?.addEventListener('click', toggleMenu);

  // Close on backdrop click
  mobileMenuBackdrop?.addEventListener('click', closeMenu);

  // Close on Escape key
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMenu();
    }
  });

  // ---------------------------------------------------------------------------
  // Focus trap for mobile menu
  // ---------------------------------------------------------------------------

  function trapFocus(e: KeyboardEvent): void {
    if (!isMenuOpen || !mobileMenuPanel || e.key !== 'Tab') return;

    const focusableElements = mobileMenuPanel.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    // Include the toggle button in the focus trap
    if (e.shiftKey) {
      // Shift + Tab: going backwards
      if (document.activeElement === firstElement) {
        e.preventDefault();
        menuToggle?.focus();
      } else if (document.activeElement === menuToggle) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab: going forwards
      if (document.activeElement === lastElement) {
        e.preventDefault();
        menuToggle?.focus();
      } else if (document.activeElement === menuToggle) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  document.addEventListener('keydown', trapFocus);

  // ---------------------------------------------------------------------------
  // Close menu on navigation (when clicking a link)
  // ---------------------------------------------------------------------------

  const menuLinks = mobileMenuPanel?.querySelectorAll('a');
  menuLinks?.forEach(link => {
    link.addEventListener('click', () => {
      // Small delay to allow navigation to start
      setTimeout(closeMenu, 100);
    });
  });

  // ---------------------------------------------------------------------------
  // Close menu on window resize (when switching to desktop)
  // ---------------------------------------------------------------------------

  let resizeTimeout: ReturnType<typeof setTimeout>;

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        closeMenu();
      }
    }, 100);
  });
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initNavigation());
} else {
  initNavigation();
}

// Re-initialize on page navigation (for Astro view transitions)
document.addEventListener('astro:page-load', () => initNavigation());
