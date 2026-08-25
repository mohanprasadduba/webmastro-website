/**
 * Web Mastro — Final CTA
 * Bookends the hero: the full-color ribbon draws itself again as the
 * visitor approaches the closing section, signalling the end of the
 * vision -> craft -> growth story.
 */
(function (global) {
  'use strict';

  function init() {
    var section = document.querySelector('.final-cta');
    if (!section) return;

    var mount = section.querySelector('.final-cta__ribbon-layer');
    var ribbon = global.MastroRibbon.createRibbonSVG({ strokeWidth: 5, opacity: 0.32 });
    mount.appendChild(ribbon.svg);

    if (global.MastroMotion.reduced || !global.gsap) {
      ribbon.path.style.strokeDashoffset = '0';
      return;
    }

    var length = ribbon.path.getTotalLength();
    ribbon.path.style.strokeDasharray = length;
    ribbon.path.style.strokeDashoffset = length;

    if (global.ScrollTrigger) {
      global.gsap.to(ribbon.path, {
        strokeDashoffset: 0,
        duration: 1.8,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true
        }
      });
    } else {
      ribbon.path.style.strokeDashoffset = '0';
    }
  }

  global.MastroFinalCTA = { init: init };
})(window);
