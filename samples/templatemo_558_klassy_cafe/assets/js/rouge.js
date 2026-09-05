(function () {
  function initNav() {
    var toggle = document.querySelector('.nav__toggle');
    var menu = document.querySelector('.nav__menu');
    var nav = document.querySelector('.nav');
    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        var open = menu.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          menu.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
    if (nav) {
      var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 20); };
      document.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  function initReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  function initHeroCrossfade() {
    var slides = document.querySelectorAll('.hero__slide');
    if (slides.length < 2) return;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    var index = 0;
    window.setInterval(function () {
      slides[index].classList.remove('is-active');
      index = (index + 1) % slides.length;
      slides[index].classList.add('is-active');
    }, 5500);
  }

  function initTabs() {
    var buttons = document.querySelectorAll('.tabs__btn');
    var panels = document.querySelectorAll('.tabs__panel');
    if (!buttons.length) return;
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-tab');
        buttons.forEach(function (b) { b.classList.toggle('is-active', b === btn); });
        panels.forEach(function (p) { p.classList.toggle('is-active', p.getAttribute('data-panel') === target); });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initReveal();
    initHeroCrossfade();
    initTabs();
  });
})();
