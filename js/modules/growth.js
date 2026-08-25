/**
 * Web Mastro — Growth / SEO visual
 * Animates the illustrative indicator bars once the panel scrolls into view.
 * Purely conceptual — values are fixed decorative targets, not measured
 * data, and the panel is captioned as such in the markup.
 */
(function (global) {
  'use strict';

  function playRow(row) {
    var fill = row.querySelector('.seo-visual__row-fill');
    var target = row.getAttribute('data-target') || '80';
    if (global.gsap && !global.MastroMotion.reduced) {
      global.gsap.to(fill, { width: target + '%', duration: 1, ease: 'power2.out' });
    } else {
      fill.style.width = target + '%';
    }
    global.setTimeout(function () {
      row.classList.add('is-done');
    }, global.MastroMotion.reduced ? 0 : 500);
  }

  function init() {
    var panel = document.querySelector('.seo-visual');
    if (!panel) return;
    var rows = Array.prototype.slice.call(panel.querySelectorAll('.seo-visual__row'));

    if (!('IntersectionObserver' in global)) {
      rows.forEach(playRow);
      return;
    }

    var played = false;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || played) return;
        played = true;
        rows.forEach(function (row, i) {
          global.setTimeout(function () { playRow(row); }, i * 140);
        });
        observer.disconnect();
      });
    }, { threshold: 0.4 });

    observer.observe(panel);
  }

  global.MastroGrowth = { init: init };
})(window);
