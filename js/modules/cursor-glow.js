/**
 * Web Mastro — ambient cursor trail
 * Desktop / fine-pointer only. A lightweight canvas particle trail, colored
 * from the brand's own flow-gradient tokens, that follows the pointer across
 * the whole page. Particles drift outward with light friction and fade out
 * individually, giving the trail inertia instead of rigid 1:1 tracking.
 * Canvas-drawn (not DOM nodes) so a full trail costs one clear + N cheap
 * arc fills per frame. Never installed on touch devices or under reduced
 * motion.
 */
(function (global) {
  'use strict';

  var MAX_PARTICLES = 45;
  var BASE_RADIUS = 5;
  var LIFE_DECAY = 0.022;
  var FRICTION = 0.96;

  function readBrandColors() {
    var style = getComputedStyle(document.documentElement);
    var names = ['--mastro-blue', '--mastro-purple', '--mastro-magenta', '--mastro-pink', '--mastro-orange', '--mastro-green'];
    return names.map(function (name) {
      var hex = style.getPropertyValue(name).trim() || '#0A82F3';
      var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [10, 130, 243];
    });
  }

  function init() {
    if (!global.MastroMotion.fine || global.MastroMotion.reduced) return;

    var canvas = document.createElement('canvas');
    canvas.className = 'cursor-glow';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    var colors = readBrandColors();
    var colorIndex = 0;
    var dpr = Math.min(global.devicePixelRatio || 1, 2);
    var width = 0;
    var height = 0;

    var resize = function () {
      width = global.innerWidth;
      height = global.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    global.addEventListener('resize', resize);

    var particles = [];
    var last = { x: -100, y: -100 };
    var active = false;

    var spawn = function (x, y) {
      colorIndex = (colorIndex + 1) % colors.length;
      var rgb = colors[colorIndex];
      var angle = Math.random() * Math.PI * 2;
      var speed = 0.2 + Math.random() * 0.6;
      particles.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: BASE_RADIUS * (0.6 + Math.random() * 0.8),
        life: 1,
        decay: LIFE_DECAY * (0.7 + Math.random() * 0.6),
        rgb: rgb
      });
      if (particles.length > MAX_PARTICLES) particles.shift();
    };

    global.addEventListener('mousemove', function (e) {
      var x = e.clientX;
      var y = e.clientY;

      if (!active) {
        active = true;
        canvas.classList.add('is-active');
        last.x = x;
        last.y = y;
      }

      // Interpolate along the move so fast swipes leave a continuous trail
      // instead of sparse dots at each mousemove sample.
      var dx = x - last.x;
      var dy = y - last.y;
      var dist = Math.hypot(dx, dy);
      var steps = Math.max(1, Math.min(3, Math.round(dist / 22)));
      for (var i = 1; i <= steps; i++) {
        var t = i / steps;
        spawn(last.x + dx * t, last.y + dy * t);
      }
      last.x = x;
      last.y = y;
    });

    document.addEventListener('mouseleave', function () {
      active = false;
      canvas.classList.remove('is-active');
    });

    var frame = function () {
      ctx.clearRect(0, 0, width, height);
      for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
        p.life -= p.decay;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= FRICTION;
        p.vy *= FRICTION;

        var radius = p.r * (0.4 + p.life * 0.6);
        var rgb = 'rgb(' + p.rgb[0] + ',' + p.rgb[1] + ',' + p.rgb[2] + ')';

        // Plain alpha-blended paint (no mix-blend-mode) so the true brand
        // color stays visible against both light and dark backgrounds — a
        // soft outer halo plus a solid core gives a glow-like look without
        // depending on what's underneath.
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 2.1, 0, Math.PI * 2);
        ctx.fillStyle = rgb;
        ctx.globalAlpha = p.life * 0.22;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.globalAlpha = p.life;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      global.requestAnimationFrame(frame);
    };

    global.requestAnimationFrame(frame);
  }

  global.MastroCursorGlow = { init: init };
})(window);
