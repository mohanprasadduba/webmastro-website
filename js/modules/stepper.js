/**
 * Web Mastro — Stepper
 * Drives a scroll-scrubbed gradient line + step activation for any
 * [data-stepper] container (used by the Process stages and the two
 * horizontal journey timelines). Add the `stepper--horizontal` class to
 * lay steps out in a row on desktop (≥900px) — that breakpoint is the
 * same one the CSS uses, so the two stay in sync. Falls back to a
 * fully-filled, fully-active state without GSAP/ScrollTrigger or under
 * reduced motion, so the content order alone still communicates the
 * sequence.
 */
(function (global) {
  'use strict';

  var desktopQuery = global.matchMedia('(min-width: 900px)');

  function isHorizontal(root) {
    return root.classList.contains('stepper--horizontal') && desktopQuery.matches;
  }

  function fallback(root) {
    var fill = root.querySelector('.stepper__track-fill');
    if (fill) {
      fill.style.height = '100%';
      fill.style.width = '100%';
    }
    root.querySelectorAll('.stepper__step').forEach(function (step) {
      step.classList.add('is-active');
    });
  }

  function initOne(root) {
    var fill = root.querySelector('.stepper__track-fill');
    var steps = Array.prototype.slice.call(root.querySelectorAll('.stepper__step'));
    if (!fill || !steps.length) return;

    global.ScrollTrigger.create({
      trigger: root,
      start: 'top 75%',
      end: 'bottom 55%',
      scrub: 0.6,
      onUpdate: function (self) {
        var progress = self.progress;
        if (isHorizontal(root)) {
          fill.style.width = (progress * 100) + '%';
          fill.style.height = '100%';
        } else {
          fill.style.height = (progress * 100) + '%';
          fill.style.width = '100%';
        }
        steps.forEach(function (step, i) {
          var threshold = i / (steps.length - 1);
          step.classList.toggle('is-active', progress >= threshold - 0.02);
        });
      }
    });
  }

  function init() {
    var roots = document.querySelectorAll('[data-stepper]');
    if (!roots.length) return;

    if (global.MastroMotion.reduced || !global.gsap || !global.ScrollTrigger) {
      roots.forEach(fallback);
      return;
    }

    roots.forEach(initOne);
  }

  global.MastroStepper = { init: init };
})(window);
