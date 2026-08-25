/**
 * Web Mastro — Work Samples live previews
 *
 * Each .ws-card__preview holds an iframe fixed at a real desktop viewport
 * size (1440x900 — see work-samples.css) so the embedded site always lays
 * out the way it actually does on desktop, never a stretched/emptier
 * version. This module scales that fixed-size iframe down to fit whatever
 * width the card box actually has, recalculating on resize.
 */
(function (global) {
  'use strict';

  var BASE_WIDTH = 1440;

  function fit(preview) {
    var iframe = preview.querySelector('iframe');
    if (!iframe) return;
    var scale = preview.clientWidth / BASE_WIDTH;
    iframe.style.transform = 'scale(' + scale + ')';
  }

  function init() {
    var previews = document.querySelectorAll('.ws-card__preview');
    if (!previews.length) return;

    previews.forEach(fit);

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        previews.forEach(fit);
      }, 150);
    });
  }

  global.MastroWorkSamples = { init: init };
})(window);
