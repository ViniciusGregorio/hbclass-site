/* Planejamento local: seis campos, revisão e abertura do WhatsApp sem envio automático. */
(function () {
  'use strict';
  const config = window.HBC_BOOKING_CONFIG || {};
  const serviceIds = ['aeroporto', 'corporativo', 'disposicao', 'eventos', 'hoteis', 'receptivo', 'assistants', 'familyoffice'];
  const draftFields = ['service', 'origin', 'destination', 'date', 'time', 'vehicle'];
  const text = {
    pt: {
      eyebrow: 'PLANEJE SEU TRAJETO', title: 'Seu próximo compromisso começa aqui.',
      intro: 'Informe o trajeto, a data e o veículo de preferência. Depois, revise os detalhes para continuar pelo WhatsApp.',
      required: '* Campos obrigatórios', service: 'Serviço', serviceLabel: 'Serviço *', serviceSelect: 'Selecione o serviço',
      aeroporto: 'Transfer aeroporto', corporativo: 'Transporte corporativo', disposicao: 'Disposição executiva',
      eventos: 'Eventos', hoteis: 'Hotéis & FBO', receptivo: 'Receptivo Executivo',
      assistants: 'Assistants & Secretaries', familyoffice: 'Family Office & Private Clients',
      origin: 'Origem', originLabel: 'Origem *', originPlaceholder: 'Aeroporto, hotel ou endereço de saída',
      destination: 'Destino', destinationLabel: 'Destino *', destinationPlaceholder: 'Hotel, compromisso ou endereço de chegada',
      date: 'Data', dateLabel: 'Data *', time: 'Horário', timeLabel: 'Horário *', timeHelp: 'Horário local de São Paulo.',
      vehicle: 'Veículo de preferência', vehicleLabel: 'Veículo de preferência *', vehicleSelect: 'Selecione o veículo',
      reviewButton: 'Revisar trajeto', privacy: 'Os detalhes do trajeto são usados para preparar a mensagem. O envio é confirmado no WhatsApp.',
      previewLabel: 'SEU VEÍCULO DE PREFERÊNCIA', vehicleEmpty: 'Escolha um modelo', vehicleEmptyHelp: 'A foto do veículo aparecerá aqui após a escolha.',
      availability: 'Disponibilidade e valor são confirmados pela equipe antes da reserva.',
      reviewEyebrow: 'ANTES DE CONTINUAR', reviewTitle: 'Confira seu trajeto.', edit: 'Editar informações',
      continueButton: 'Continuar no WhatsApp', fallback: 'Abrir a mensagem preparada no WhatsApp',
      finalNote: 'No WhatsApp, confira a mensagem e toque em enviar.',
      ready: 'Mensagem preparada. Se a nova aba não abriu, utilize o link abaixo. O pedido só é enviado após a confirmação no WhatsApp.',
      changed: 'As informações foram alteradas. Revise o trajeto novamente antes de continuar.',
      errorsTitle: 'Confira os campos indicados para continuar:', requiredError: 'Preencha este campo.',
      serviceError: 'Selecione um serviço válido.', vehicleError: 'Selecione um veículo de preferência.',
      dateError: 'Informe uma data válida, de hoje em diante.', timeError: 'Escolha uma data e um horário futuros no fuso de São Paulo.',
      leadError: 'Este horário não atende à antecedência configurada. Escolha um horário posterior.',
      clockError: 'Não foi possível validar o horário. Fale com a equipe pelo WhatsApp do site.',
      longError: 'O texto ultrapassa o limite deste campo.', whatsappError: 'Não foi possível preparar o WhatsApp. Use o contato informado no site.',
      messageIntro: 'Olá! Gostaria de consultar um trajeto com a High Business Class.',
      messageEnd: 'Por favor, confirmem a disponibilidade do veículo, o valor e as condições do atendimento. Entendo que este pedido não confirma uma reserva.',
      saoPaulo: 'horário de São Paulo'
    },
    en: {
      eyebrow: 'PLAN YOUR JOURNEY', title: 'Your next appointment starts here.',
      intro: 'Enter your journey, date and preferred vehicle. Then review the details to continue on WhatsApp.',
      required: '* Required fields', service: 'Service', serviceLabel: 'Service *', serviceSelect: 'Select a service',
      aeroporto: 'Airport transfers', corporativo: 'Corporate transportation', disposicao: 'Chauffeur at disposal',
      eventos: 'Events', hoteis: 'Hotels & FBO', receptivo: 'Executive Meet & Greet',
      assistants: 'Assistants & Secretaries', familyoffice: 'Family Office & Private Clients',
      origin: 'Pick-up', originLabel: 'Pick-up point *', originPlaceholder: 'Airport, hotel or departure address',
      destination: 'Destination', destinationLabel: 'Destination *', destinationPlaceholder: 'Hotel, appointment or arrival address',
      date: 'Date', dateLabel: 'Date *', time: 'Time', timeLabel: 'Time *', timeHelp: 'São Paulo local time.',
      vehicle: 'Preferred vehicle', vehicleLabel: 'Preferred vehicle *', vehicleSelect: 'Select a vehicle',
      reviewButton: 'Review journey', privacy: 'Journey details are used to prepare the message. Sending is confirmed on WhatsApp.',
      previewLabel: 'YOUR PREFERRED VEHICLE', vehicleEmpty: 'Choose a model', vehicleEmptyHelp: 'Your selected vehicle photo will appear here.',
      availability: 'Our team confirms availability and pricing before the booking.',
      reviewEyebrow: 'BEFORE YOU CONTINUE', reviewTitle: 'Review your journey.', edit: 'Edit details',
      continueButton: 'Continue on WhatsApp', fallback: 'Open the prepared message on WhatsApp',
      finalNote: 'On WhatsApp, review the message and tap send.',
      ready: 'Your message is ready. If the new tab did not open, use the link below. Your request is only sent after confirmation on WhatsApp.',
      changed: 'The details have changed. Please review your journey again before continuing.',
      errorsTitle: 'Please check the indicated fields before continuing:', requiredError: 'Please complete this field.',
      serviceError: 'Please select a valid service.', vehicleError: 'Please select your preferred vehicle.',
      dateError: 'Please enter today or a valid future date.', timeError: 'Please choose a future date and time in the São Paulo time zone.',
      leadError: 'This time does not meet the configured advance notice. Please choose a later time.',
      clockError: 'We could not validate the time. Please use the website WhatsApp contact to speak to our team.',
      longError: 'This text exceeds the field limit.', whatsappError: 'We could not prepare WhatsApp. Please use the contact details on this website.',
      messageIntro: 'Hello! I would like to enquire about a journey with High Business Class.',
      messageEnd: 'Please confirm vehicle availability, pricing and service conditions. I understand that this request does not confirm a booking.',
      saoPaulo: 'São Paulo time'
    }
  };
  let language = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'pt';
  const t = function (key) { return text[language][key] || text.pt[key] || key; };
  const vehicleIn = function (id) { return (Array.isArray(config.vehicles) ? config.vehicles : []).find(function (item) { return item.id === id; }); };

  function zonedParts(now, zone) {
    try {
      const parts = new Intl.DateTimeFormat('en', {timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'}).formatToParts(now);
      const get = function (type) { return parts.find(function (part) { return part.type === type; }).value; };
      return {date: get('year') + '-' + get('month') + '-' + get('day'), time: get('hour') + ':' + get('minute'), pseudoTime: Date.UTC(Number(get('year')), Number(get('month')) - 1, Number(get('day')), Number(get('hour')), Number(get('minute')), Number(get('second')))};
    } catch (_) { return null; }
  }

  function isFutureDateTime(date, time, now, source) {
    source = source || config;
    now = now === undefined ? new Date() : new Date(now);
    const clock = zonedParts(now, source.timeZone || 'America/Sao_Paulo');
    const lead = source.minimumLeadMinutes === undefined ? 0 : source.minimumLeadMinutes;
    if (!clock || !Number.isInteger(lead) || lead < 0) return {valid: false, reason: 'clockError'};
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '') || date < clock.date) return {valid: false, reason: 'dateError'};
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time || '')) return {valid: false, reason: 'timeError'};
    const candidate = new Date(date + 'T' + time + ':00Z');
    if (!Number.isFinite(candidate.getTime()) || candidate.toISOString().slice(0, 16) !== date + 'T' + time) return {valid: false, reason: 'dateError'};
    if (candidate.getTime() <= clock.pseudoTime) return {valid: false, reason: 'timeError'};
    if (candidate.getTime() < clock.pseudoTime + lead * 60000) return {valid: false, reason: 'leadError'};
    return {valid: true, reason: ''};
  }

  const scope = document.getElementById('pre-agendamento');
  const form = document.getElementById('booking-form');
  window.HBCBooking = {version: '2.0.0', isFutureDateTime: isFutureDateTime, setLanguage: setLanguage};
  if (!scope || !form) return;
  const field = function (name) { return form.elements.namedItem(name); };
  const node = function (id) { return document.getElementById('booking-' + id); };
  const review = node('review');
  const continueButton = node('continue');
  const fallback = node('fallback');
  let reviewed = null;
  let opened = false;
  let statusKey = '';
  let errors = {};

  function readDraft() {
    const draft = {};
    draftFields.forEach(function (name) { draft[name] = String(field(name).value || '').trim(); });
    return draft;
  }
  function setStatus(key) { statusKey = key; node('status').textContent = key ? t(key) : ''; }
  function emit(action, service) {
    if ((window.HBC_CONFIG || {}).emitEvents === false || !serviceIds.includes(service)) return;
    // Only stable category identifiers enter events; never journey details or URLs.
    document.dispatchEvent(new CustomEvent('hbc:action', {detail: {
      action: action, service: service, position: 'journey_planner'
    }}));
  }
  function renderStatic() {
    scope.querySelectorAll('[data-booking-i18n]').forEach(function (element) { element.textContent = t(element.dataset.bookingI18n); });
    scope.querySelectorAll('[data-booking-placeholder]').forEach(function (element) { element.placeholder = t(element.dataset.bookingPlaceholder); });
  }
  function renderVehicles() {
    const current = field('vehicle').value;
    field('vehicle').replaceChildren(new Option(t('vehicleSelect'), ''));
    (config.vehicles || []).forEach(function (vehicle) { field('vehicle').appendChild(new Option(vehicle.name, vehicle.id)); });
    field('vehicle').value = current;
  }
  function renderPreview() {
    const vehicle = vehicleIn(field('vehicle').value);
    const image = node('vehicle-image');
    image.hidden = !vehicle;
    node('vehicle-placeholder').hidden = !!vehicle;
    node('vehicle-name').textContent = vehicle ? vehicle.name : t('vehicleEmpty');
    node('selected-vehicle').hidden = !vehicle;
    node('inline-vehicle-name').textContent = vehicle ? vehicle.name : '';
    [image, node('inline-vehicle-image')].forEach(function (element) {
      if (vehicle) element.src = vehicle.image;
      else element.removeAttribute('src');
    });
    image.alt = vehicle ? vehicle.name : '';
  }
  function renderErrors() {
    const list = node('error-list');
    list.replaceChildren();
    Object.keys(errors).forEach(function (name) {
      const element = field(name);
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = '#' + element.id;
      link.textContent = t(errors[name]);
      link.addEventListener('click', function (event) { event.preventDefault(); element.focus(); });
      item.appendChild(link); list.appendChild(item);
    });
    draftFields.forEach(function (name) {
      const error = node('error-' + name);
      error.textContent = errors[name] ? t(errors[name]) : '';
      error.hidden = !errors[name];
      field(name).setAttribute('aria-invalid', String(!!errors[name]));
    });
    node('errors').hidden = Object.keys(errors).length === 0;
  }
  function clearReview(changed) {
    const wasReviewed = !!reviewed;
    reviewed = null; opened = false;
    review.hidden = true;
    continueButton.disabled = true;
    fallback.hidden = true; fallback.removeAttribute('href');
    if (changed && wasReviewed) setStatus('changed');
    else if (!changed) setStatus('');
  }
  function updateDateMinimum() {
    const clock = zonedParts(new Date(), config.timeZone || 'America/Sao_Paulo');
    if (clock) field('date').min = clock.date;
  }
  function validate() {
    const draft = readDraft();
    errors = {};
    if (!serviceIds.includes(draft.service)) errors.service = 'serviceError';
    if (!vehicleIn(draft.vehicle)) errors.vehicle = 'vehicleError';
    ['origin', 'destination'].forEach(function (name) {
      if (!draft[name]) errors[name] = 'requiredError';
      else if (draft[name].length > 180) errors[name] = 'longError';
    });
    updateDateMinimum();
    const future = isFutureDateTime(draft.date, draft.time);
    if (!future.valid) errors[future.reason === 'dateError' ? 'date' : 'time'] = future.reason;
    renderErrors();
    if (Object.keys(errors).length) { clearReview(false); node('errors').focus(); return null; }
    return draft;
  }
  function dateLabel(value) { const parts = value.split('-'); return language === 'en' ? value : parts[2] + '/' + parts[1] + '/' + parts[0]; }
  function summaryEntries(draft) {
    const vehicle = vehicleIn(draft.vehicle);
    return [
      ['service', t(draft.service)], ['origin', draft.origin], ['destination', draft.destination],
      ['date', dateLabel(draft.date)], ['time', draft.time + ' · ' + t('saoPaulo')],
      ['vehicle', vehicle ? vehicle.name : '']
    ];
  }
  function renderReview() {
    if (!reviewed) return;
    const details = node('review-details');
    details.replaceChildren();
    summaryEntries(reviewed).forEach(function (entry) {
      const row = document.createElement('div');
      const dt = document.createElement('dt');
      const dd = document.createElement('dd');
      dt.textContent = t(entry[0]); dd.textContent = entry[1];
      row.appendChild(dt); row.appendChild(dd); details.appendChild(row);
    });
    if (opened) fallback.href = messageUrl();
  }
  function messageUrl() {
    if (!reviewed) return '';
    const whatsapp = String(config.whatsapp || (window.HBC_CONFIG || {}).whatsapp || '5511960781389').replace(/\D/g, '');
    if (!/^\d{10,15}$/.test(whatsapp)) return '';
    const lines = [t('messageIntro'), ''];
    summaryEntries(reviewed).forEach(function (entry) { lines.push(t(entry[0]) + ': ' + entry[1]); });
    lines.push('', t('messageEnd'));
    return 'https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(lines.join('\n'));
  }
  function setLanguage(next) {
    if (next !== 'pt' && next !== 'en') return;
    language = next;
    if (!scope || !form) return;
    renderStatic(); renderVehicles(); renderPreview(); renderErrors(); renderReview();
    if (statusKey) setStatus(statusKey);
  }
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const draft = validate();
    if (!draft) return;
    reviewed = draft;
    opened = false; continueButton.disabled = false;
    fallback.hidden = true; fallback.removeAttribute('href'); setStatus('');
    renderReview(); review.hidden = false; review.focus({preventScroll: true});
    review.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest'});
    emit('booking_review', draft.service);
  });
  form.addEventListener('input', function (event) {
    if (event.target.name && errors[event.target.name]) { delete errors[event.target.name]; renderErrors(); }
    clearReview(true); renderPreview();
  });
  form.addEventListener('change', function (event) {
    if (event.target.name && errors[event.target.name]) { delete errors[event.target.name]; renderErrors(); }
    clearReview(true); renderPreview();
  });
  form.addEventListener('reset', function () {
    clearReview(false); errors = {}; renderErrors();
    setTimeout(renderPreview, 0);
  });
  node('edit').addEventListener('click', function () { clearReview(false); field('service').focus(); });
  continueButton.addEventListener('click', function () {
    if (!reviewed) return;
    const previous = reviewed;
    const draft = validate();
    if (!draft) return;
    if (JSON.stringify(draft) !== JSON.stringify(previous)) { clearReview(true); field('service').focus(); return; }
    const url = messageUrl();
    if (!url) { setStatus('whatsappError'); return; }
    opened = true; fallback.href = url; fallback.hidden = false; setStatus('ready');
    emit('booking_whatsapp', draft.service);
    try { window.open(url, '_blank', 'noopener,noreferrer'); } catch (_) { /* The visible fallback remains available. */ }
  });
  document.querySelectorAll('[data-booking-service], [data-booking-vehicle]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (serviceIds.includes(link.dataset.bookingService)) { field('service').value = link.dataset.bookingService; delete errors.service; }
      if (vehicleIn(link.dataset.bookingVehicle)) { field('vehicle').value = link.dataset.bookingVehicle; delete errors.vehicle; }
      clearReview(true); renderErrors(); renderPreview();
    });
  });
  document.addEventListener('hbc:language', function (event) { setLanguage(event.detail && (event.detail.language || event.detail.lang)); });
  document.querySelectorAll('[data-lang]').forEach(function (button) { button.addEventListener('click', function () { setLanguage(button.dataset.lang); }); });
  updateDateMinimum(); renderVehicles(); renderStatic(); renderPreview();
  form.noValidate = true;
  form.querySelectorAll('[data-booking-requires-js]').forEach(function (element) { element.disabled = false; });
})();
