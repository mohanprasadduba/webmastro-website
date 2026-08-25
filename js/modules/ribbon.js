/**
 * Web Mastro — Ribbon motif
 * Shared abstracted "Mastro Flow" spine path used across the preloader, hero,
 * section dividers, CTA background and footer watermark. This is a deliberate
 * abstraction of the logo's flow gesture (vision -> craft -> growth), not a
 * literal redraw of the logo artwork.
 */
(function (global) {
  'use strict';

  // Single canonical spine, viewBox 0 0 1200 400. Reused at any scale.
  var RIBBON_VIEWBOX = '0 0 1200 400';
  var RIBBON_PATH_D =
    'M 60 70 ' +
    'C 160 70 230 340 330 340 ' +
    'C 430 340 400 70 470 70 ' +
    'C 540 70 560 230 620 230 ' +
    'C 680 230 700 100 760 100 ' +
    'C 900 100 1020 330 1140 330';

  var FLOW_STOPS = [
    { offset: '0%', color: '#0A82F3' },
    { offset: '25%', color: '#5224D6' },
    { offset: '45%', color: '#B11BAB' },
    { offset: '60%', color: '#F13063' },
    { offset: '80%', color: '#F4AA0A' },
    { offset: '100%', color: '#80BE10' }
  ];

  // Restrained two-tone variant for large background/watermark placements,
  // where the full six-stop rainbow would compete with foreground content.
  var MUTED_STOPS = [
    { offset: '0%', color: '#0A82F3' },
    { offset: '100%', color: '#5224D6' }
  ];

  var gradientCount = 0;

  function svgEl(tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var key in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, key)) {
        el.setAttribute(key, attrs[key]);
      }
    }
    return el;
  }

  /**
   * Builds a standalone <svg> containing the Mastro Flow spine stroked with
   * the brand gradient. Returns { svg, path, gradientId } so callers can
   * drive stroke-dasharray draw-in animation with GSAP.
   */
  function createRibbonSVG(options) {
    options = options || {};
    var strokeWidth = options.strokeWidth || 10;
    var opacity = options.opacity != null ? options.opacity : 1;
    var className = options.className || '';
    var stops = options.stops || FLOW_STOPS;
    var gradientId = 'mastro-flow-grad-' + (gradientCount++);

    var svg = svgEl('svg', {
      viewBox: RIBBON_VIEWBOX,
      class: 'ribbon-svg' + (className ? ' ' + className : ''),
      'aria-hidden': 'true',
      focusable: 'false',
      preserveAspectRatio: options.preserveAspectRatio || 'xMidYMid meet'
    });

    var defs = svgEl('defs', {});
    var gradient = svgEl('linearGradient', {
      id: gradientId,
      x1: '0%', y1: '0%', x2: '100%', y2: '0%'
    });
    stops.forEach(function (stop) {
      gradient.appendChild(svgEl('stop', { offset: stop.offset, 'stop-color': stop.color }));
    });
    defs.appendChild(gradient);
    svg.appendChild(defs);

    var path = svgEl('path', {
      d: RIBBON_PATH_D,
      fill: 'none',
      stroke: 'url(#' + gradientId + ')',
      'stroke-width': strokeWidth,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      opacity: opacity
    });
    svg.appendChild(path);

    return { svg: svg, path: path, gradientId: gradientId };
  }

  global.MastroRibbon = {
    VIEWBOX: RIBBON_VIEWBOX,
    PATH_D: RIBBON_PATH_D,
    FLOW_STOPS: FLOW_STOPS,
    MUTED_STOPS: MUTED_STOPS,
    createRibbonSVG: createRibbonSVG
  };
})(window);
