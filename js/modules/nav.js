/**
 * Web Mastro — Navigation
 * Scroll-state styling + mobile menu toggle. No animation library dependency
 * so it works even before GSAP/Lenis finish loading.
 */
(function (global) {
  'use strict';

  function init() {
    var nav = document.querySelector('.nav');
    if (!nav) return;

    var toggle = nav.querySelector('.nav__toggle');
    var mobile = document.querySelector('.nav__mobile');
    var mobileLinks = mobile ? mobile.querySelectorAll('a') : [];

    var setScrolled = function () {
      var scrolled = (global.scrollY || window.pageYOffset || 0) > 24;
      nav.classList.toggle('is-scrolled', scrolled);
    };
    setScrolled();
    global.addEventListener('scroll', setScrolled, { passive: true });

    var closeMobile = function (opts) {
      if (!mobile) return;
      var wasOpen = mobile.classList.contains('is-open');
      mobile.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
      toggle.setAttribute('aria-expanded', 'false');
      if (wasOpen && (!opts || opts.restoreFocus !== false)) {
        toggle.focus();
      }
    };

    var openMobile = function () {
      if (!mobile) return;
      mobile.classList.add('is-open');
      document.body.classList.add('no-scroll');
      toggle.setAttribute('aria-expanded', 'true');
      if (mobileLinks.length) mobileLinks[0].focus();
    };

    if (toggle && mobile) {
      toggle.addEventListener('click', function () {
        var isOpen = mobile.classList.contains('is-open');
        isOpen ? closeMobile() : openMobile();
      });
      mobileLinks.forEach(function (link) {
        link.addEventListener('click', function () { closeMobile({ restoreFocus: false }); });
      });
      global.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMobile();
      });
    }

    // Scrollspy: highlight the nav link for the section in view.
    var sections = Array.prototype.slice.call(document.querySelectorAll('[data-nav-section]'));
    var links = Array.prototype.slice.call(nav.querySelectorAll('.nav__link'));
    if (sections.length && links.length && 'IntersectionObserver' in global) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.getAttribute('data-nav-section');
          links.forEach(function (link) {
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
          });
        });
      }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
      sections.forEach(function (section) { observer.observe(section); });
    }
  }

  global.MastroNav = { init: init };
})(window);
