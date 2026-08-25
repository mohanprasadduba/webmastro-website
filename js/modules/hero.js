/**
 * Web Mastro — Hero
 * Ribbon draw-in + headline reveal on entrance; subtle cursor-driven parallax
 * on desktop only. All effects degrade to a simple fade under reduced motion
 * or on touch devices.
 */
(function (global) {
  'use strict';

  function buildRibbon(hero) {
    var mount = hero.querySelector('.hero__ribbon-layer');
    if (!mount) return null;
    var ribbon = global.MastroRibbon.createRibbonSVG({
      strokeWidth: 5,
      opacity: 0.22,
      stops: global.MastroRibbon.MUTED_STOPS
    });
    mount.appendChild(ribbon.svg);
    return ribbon;
  }

  function initParallax(hero, layer) {
    if (!global.MastroMotion.fine || global.MastroMotion.reduced) return;

    var state = { x: 0, y: 0, cx: 0, cy: 0 };
    var raf = null;

    var loop = function () {
      state.cx += (state.x - state.cx) * 0.06;
      state.cy += (state.y - state.cy) * 0.06;
      layer.style.transform =
        'translate3d(' + state.cx + 'px,' + state.cy + 'px,0) scale(1.04)';
      raf = global.requestAnimationFrame(loop);
    };

    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      var relX = (e.clientX - rect.left) / rect.width - 0.5;
      var relY = (e.clientY - rect.top) / rect.height - 0.5;
      state.x = relX * 36;
      state.y = relY * 24;
    });

    hero.addEventListener('mouseleave', function () {
      state.x = 0;
      state.y = 0;
    });

    raf = global.requestAnimationFrame(loop);
  }

  function init() {
    var hero = document.querySelector('.hero');
    if (!hero) return;

    var ribbon = buildRibbon(hero);
    var layer = hero.querySelector('.hero__ribbon-layer');

    var lines = hero.querySelectorAll('.hero__headline .reveal-line > span');
    var sub = hero.querySelector('.hero__sub');
    var actions = hero.querySelector('.hero__actions');
    var scrollIndicator = hero.querySelector('.hero__scroll');

    if (global.MastroMotion.reduced || !global.gsap) {
      [sub, actions, scrollIndicator].forEach(function (el) {
        if (el) { el.style.opacity = '1'; el.style.transform = 'none'; }
      });
      lines.forEach(function (el) { el.style.transform = 'none'; });
      if (ribbon) { ribbon.path.style.strokeDashoffset = '0'; }
      return;
    }

    var gsap = global.gsap;

    if (ribbon) {
      var length = ribbon.path.getTotalLength();
      ribbon.path.style.strokeDasharray = length;
      ribbon.path.style.strokeDashoffset = length;
    }

    gsap.set(lines, { yPercent: 110 });
    gsap.set([sub, actions, scrollIndicator], { opacity: 0, y: 16 });

    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (ribbon) {
      tl.to(ribbon.path, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' }, 0);
    }
    tl.to(lines, { yPercent: 0, duration: 0.9, stagger: 0.12 }, 0.1)
      .to(sub, { opacity: 1, y: 0, duration: 0.6 }, 0.55)
      .to(actions, { opacity: 1, y: 0, duration: 0.6 }, 0.68)
      .to(scrollIndicator, { opacity: 1, y: 0, duration: 0.6 }, 0.8);

    if (layer) initParallax(hero, layer);
  }

  global.MastroHero = { init: init };
})(window);
