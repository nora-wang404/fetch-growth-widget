/**
 * Fetch Pet Insurance Cost Estimator Widget
 * Floating button → calculator panel. Plain JS, no frameworks.
 */
(function () {
  'use strict';

  function track(event, data) {
    if (data !== undefined) {
      console.log('[FetchWidget]', event, data);
    } else {
      console.log('[FetchWidget]', event);
    }
  }

  function estimatePremium(petType, breedSize, petAge, gender) {
    var base = petType === 'dog' ? 28 : 20;
    var sizeMod = { small: 0, medium: 5, large: 12 }[breedSize] || 0;
    var ageMod = petAge <= 3 ? 0 : petAge <= 6 ? 4 : 10;
    var genderMod = gender === 'boy' ? 2 : 0;
    var mid = base + sizeMod + ageMod + genderMod;
    var low = Math.round(mid * 0.85);
    var high = Math.round(mid * 1.2);
    low = Math.max(18, low);
    high = Math.min(80, high);
    return { low: low, high: high };
  }

  function loadStyles() {
    var scripts = document.getElementsByTagName('script');
    var src = '';
    for (var i = 0; i < scripts.length; i++) {
      if (scripts[i].src && /widget\.js/.test(scripts[i].src)) {
        src = scripts[i].src.replace(/widget\.js.*$/, 'widget.css');
        break;
      }
    }
    if (src && !document.querySelector('link[href*="widget.css"]')) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      document.head.appendChild(link);
    }
  }

  function createWidget() {
    loadStyles();

    var html =
      '<div class="fetch-widget-container" id="fetch-widget-root">' +
      '  <div class="fetch-widget-panel" id="fetch-widget-panel" aria-hidden="true">' +
      '    <div class="fetch-widget-header">' +
      '      <h3 class="fetch-widget-title">🐾 Pet Insurance Estimator</h3>' +
      '      <button type="button" class="fetch-widget-close" id="fetch-widget-close" aria-label="Close">×</button>' +
      '    </div>' +
      '    <div class="fetch-widget-body">' +
      '      <form class="fetch-widget-form" id="fetch-widget-form">' +
      '        <div class="fetch-widget-group">' +
      '          <label>Pet type</label>' +
      '          <div class="fetch-widget-pet-type">' +
      '            <button type="button" class="fetch-widget-pet-btn selected" data-pet="dog">🐕 Dog</button>' +
      '            <button type="button" class="fetch-widget-pet-btn" data-pet="cat">🐱 Cat</button>' +
      '          </div>' +
      '        </div>' +
      '        <div class="fetch-widget-group">' +
      '          <label>Breed size</label>' +
      '          <select id="fetch-breed-size" required>' +
      '            <option value="">Select size</option>' +
      '            <option value="small">Small</option>' +
      '            <option value="medium">Medium</option>' +
      '            <option value="large">Large</option>' +
      '          </select>' +
      '        </div>' +
      '        <div class="fetch-widget-group">' +
      '          <label>Age (years)</label>' +
      '          <input type="number" id="fetch-pet-age" min="1" max="10" value="3" required>' +
      '        </div>' +
      '        <div class="fetch-widget-group">' +
      '          <label>Gender</label>' +
      '          <select id="fetch-pet-gender">' +
      '            <option value="girl">Girl</option>' +
      '            <option value="boy">Boy</option>' +
      '          </select>' +
      '        </div>' +
      '        <button type="submit" class="fetch-widget-btn fetch-widget-btn-primary">Estimate Cost</button>' +
      '      </form>' +
      '      <div class="fetch-widget-result" id="fetch-widget-result">' +
      '        <p class="fetch-widget-result-label">Estimated monthly premium</p>' +
      '        <p class="fetch-widget-result-value" id="fetch-widget-result-value">—</p>' +
      '        <button type="button" class="fetch-widget-btn fetch-widget-btn-cta" id="fetch-quote-cta">Get personalised quote</button>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '  <button type="button" class="fetch-widget-trigger" id="fetch-widget-trigger" aria-label="Open calculator">🐾</button>' +
      '</div>';

    var root = document.createElement('div');
    root.innerHTML = html;
    document.body.appendChild(root.firstElementChild);
  }

  function init() {
    if (document.getElementById('fetch-widget-root')) return;

    createWidget();
    track('widget_loaded');

    var trigger = document.getElementById('fetch-widget-trigger');
    var panel = document.getElementById('fetch-widget-panel');
    var closeBtn = document.getElementById('fetch-widget-close');
    var form = document.getElementById('fetch-widget-form');
    var result = document.getElementById('fetch-widget-result');
    var resultValue = document.getElementById('fetch-widget-result-value');
    var quoteCta = document.getElementById('fetch-quote-cta');

    var petType = 'dog';
    var petButtons = document.querySelectorAll('.fetch-widget-pet-btn');
    petButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        petButtons.forEach(function (b) { b.classList.remove('selected'); });
        btn.classList.add('selected');
        petType = btn.getAttribute('data-pet');
      });
    });

    trigger.addEventListener('click', function () {
      panel.classList.add('open');
      panel.setAttribute('aria-hidden', 'false');
    });

    closeBtn.addEventListener('click', function () {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      track('estimate_clicked');

      var breedSize = document.getElementById('fetch-breed-size').value;
      var petAge = parseInt(document.getElementById('fetch-pet-age').value, 10);
      var gender = document.getElementById('fetch-pet-gender').value;

      if (!breedSize || isNaN(petAge) || petAge < 1 || petAge > 10) return;

      var range = estimatePremium(petType, breedSize, petAge, gender);
      resultValue.textContent = '$' + range.low + ' – $' + range.high + ' per month';
      result.classList.add('visible');
      track('estimate_generated', { low: range.low, high: range.high });
    });

    quoteCta.addEventListener('click', function () {
      track('quote_cta_clicked');
      window.alert('Redirecting to personalised quote form…');
    });
  }

  window.FetchWidget = { init: init };
})();
