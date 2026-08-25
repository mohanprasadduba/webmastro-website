/**
 * Web Mastro — Motion preference detection.
 * Single source of truth other modules branch on.
 */
(function (global) {
  'use strict';

  var reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var coarseQuery = window.matchMedia('(hover: none), (pointer: coarse)');

  global.MastroMotion = {
    get reduced() { return reducedQuery.matches; },
    get coarse() { return coarseQuery.matches; },
    get fine() { return !coarseQuery.matches; }
  };
})(window);
