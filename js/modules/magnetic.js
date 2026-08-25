/**
 * Web Mastro — Magnetic buttons
 * Subtle pull toward the cursor (max ~10px) on elements with
 * [data-magnetic]. Desktop / fine-pointer only.
 */
(function (global) {
  'use strict';

  var MAX_PULL = 10;

  function bind(el) {
    var quickX, quickY;
    if (global.gsap) {
      quickX = global.gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
      quickY = global.gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    }

    el.addEventListener('mousemove', function (e) {
      var rect = el.getBoundingClientRect();
      var relX = (e.clientX - rect.left) / rect.width - 0.5;
      var relY = (e.clientY - rect.top) / rect.height - 0.5;
      var x = relX * MAX_PULL * 2;
      var y = relY * MAX_PULL * 2;
      if (quickX) {
        quickX(x);
        quickY(y);
      } else {
        el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      }
    });

    el.addEventListener('mouseleave', function () {
      if (quickX) {
        quickX(0);
        quickY(0);
      } else {
        el.style.transform = '';
      }
    });
  }

  function init() {
    if (!global.MastroMotion.fine || global.MastroMotion.reduced) return;
    var els = document.querySelectorAll('[data-magnetic]');
    els.forEach(bind);
  }

  global.MastroMagnetic = { init: init };
})(window);
