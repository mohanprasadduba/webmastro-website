/**
 * Web Mastro — Scroll reveal
 * Generic fade/translate-in for any [data-reveal] element, batched via
 * ScrollTrigger so simultaneous entries stagger naturally. Falls back to an
 * instant, fully visible state without GSAP or under reduced motion.
 */
(function (global) {
  'use strict';

  function showAllInstantly() {
    var els = document.querySelectorAll('[data-reveal]');
    els.forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  function init() {
    if (global.MastroMotion.reduced || !global.gsap || !global.ScrollTrigger) {
      showAllInstantly();
      return;
    }

    global.ScrollTrigger.batch('[data-reveal]', {
      start: 'top 85%',
      once: true,
      onEnter: function (batch) {
        global.gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out'
        });
      }
    });
  }

  global.MastroReveal = { init: init };
})(window);
