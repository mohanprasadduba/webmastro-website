/**
 * Web Mastro — Footer watermark
 * Large, faint, static ribbon behind the footer content. Purely decorative,
 * so it renders once with no scroll/cursor logic attached.
 */
(function (global) {
  'use strict';

  function init() {
    var mount = document.querySelector('.site-footer__watermark');
    if (!mount || !global.MastroRibbon) return;
    var ribbon = global.MastroRibbon.createRibbonSVG({
      strokeWidth: 4,
      opacity: 0.08,
      stops: global.MastroRibbon.MUTED_STOPS
    });
    ribbon.path.style.strokeDashoffset = '0';
    mount.appendChild(ribbon.svg);
  }

  global.MastroFooter = { init: init };
})(window);
