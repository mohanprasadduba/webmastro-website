/**
 * Web Mastro — Theme toggle
 *
 * The initial theme (light/dark) is decided by a tiny inline script at the
 * very top of <head> in every page — see index.html for the exact logic —
 * so the correct `data-theme` attribute is already on <html> before this
 * file even loads, avoiding a flash of the wrong theme. This module only
 * has to: sync the toggle button's label to whatever theme is active, and
 * handle clicks.
 *
 * Always time-of-day based (light 6am–6pm, dark otherwise), recomputed on
 * every load — a manual toggle click only affects the current view and is
 * not persisted, so a refresh or a fresh visit always resets to the
 * time-of-day default.
 */
(function (global) {
  'use strict';

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function syncButton(btn, theme) {
    var goingTo = theme === 'dark' ? 'light' : 'dark';
    btn.setAttribute('aria-label', 'Switch to ' + goingTo + ' mode');
    btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }

  function init() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;

    syncButton(btn, currentTheme());

    btn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      syncButton(btn, next);
    });
  }

  global.MastroTheme = { init: init };
})(window);
