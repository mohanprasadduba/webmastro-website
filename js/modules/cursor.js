/**
 * Web Mastro — Custom cursor
 * Desktop / fine-pointer only. Expands over elements tagged with
 * data-cursor="cta" | "view" | "drag" and shrinks to a dot elsewhere.
 * Never installed on touch devices or under reduced motion.
 */
(function (global) {
  'use strict';

  function init() {
    if (!global.MastroMotion.fine || global.MastroMotion.reduced) return;

    var el = document.createElement('div');
    el.className = 'cursor';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<span class="cursor__label"></span>';
    document.body.appendChild(el);
    document.documentElement.classList.add('has-custom-cursor');

    var label = el.querySelector('.cursor__label');
    var pos = { x: -100, y: -100 };
    var target = { x: -100, y: -100 };

    var move = function () {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      el.style.transform = 'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)';
      global.requestAnimationFrame(move);
    };

    global.addEventListener('mousemove', function (e) {
      target.x = e.clientX;
      target.y = e.clientY;
    });

    document.addEventListener('mouseleave', function () {
      el.classList.add('is-hidden');
    });
    document.addEventListener('mouseenter', function () {
      el.classList.remove('is-hidden');
    });

    var labels = { cta: '', view: 'VIEW', drag: 'DRAG' };

    document.addEventListener('mouseover', function (e) {
      var hovered = e.target.closest ? e.target.closest('[data-cursor]') : null;
      if (!hovered) return;
      var type = hovered.getAttribute('data-cursor');
      el.classList.add('is-' + type);
      label.textContent = labels[type] || '';
    });

    document.addEventListener('mouseout', function (e) {
      var hovered = e.target.closest ? e.target.closest('[data-cursor]') : null;
      if (!hovered) return;
      var type = hovered.getAttribute('data-cursor');
      el.classList.remove('is-' + type);
      label.textContent = '';
    });

    global.requestAnimationFrame(move);
  }

  global.MastroCursor = { init: init };
})(window);
