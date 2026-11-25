/* Bagagem: referências por volume e quantidades informadas para os SUVs no modo mais bagagem. */
(function () {
  'use strict';

  const section = document.getElementById('frota');
  if (!section) return;
  // Dimensões externas sem expansão, em centímetros. A capacidade interna da mala não é usada.
  const sizes = {
    small: { dimensions: [55, 40, 23], pt: ['mala pequena', 'malas pequenas'], en: ['small suitcase', 'small suitcases'] },
    medium: { dimensions: [68, 45, 28], pt: ['mala média', 'malas médias'], en: ['medium suitcase', 'medium suitcases'] },
    large: { dimensions: [75, 51, 32], pt: ['mala grande', 'malas grandes'], en: ['large suitcase', 'large suitcases'] }
  };
  // Lugares/volumes de referência; quantidades em bags informadas pelo responsável.
  const vehicles = {
    mercedes: { full: { passengers: 4, litres: 540 } },
    commander: { full: { passengers: 6, litres: 233 }, cargo: { passengers: 4, bags: { small: [8, 10], medium: 6, large: 4 } } },
    volvo: { full: { passengers: 6, litres: 244 }, cargo: { passengers: 4, bags: { small: [8, 10], medium: 6, large: 4 } } },
    corolla: { full: { passengers: 4, litres: 470 } }
  };
  const usableFraction = 0.60; // Hipótese do site: reservar 40% para espaços não aproveitados; não é dado do fabricante.
  let selectedSize = 'medium';
  function english() { return document.documentElement.lang.toLowerCase().startsWith('en'); }
  function estimate(litres, size) {
    const dimensions = sizes[size].dimensions;
    return Math.floor(litres * usableFraction / (dimensions[0] * dimensions[1] * dimensions[2] / 1000));
  }

  function render(announce) {
    const en = english();
    const size = sizes[selectedSize];
    section.querySelectorAll('[data-fleet-size]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.fleetSize === selectedSize));
    });
    const reference = section.querySelector('[data-fleet-size-reference]');
    reference.textContent = (en ? 'Reference dimensions, without expansion: ' : 'Medidas de referência, sem expansão: ') + size.dimensions.join(' × ') + ' cm.';

    section.querySelectorAll('[data-fleet-vehicle]').forEach(function (card) {
      const key = card.dataset.fleetVehicle;
      const layouts = vehicles[key];
      if (!layouts) return;
      const select = card.querySelector('[data-fleet-layout]');
      const mode = select && Object.prototype.hasOwnProperty.call(layouts, select.value) ? select.value : 'full';
      const layout = layouts[mode];
      const count = layout.bags ? layout.bags[selectedSize] : estimate(layout.litres, selectedSize);
      const range = Array.isArray(count);
      const displayedCount = range ? count.join('–') : count;
      const spokenCount = range ? count.join(en ? ' to ' : ' a ') : count;
      card.querySelector('[data-fleet-passengers]').textContent = (en ? 'Up to ' : 'Até ') + layout.passengers;
      const bags = card.querySelector('[data-fleet-bags]');
      bags.textContent = '≈ ' + displayedCount;
      bags.setAttribute('aria-label', (en ? 'Approximately ' : 'Aproximadamente ') + spokenCount);
      card.querySelector('[data-fleet-bag-label]').textContent = size[en ? 'en' : 'pt'][count === 1 ? 0 : 1];
      const note = card.querySelector('[data-fleet-layout-note]');
      if (note) {
        const position = en
          ? (mode === 'cargo' ? 'Third row folded.' : 'Third row in use.')
          : (mode === 'cargo' ? 'Terceira fileira rebatida.' : 'Terceira fileira em uso.');
        const model = key === 'commander'
          ? (en ? 'Seven-seat version reference.' : 'Referência da versão de sete lugares.')
          : (en ? '2026 seven-seat model reference.' : 'Referência do modelo 2026 de sete lugares.');
        note.textContent = position + ' ' + model;
      }
    });
    if (announce) {
      section.querySelector('[data-fleet-status]').textContent = en
        ? 'Reference estimates updated for ' + size.en[1] + '.'
        : 'Estimativas atualizadas para ' + size.pt[1] + '.';
    }
  }

  section.querySelectorAll('[data-fleet-size]').forEach(function (button) {
    button.disabled = false;
    button.addEventListener('click', function () {
      if (!Object.prototype.hasOwnProperty.call(sizes, button.dataset.fleetSize)) return;
      selectedSize = button.dataset.fleetSize;
      render(true);
    });
  });
  section.querySelectorAll('[data-fleet-layout]').forEach(function (select) {
    select.disabled = false;
    select.addEventListener('change', function () { render(true); });
  });
  document.addEventListener('hbc:language', function () { render(false); });
  render(false);
})();
