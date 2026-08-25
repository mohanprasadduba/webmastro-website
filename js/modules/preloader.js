/**
 * Web Mastro — Preloader
 * Draws the abstracted ribbon spine, reveals wordmark + tagline, then hands
 * off to the provided onComplete callback. Skips animation entirely under
 * prefers-reduced-motion, and shortens if the page was already cached/fast.
 */
(function (global) {
  'use strict';

  function init(onComplete) {
    var root = document.querySelector('.preloader');
    if (!root) { onComplete && onComplete(); return; }

    var ribbonMount = root.querySelector('.preloader__ribbon');
    var ribbon = global.MastroRibbon.createRibbonSVG({ strokeWidth: 14 });
    ribbonMount.appendChild(ribbon.svg);

    var word = root.querySelector('.preloader__word');
    var tagline = root.querySelector('.preloader__tagline');
    var barFill = root.querySelector('.preloader__bar-fill');

    var finish = function () {
      root.classList.add('is-done');
      document.body.classList.remove('no-scroll');
      root.addEventListener('transitionend', function handler(e) {
        if (e.target !== root) return;
        root.removeEventListener('transitionend', handler);
        root.remove();
      });
      root.style.transition = 'opacity ' + (global.MastroMotion.reduced ? '1ms' : '600ms') + ' ease';
      root.style.opacity = '0';
      onComplete && onComplete();
    };

    if (global.MastroMotion.reduced || !global.gsap) {
      finish();
      return;
    }

    document.body.classList.add('no-scroll');

    var length = ribbon.path.getTotalLength();
    ribbon.path.style.strokeDasharray = length;
    ribbon.path.style.strokeDashoffset = length;

    var tl = global.gsap.timeline({
      defaults: { ease: global.MastroEase || 'power3.out' },
      onComplete: finish
    });

    tl.to(ribbon.path, {
      strokeDashoffset: 0,
      duration: 0.9,
      ease: 'power2.inOut'
    })
      .to(barFill, { width: '100%', duration: 0.9, ease: 'power2.inOut' }, '<')
      .to(word, { opacity: 1, y: 0, duration: 0.4 }, '-=0.25')
      .to(tagline, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
      .to(root, {}, '+=0.15'); // brief hold so the reveal registers before exit

    // Safety timeout: never block the visitor longer than ~1.8s total.
    global.setTimeout(function () {
      if (!root.classList.contains('is-done')) {
        tl.progress(1);
      }
    }, 1800);
  }

  global.MastroPreloader = { init: init };
})(window);
