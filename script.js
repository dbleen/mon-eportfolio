
document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // 1. MENU MOBILE
  // =====================================

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

      const isOpen = navLinks.classList.toggle("open");

      menuToggle.classList.toggle("open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fermer le menu" : "Ouvrir le menu"
      );

    });

    // Fermer le menu après sélection
    navLinks.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Ouvrir le menu");
      });

    });

    // Fermer avec la touche Escape
    document.addEventListener("keydown", event => {

      if (event.key === "Escape") {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }

    });

  }


  // =====================================
  // 2. ANIMATIONS AU DÉFILEMENT
  // =====================================

  const revealElements = document.querySelectorAll(".reveal");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  } else {

    const observer = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");
            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealElements.forEach(element => {
      observer.observe(element);
    });

  }


  // =====================================
  // 3. ANNÉE AUTOMATIQUE DANS LE FOOTER
  // =====================================

  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  // =====================================
  // 4. LIEN ACTIF DE NAVIGATION
  // =====================================

  const pageSections = document.querySelectorAll(
    "#accueil, #projets, #contact"
  );

  const pageLinks = document.querySelectorAll(
    ".nav-links a"
  );

  if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            const currentId = entry.target.id;

            pageLinks.forEach(link => {

              link.classList.remove("active");

              if (link.getAttribute("href") === `#${currentId}`) {
                link.classList.add("active");
              }

            });

          }

        });

      },
      {
        threshold: 0.4
      }
    );

    pageSections.forEach(section => {
      sectionObserver.observe(section);
    });

  }

});
