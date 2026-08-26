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

  /**
   * "Shatter" slideshow — a lightweight CSS/GSAP approximation of the
   * classic WebGL image-transition effect (tiles flying apart to reveal
   * the next image), built from plain divs sliced from the source images
   * via background-position (the CSS sprite technique), no WebGL/extra
   * image assets needed. Each transition:
   *  - builds a COLS x ROWS grid of tiles for the outgoing image and
   *    another for the incoming image, both appended to .hero__visual-shatter
   *  - flies the outgoing tiles outward from the box's center with a
   *    per-column stagger, fading/scaling them out
   *  - simultaneously flies the incoming tiles in from the mirrored
   *    scattered position, with the stagger running in the opposite
   *    column direction, fading/scaling them up to their resting spot
   *  - once both animations finish, swaps which base <img> is
   *    .is-active and empties the tile layer
   * Background-size/position for every tile is computed the same way
   * object-fit:cover would scale the source image, so the tiles line up
   * pixel-for-pixel with how the plain <img> normally renders — plain
   * stretch-to-box-size would visibly distort images whose aspect ratio
   * doesn't match the box's.
   */
  function initVisualSlideshow(hero) {
    var box = hero.querySelector('.hero__visual-box');
    var flip = hero.querySelector('.hero__visual-flip');
    var shatterLayer = hero.querySelector('.hero__visual-shatter');
    if (!box || !flip || !shatterLayer) return;

    var images = flip.querySelectorAll('img');
    if (images.length < 2 || global.MastroMotion.reduced || !global.gsap) return;

    var gsap = global.gsap;
    var COLS = 8;
    var ROWS = 5;
    var index = 0;
    var running = false;

    function buildTiles(img) {
      var boxW = box.clientWidth;
      var boxH = box.clientHeight;
      var natW = img.naturalWidth || boxW;
      var natH = img.naturalHeight || boxH;
      var scale = Math.max(boxW / natW, boxH / natH);
      var renderedW = natW * scale;
      var renderedH = natH * scale;
      var offsetX = (boxW - renderedW) / 2;
      var offsetY = (boxH - renderedH) / 2;

      var tileW = boxW / COLS;
      var tileH = boxH / ROWS;
      var src = img.currentSrc || img.src;
      var tiles = [];

      for (var row = 0; row < ROWS; row++) {
        for (var col = 0; col < COLS; col++) {
          var tileX = col * tileW;
          var tileY = row * tileH;
          var tile = document.createElement('div');
          tile.className = 'hero__shatter-tile';
          tile.style.width = tileW + 'px';
          tile.style.height = tileH + 'px';
          tile.style.backgroundImage = 'url("' + src + '")';
          tile.style.backgroundSize = renderedW + 'px ' + renderedH + 'px';
          tile.style.backgroundPosition = (offsetX - tileX) + 'px ' + (offsetY - tileY) + 'px';
          shatterLayer.appendChild(tile);
          // Establish GSAP's own baseline transform up front so every
          // later .to()/.set() call can use plain absolute x/y values
          // instead of relying on GSAP to parse a manually-set inline
          // transform or on relative '+=' offsets.
          gsap.set(tile, { x: tileX, y: tileY });
          tiles.push({ el: tile, col: col, baseX: tileX, baseY: tileY });
        }
      }
      return tiles;
    }

    function scatter(t) {
      var nx = COLS > 1 ? t.col / (COLS - 1) - 0.5 : 0;
      var ny = Math.random() - 0.5;
      return {
        x: t.baseX + nx * box.clientWidth * 1.15 + (Math.random() - 0.5) * 60,
        y: t.baseY + ny * box.clientHeight * 1.15,
        rotation: (Math.random() - 0.5) * 50
      };
    }

    function transition() {
      if (running) return;
      running = true;

      var outImg = images[index];
      var nextIndex = (index + 1) % images.length;
      var inImg = images[nextIndex];

      var outTiles = buildTiles(outImg);
      var inTiles = buildTiles(inImg);

      outImg.style.opacity = '0';
      inImg.style.opacity = '0';

      var maxDelay = 0.3;
      var dur = 0.7;

      outTiles.forEach(function (t) {
        var target = scatter(t);
        var delay = (t.col / (COLS - 1)) * maxDelay + Math.random() * 0.1;
        gsap.to(t.el, {
          x: target.x, y: target.y, rotation: target.rotation,
          opacity: 0, scale: 0.4,
          duration: dur, delay: delay, ease: 'power1.in'
        });
      });

      inTiles.forEach(function (t) {
        var start = scatter(t);
        var delay = (1 - t.col / (COLS - 1)) * maxDelay + Math.random() * 0.1;
        gsap.set(t.el, { x: start.x, y: start.y, rotation: start.rotation, opacity: 0, scale: 0.4 });
        gsap.to(t.el, {
          x: t.baseX, y: t.baseY, rotation: 0, opacity: 1, scale: 1,
          duration: dur, delay: delay, ease: 'power2.out'
        });
      });

      global.setTimeout(function () {
        outImg.classList.remove('is-active');
        inImg.classList.add('is-active');
        outImg.style.opacity = '';
        inImg.style.opacity = '';
        shatterLayer.innerHTML = '';
        index = nextIndex;
        running = false;
      }, (maxDelay + 0.1 + dur) * 1000);
    }

    global.setInterval(transition, 4500);
  }

  function init() {
    var hero = document.querySelector('.hero');
    if (!hero) return;

    initVisualSlideshow(hero);

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
