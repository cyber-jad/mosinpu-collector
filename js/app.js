/**
 * MOSIN NAGANT PU SNIPER - MAIN APPLICATION COORDINATOR
 * 
 * Safe initialization and reliable top navigation switching.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation Tabs Switching Function
  function switchTab(targetSectionId) {
    if (!targetSectionId) return;

    // Clean target ID if it starts with #
    const cleanId = targetSectionId.replace(/^#/, '');

    const targetSection = document.getElementById(cleanId);
    if (!targetSection) return;

    // Update nav links (skip dropdown triggers, which have no target of their own)
    document.querySelectorAll('.main-nav-link:not(.nav-dropdown-trigger)').forEach(link => {
      const linkTarget = (link.getAttribute('data-target') || link.getAttribute('href') || '').replace(/^#/, '');
      if (linkTarget === cleanId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Light up a dropdown's own trigger pill whenever one of its items is the active section
    document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
      const trigger = dropdown.querySelector('.nav-dropdown-trigger');
      const hasActiveChild = !!dropdown.querySelector('.nav-dropdown-panel .main-nav-link.active');
      trigger.classList.toggle('active', hasActiveChild);
    });

    // Update all section containers
    document.querySelectorAll('.app-section').forEach(sec => {
      if (sec.id === cleanId) {
        sec.classList.add('active-section');
        sec.style.display = 'block';
        sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        sec.classList.remove('active-section');
        sec.style.display = 'none';
      }
    });
  }

  // Close every open dropdown menu (used before opening one, on selection, and on outside click)
  function closeAllDropdowns(exceptDropdown) {
    document.querySelectorAll('.nav-dropdown.open').forEach(dropdown => {
      if (dropdown === exceptDropdown) return;
      dropdown.classList.remove('open');
      const trigger = dropdown.querySelector('.nav-dropdown-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  }

  // Global click delegate for all navigation links & hero buttons
  document.addEventListener('click', (e) => {
    // Dropdown trigger pills (Tools / Reference) just toggle their panel open
    const trigger = e.target.closest('.nav-dropdown-trigger');
    if (trigger) {
      e.preventDefault();
      const dropdown = trigger.closest('.nav-dropdown');
      const willOpen = !dropdown.classList.contains('open');
      closeAllDropdowns(willOpen ? dropdown : null);
      dropdown.classList.toggle('open', willOpen);
      trigger.setAttribute('aria-expanded', String(willOpen));
      return;
    }

    // Check for main nav link or hero action button
    const navLink = e.target.closest('.main-nav-link, .hero-action-btn, .credit-link');
    if (navLink) {
      const dataTarget = navLink.getAttribute('data-target');
      const hrefTarget = navLink.getAttribute('href');

      // If it's an internal section link (starts with # or has data-target)
      if (dataTarget || (hrefTarget && hrefTarget.startsWith('#'))) {
        e.preventDefault();
        const targetId = dataTarget || hrefTarget;
        switchTab(targetId);
        closeAllDropdowns();

        // Close mobile nav drawer if open
        const mainNav = document.getElementById('main-navigation');
        if (mainNav && mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
        }
      }
      return;
    }

    // Click anywhere else closes any open dropdown
    if (!e.target.closest('.nav-dropdown')) {
      closeAllDropdowns();
    }
  });

  // Escape key closes any open dropdown
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllDropdowns();
  });

  // Mobile menu toggle button
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mainNav = document.getElementById('main-navigation');
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      const isExpanded = mainNav.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Safely initialize all interactive modules with try/catch
  const modules = [
    { name: 'AuthenticityWizard', obj: window.AuthenticityWizard },
    { name: 'ValuationCalculator', obj: window.ValuationCalculator },
    { name: 'MarkingsExplorer', obj: window.MarkingsExplorer },
    { name: 'ProductionMatrix', obj: window.ProductionMatrix },
    { name: 'ImporterGuide', obj: window.ImporterGuide },
    { name: 'BuyersChecklist', obj: window.BuyersChecklist },
    { name: 'CollectorGallery', obj: window.CollectorGallery }
  ];

  modules.forEach(mod => {
    if (mod.obj && typeof mod.obj.init === 'function') {
      try {
        mod.obj.init();
      } catch (err) {
        console.warn(`Module [${mod.name}] init warning:`, err);
      }
    }
  });

  // Ensure default active section is displayed
  const defaultSection = document.querySelector('.app-section.active-section') || document.getElementById('auth-inspector');
  if (defaultSection) {
    defaultSection.style.display = 'block';
  }
});
