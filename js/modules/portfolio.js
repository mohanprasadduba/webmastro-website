/**
 * Web Mastro — Selected Work
 * Placeholder project visuals get a restrained ribbon mark plus a subtle
 * scroll-scale so the section doesn't feel static, without pretending the
 * abstract panels are real project screenshots.
 */
(function (global) {
  'use strict';

  function buildRibbons() {
    var mounts = document.querySelectorAll('.portfolio-item__visual-ribbon');
    mounts.forEach(function (mount) {
      var ribbon = global.MastroRibbon.createRibbonSVG({
        strokeWidth: 7,
        opacity: 0.7,
        stops: global.MastroRibbon.MUTED_STOPS
      });
      ribbon.path.style.strokeDashoffset = '0';
      mount.appendChild(ribbon.svg);
    });
  }

  function initScale() {
    if (global.MastroMotion.reduced || !global.gsap || !global.ScrollTrigger) return;
    var visuals = document.querySelectorAll('.portfolio-item__visual');
    visuals.forEach(function (visual) {
      global.gsap.fromTo(visual, { scale: 0.94 }, {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: visual,
          start: 'top 90%',
          end: 'top 40%',
          scrub: 0.6
        }
      });
    });
  }

  function init() {
    if (!document.querySelector('.portfolio-section')) return;
    buildRibbons();
    initScale();
  }

  global.MastroPortfolio = { init: init };
})(window);
