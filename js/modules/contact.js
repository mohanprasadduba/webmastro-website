/**
 * Web Mastro — Contact form
 *
 * INTEGRATION POINT: set ENDPOINT to a real form backend / email service
 * (e.g. Formspree, a serverless function, your own API) before launch. Until
 * it's set, submissions are intentionally NOT faked as successful — the spec
 * this site was built against explicitly forbids showing a fake success
 * state when no backend exists, so the form instead reports an honest
 * "not connected yet" error rather than pretending to send.
 *
 * Currently wired to a Google Apps Script Web App that appends each
 * submission as a row in a Google Sheet (see project notes for the script).
 * Apps Script Web Apps don't send back a browser-readable CORS response, so
 * the request has to go out with mode:'no-cors' — that makes the response
 * opaque (status/body unreadable), so success is inferred from the fetch
 * promise resolving rather than from res.ok. If ENDPOINT is later swapped
 * for a backend that returns real CORS headers (Formspree, a custom API),
 * set ENDPOINT_NO_CORS to false to get real success/failure detection back.
 */
(function (global) {
  'use strict';

  var ENDPOINT = 'https://script.google.com/macros/s/AKfycbyX-p6jdZpR_dXWPIwX85PJQZUp_EgNiTBrSAd0m-3N6THptX91zVx2nd75V6PgQaxTZw/exec';
  var ENDPOINT_NO_CORS = true;

  function setState(form, state, message) {
    var status = form.querySelector('.contact-form__status');
    var submitBtn = form.querySelector('.contact-form__submit-btn');

    form.setAttribute('data-form-state', state);
    submitBtn.disabled = state === 'submitting';
    submitBtn.textContent = state === 'submitting' ? 'Sending…' : 'Send Message';

    if (status) {
      status.textContent = message || '';
      status.setAttribute('data-state', state);
    }

    if (state === 'success') {
      form.classList.add('is-success');
      var successPanel = form.parentElement.querySelector('.contact-form__success');
      if (successPanel) successPanel.classList.add('is-visible');
    }
  }

  function handleSubmit(form) {
    return function (e) {
      e.preventDefault();
      form.classList.add('was-validated');

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      setState(form, 'submitting');

      if (!ENDPOINT || ENDPOINT === 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
        global.setTimeout(function () {
          setState(form, 'error', "This form isn't connected to a backend yet — please try again soon.");
        }, 500);
        return;
      }

      var data = new FormData(form);
      var fetchOptions = { method: 'POST', body: data };
      if (ENDPOINT_NO_CORS) {
        fetchOptions.mode = 'no-cors';
      } else {
        fetchOptions.headers = { Accept: 'application/json' };
      }

      fetch(ENDPOINT, fetchOptions)
        .then(function (res) {
          if (ENDPOINT_NO_CORS || res.ok) {
            setState(form, 'success');
          } else {
            setState(form, 'error', 'Something went wrong. Please try again.');
          }
        })
        .catch(function () {
          setState(form, 'error', 'Something went wrong. Please try again.');
        });
    };
  }

  function initRibbon(section) {
    var mount = section.querySelector('.contact-section__ribbon-layer');
    if (!mount || !global.MastroRibbon) return;

    var ribbon = global.MastroRibbon.createRibbonSVG({ strokeWidth: 5, opacity: 0.26 });
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
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true
        }
      });
    } else {
      ribbon.path.style.strokeDashoffset = '0';
    }
  }

  function init() {
    var section = document.querySelector('.contact-section');
    if (section) initRibbon(section);

    var form = document.querySelector('.contact-form');
    if (!form) return;
    form.addEventListener('submit', handleSubmit(form));
  }

  global.MastroContact = { init: init };
})(window);
