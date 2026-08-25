/**
 * Web Mastro — FAQ accordion
 * One item open at a time. Uses the CSS grid-template-rows 0fr/1fr trick for
 * a smooth height transition without measuring scrollHeight (no forced
 * layout reads), and works identically with or without JS present since the
 * markup itself already contains every answer.
 */
(function (global) {
  'use strict';

  function init() {
    var items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(function (item) {
      var trigger = item.querySelector('.faq-item__trigger');
      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');
        items.forEach(function (other) {
          other.classList.remove('is-open');
          other.querySelector('.faq-item__trigger').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  global.MastroFAQ = { init: init };
})(window);
