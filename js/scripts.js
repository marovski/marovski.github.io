document.addEventListener("DOMContentLoaded", function () {
  var filterButtons = document.querySelectorAll(".filter-button");
  var galleryItems = document.querySelectorAll(".gallery_product.filter");
  var tlItems = document.querySelectorAll(".tl-item");
  var tlFilters = document.querySelectorAll(".timeline-filter");
  var navLinks = document.querySelectorAll("#dot-nav a[href^='#section-']");

  function setActiveNavLink(sectionId) {
    navLinks.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + sectionId;
      link.classList.toggle("is-selected", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  filterButtons.forEach(function (button) {
    button.setAttribute("aria-pressed", String(button.classList.contains("active")));
    button.addEventListener("click", function () {
      var value = button.dataset.filter;

      filterButtons.forEach(function (otherButton) {
        var active = otherButton === button;
        otherButton.classList.toggle("active", active);
        otherButton.setAttribute("aria-pressed", String(active));
      });

      galleryItems.forEach(function (item) {
        var match = value === "all" || item.classList.contains(value);
        item.hidden = !match;
      });
    });
  });

  tlFilters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      tlFilters.forEach(function (otherButton) {
        otherButton.classList.remove("is-active");
        otherButton.setAttribute("aria-pressed", "false");
      });

      btn.classList.add("is-active");
      btn.setAttribute("aria-pressed", "true");

      var filter = btn.dataset.filter;
      tlItems.forEach(function (item) {
        var match = filter === "all" || item.dataset.category === filter;
        item.classList.toggle("is-hidden-filter", !match);
      });
    });
  });

  tlItems.forEach(function (item, index) {
    var card = item.querySelector(".tl-item__card");
    var bodyWrap = item.querySelector(".tl-item__body-wrap");
    var title = item.querySelector(".tl-item__title");

    if (!card || !bodyWrap) {
      return;
    }

    var panelId = "timeline-panel-" + index;
    card.setAttribute("aria-controls", panelId);
    card.setAttribute("aria-label", title ? title.textContent.trim() + " details" : "Toggle timeline details");
    bodyWrap.id = panelId;
    bodyWrap.setAttribute("aria-hidden", card.getAttribute("aria-expanded") !== "true");

    card.addEventListener("click", function (e) {
      if (e.target.closest("a")) return;
      var expanded = card.getAttribute("aria-expanded") === "true";
      var nextExpanded = !expanded;
      card.setAttribute("aria-expanded", String(nextExpanded));
      bodyWrap.setAttribute("aria-hidden", String(!nextExpanded));
    });

    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });

  var navSections = Array.from(navLinks)
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  if (navSections.length) {
    var initialSection = location.hash && document.querySelector(location.hash) ? location.hash.slice(1) : navSections[0].id;
    setActiveNavLink(initialSection);

    if ("IntersectionObserver" in window) {
      var navObserver = new IntersectionObserver(function (entries) {
        var visibleEntry = entries
          .filter(function (entry) { return entry.isIntersecting; })
          .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];

        if (visibleEntry) {
          setActiveNavLink(visibleEntry.target.id);
        }
      }, {
        root: null,
        threshold: [0.35, 0.55, 0.7],
        rootMargin: "-20% 0px -35% 0px"
      });

      navSections.forEach(function (section) {
        navObserver.observe(section);
      });
    }
  }

  if ("IntersectionObserver" in window) {
    var tlObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          tlObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    tlItems.forEach(function (item) {
      tlObserver.observe(item);
    });
  } else {
    tlItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }
});
