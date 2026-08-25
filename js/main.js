/**
 * Web Mastro — main entry point.
 * Wires up smooth scroll, GSAP/ScrollTrigger, preloader and section modules.
 * Kept dependency-light: modules attach themselves to window and are called
 * explicitly here rather than through a bundler.
 */
(function (global) {
  'use strict';

  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  var lenis = null;

  function initSmoothScroll() {
    if (global.MastroMotion.reduced || !global.Lenis) return null;
    var instance = new global.Lenis({
      duration: 1.1,
      easing: function (t) { return 1 - Math.pow(1 - t, 3); },
      smoothWheel: true
    });

    if (global.gsap && global.gsap.ticker) {
      global.gsap.ticker.add(function (time) {
        instance.raf(time * 1000);
      });
      global.gsap.ticker.lagSmoothing(0);
    } else {
      var raf = function (time) {
        instance.raf(time);
        global.requestAnimationFrame(raf);
      };
      global.requestAnimationFrame(raf);
    }

    if (global.ScrollTrigger) {
      instance.on('scroll', global.ScrollTrigger.update);
    }

    return instance;
  }

  function initGSAP() {
    if (!global.gsap || !global.ScrollTrigger) return;
    global.gsap.registerPlugin(global.ScrollTrigger);
  }

  function initAnchorLinks() {
    var links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href');
        if (!id || id === '#') return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(target, { offset: -90 });
        } else {
          target.scrollIntoView({ behavior: global.MastroMotion.reduced ? 'auto' : 'smooth', block: 'start' });
        }
      });
    });
  }

  function initDecorativeRibbons() {
    var mount = document.getElementById('first-projects-ribbon');
    if (!mount || !global.MastroRibbon) return;
    var ribbon = global.MastroRibbon.createRibbonSVG({ strokeWidth: 7, opacity: 0.9 });
    ribbon.path.style.strokeDashoffset = '0';
    mount.appendChild(ribbon.svg);
  }

  /**
   * Mounts a ribbon into `mountSelector` within `section` and draws it in as
   * the section scrolls into view — the same background treatment used by
   * the Final CTA and Contact sections. Shared here rather than duplicated
   * per-section since it's now used by more than two sections.
   */
  function initSectionRibbon(section, mountSelector, opacity) {
    if (!section || !global.MastroRibbon) return;
    var mount = section.querySelector(mountSelector);
    if (!mount) return;

    var ribbon = global.MastroRibbon.createRibbonSVG({ strokeWidth: 5, opacity: opacity });
    mount.appendChild(ribbon.svg);

    if (global.MastroMotion.reduced || !global.gsap) {
      ribbon.path.style.strokeDashoffset = '0';
      return;
    }

    var length = ribbon.path.getTotalLength();
    ribbon.path.style.strokeDasharray = length;
    ribbon.path.style.strokeDashoffset = length;

    if (global.ScrollTrigger) {
      global.gsap.to(ribbon.path, {
        strokeDashoffset: 0,
        duration: 1.8,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: section, start: 'top 80%', once: true }
      });
    } else {
      ribbon.path.style.strokeDashoffset = '0';
    }
  }

  function boot() {
    initGSAP();
    lenis = initSmoothScroll();

    global.MastroComingSoon && global.MastroComingSoon.init();
    global.MastroTheme && global.MastroTheme.init();
    global.MastroNav && global.MastroNav.init();
    global.MastroCursor && global.MastroCursor.init();
    global.MastroCursorGlow && global.MastroCursorGlow.init();
    global.MastroMagnetic && global.MastroMagnetic.init();
    global.MastroHero && global.MastroHero.init();
    global.MastroFinalCTA && global.MastroFinalCTA.init();
    global.MastroFooter && global.MastroFooter.init();
    global.MastroContact && global.MastroContact.init();
    initDecorativeRibbons();
    initSectionRibbon(document.querySelector('.advantages-section'), '.advantages-section__ribbon-layer', 0.26);
    initSectionRibbon(document.querySelector('.about-section'), '.about-section__ribbon-layer', 0.26);
    global.MastroReveal && global.MastroReveal.init();
    initAnchorLinks();

    if (global.MastroStepper) {
      // Steppers use ScrollTrigger directly, so wire them up after it's registered.
      global.MastroStepper.init();
    }

    if (global.ScrollTrigger) {
      global.ScrollTrigger.refresh();
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (global.MastroPreloader) {
      global.MastroPreloader.init(boot);
    } else {
      boot();
    }
  });
})(window);
