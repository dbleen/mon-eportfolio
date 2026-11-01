document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  // Mobile navigation toggle
  if (menuToggle && navLinks) {
    const closeMenu = () => {
      navLinks.classList.remove('open');
      document.body.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
    };

    const openMenu = () => {
      navLinks.classList.add('open');
      document.body.classList.add('menu-open');
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Close navigation menu');
    };

    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navItems.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });

    document.addEventListener('click', (event) => {
      if (
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }

  // Dynamic footer year
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Reveal animations on scroll
  const revealElements = document.querySelectorAll('.reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((element) => {
      element.classList.add('visible');
    });
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }

  // Active link highlight on scroll
  const sections = document.querySelectorAll('main section[id]');

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const activeId = entry.target.id;

          navItems.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${activeId}`;
            link.classList.toggle('active', isActive);
          });
        });
      },
      {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }
});
