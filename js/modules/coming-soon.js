/**
 * Web Mastro — Coming Soon gate
 *
 * Blocks the site behind a full-screen countdown overlay until launch
 * (2026-08-24 12:10 IST). The rest of the page still boots normally
 * underneath — this only sits on top visually and blocks interaction —
 * so once the countdown ends we just fade the overlay away rather than
 * having to re-run any startup logic. Once launch has passed, the gate
 * removes itself immediately on load and never shows again.
 */
(function (global) {
  'use strict';

  var LAUNCH_AT = new Date('2026-08-25T16:50:00+05:30').getTime();

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function render(overlay, ms) {
    var totalSeconds = Math.max(0, Math.floor(ms / 1000));
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    overlay.querySelector('[data-unit="days"]').textContent = pad(days);
    overlay.querySelector('[data-unit="hours"]').textContent = pad(hours);
    overlay.querySelector('[data-unit="minutes"]').textContent = pad(minutes);
    overlay.querySelector('[data-unit="seconds"]').textContent = pad(seconds);
  }

  function reveal(overlay) {
    overlay.classList.add('is-hidden');
    document.body.style.overflow = '';
    var main = document.getElementById('main');
    if (main) main.removeAttribute('inert');
    global.setTimeout(function () {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 700);
  }

  function init() {
    var overlay = document.getElementById('coming-soon');
    if (!overlay) return;

    var remaining = LAUNCH_AT - Date.now();
    if (remaining <= 0) {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      return;
    }

    document.body.style.overflow = 'hidden';
    var main = document.getElementById('main');
    if (main) main.setAttribute('inert', '');

    render(overlay, remaining);
    var timer = global.setInterval(function () {
      var left = LAUNCH_AT - Date.now();
      if (left <= 0) {
        global.clearInterval(timer);
        render(overlay, 0);
        reveal(overlay);
        return;
      }
      render(overlay, left);
    }, 1000);
  }

  global.MastroComingSoon = { init: init };
})(window);
