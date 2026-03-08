/**
 * Pet Insurance Cost Estimator – Embeddable Widget
 * Plain JavaScript, no frameworks
 */

(function () {
  'use strict';

  // Event tracking (console logs for analytics simulation)
  function track(event, data) {
    if (data) {
      console.log('[PetInsurance]', event, data);
    } else {
      console.log('[PetInsurance]', event);
    }
  }

  // Pricing formula – generates min/max monthly premium range
  function estimatePremium(petType, breedSize, petAge) {
    var base = petType === 'dog' ? 28 : 20;
    var sizeMod = { small: 0, medium: 5, large: 12 }[breedSize] || 0;
    var ageMod = petAge <= 3 ? 0 : petAge <= 6 ? 4 : 10;
    var mid = base + sizeMod + ageMod;
    var low = Math.round(mid * 0.85);
    var high = Math.round(mid * 1.2);
    low = Math.max(18, low);
    high = Math.min(80, high);
    return { low: low, high: high };
  }

  function init() {
    track('widget_loaded');

    var form = document.getElementById('estimator-form');
    var estimateSection = document.getElementById('estimate-section');
    var estimateValue = document.getElementById('estimate-value');
    var quoteCta = document.getElementById('quote-cta');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      track('estimate_clicked');

      var petType = document.getElementById('pet-type').value;
      var breedSize = document.getElementById('breed-size').value;
      var petAge = parseInt(document.getElementById('pet-age').value, 10);

      if (!petType || !breedSize || isNaN(petAge) || petAge < 1 || petAge > 10) return;

      var range = estimatePremium(petType, breedSize, petAge);
      var text = '$' + range.low + ' – $' + range.high + ' per month';
      estimateValue.textContent = text;

      estimateSection.setAttribute('aria-hidden', 'false');
      estimateSection.classList.add('visible');

      track('estimate_generated', { low: range.low, high: range.high });
    });

    quoteCta.addEventListener('click', function () {
      track('quote_cta_clicked');
      // Placeholder for actual conversion – e.g. redirect or open modal
      alert('Redirecting to personalised quote form…');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
