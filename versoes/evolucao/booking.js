/* Pré-agendamento local: revisão → abertura do WhatsApp; nenhum envio automático. */
(function () {
  'use strict';
  const config = window.HBC_BOOKING_CONFIG || {};
  const serviceIds = ['aeroporto', 'corporativo', 'disposicao', 'eventos', 'hoteis', 'receptivo'];
  const text = {
    pt: {
      eyebrow: 'PLANEJE SEU TRAJETO', title: 'Seu próximo compromisso começa aqui.',
      intro: 'Conte como será sua viagem, escolha o veículo de preferência e revise os detalhes antes de conversar com a equipe.',
      stepDetails: 'Conte seu trajeto', stepReview: 'Revise os detalhes', stepContact: 'Continue no WhatsApp',
      tripLegend: '01 · O seu trajeto', peopleLegend: '02 · Passageiros e veículo', contactLegend: '03 · Seus dados de contato',
      required: '* Campos obrigatórios', service: 'Serviço', serviceLabel: 'Serviço *', serviceSelect: 'Selecione o serviço',
      aeroporto: 'Transfer aeroporto', corporativo: 'Transporte corporativo', disposicao: 'Disposição executiva',
      eventos: 'Eventos', hoteis: 'Hotéis & FBO', receptivo: 'Receptivo',
      routeLabel: 'Rota de referência', routeCustom: 'Informar outro trajeto', routeHelp: 'Uma rota de referência utiliza a origem e o destino indicados. Para outro percurso, escolha “Informar outro trajeto”.',
      origin: 'Origem', originLabel: 'Origem *', originPlaceholder: 'Aeroporto, hotel ou endereço de saída',
      destination: 'Destino', destinationLabel: 'Destino *', destinationPlaceholder: 'Hotel, compromisso ou endereço de chegada',
      date: 'Data', dateLabel: 'Data *', time: 'Horário', timeLabel: 'Horário *', timeHelp: 'Data e horário considerados no fuso de São Paulo.',
      flight: 'Voo', flightLabel: 'Número do voo (opcional)', flightPlaceholder: 'Ex.: companhia e número do voo',
      passengers: 'Passageiros', passengersLabel: 'Passageiros *', bags: 'Bagagens', bagsLabel: 'Bagagens *',
      vehicle: 'Veículo de preferência', vehicleLabel: 'Veículo de preferência *', vehicleSelect: 'Selecione o veículo',
      vehicleHelp: 'A equipe confirma a disponibilidade do modelo e a adequação ao número de passageiros e bagagens.',
      name: 'Nome', nameLabel: 'Nome completo *', namePlaceholder: 'Como podemos chamar você?',
      phone: 'Telefone', phoneLabel: 'Telefone / WhatsApp *', phonePlaceholder: '+55 (11) 99999-9999',
      phoneHelp: 'Informe o DDD e, para números internacionais, o código do país.',
      notes: 'Observações', notesLabel: 'Observações (opcional)', notesPlaceholder: 'Roteiro, necessidades de atendimento ou outros detalhes',
      reviewButton: 'Revisar pré-agendamento', privacy: 'Os dados são usados apenas para preparar a mensagem. Nada é armazenado neste site. Você decide se deseja enviar no WhatsApp.',
      previewLabel: 'SEU VEÍCULO DE PREFERÊNCIA', vehicleEmpty: 'Escolha um modelo', vehicleEmptyHelp: 'A foto do veículo aparecerá aqui após a sua escolha.',
      estimateLabel: 'Estimativa do trajeto', consult: 'Valor sob consulta', consultDetail: 'A equipe informa o valor após revisar o serviço, o veículo e o percurso.',
      estimateDetail: 'Estimativa calculada com a tabela configurada. A equipe confirma o valor final e as condições do trajeto.',
      availability: 'O preenchimento não bloqueia um veículo nem confirma uma reserva.',
      reviewEyebrow: 'ANTES DE CONTINUAR', reviewTitle: 'Confira seu pré-agendamento.', edit: 'Editar informações',
      reviewNote: 'A equipe confirma a disponibilidade do veículo, o valor final e as condições antes de concluir a reserva.',
      continueButton: 'Continuar no WhatsApp', fallback: 'Abrir a mensagem preparada no WhatsApp',
      finalNote: 'No WhatsApp, confira a mensagem e toque em enviar. A equipe dará continuidade ao atendimento.',
      ready: 'Mensagem preparada. Se a nova aba não abriu, utilize o link abaixo. O pedido só é enviado quando você confirmar no WhatsApp.',
      changed: 'Você alterou informações. Revise o pré-agendamento novamente antes de continuar.',
      errorsTitle: 'Confira os campos indicados para continuar:', requiredError: 'Preencha este campo.',
      serviceError: 'Selecione um serviço válido.', vehicleError: 'Selecione um veículo de preferência.',
      dateError: 'Informe uma data válida, de hoje em diante.', timeError: 'Escolha uma data e um horário futuros no fuso de São Paulo.',
      leadError: 'Este horário não atende à antecedência configurada. Escolha um horário posterior.',
      clockError: 'Não foi possível validar o horário. Fale com a equipe pelo WhatsApp do site.',
      passengersError: 'Informe um número inteiro de passageiros entre 1 e 99.', bagsError: 'Informe um número inteiro de bagagens entre 0 e 99.',
      capacityPassengers: 'A quantidade excede a capacidade informada para este modelo. Escolha outro veículo ou fale com a equipe.',
      capacityBags: 'A quantidade de bagagens excede o limite informado para este modelo. Escolha outro veículo ou fale com a equipe.',
      phoneError: 'Informe um telefone válido com DDD ou código do país (10 a 15 dígitos).',
      longError: 'O texto ultrapassa o limite deste campo.', whatsappError: 'Não foi possível preparar o WhatsApp. Use o contato informado no site.',
      messageIntro: 'Olá! Gostaria de solicitar um pré-agendamento com a High Business Class.',
      messageEnd: 'Por favor, confirmem a disponibilidade do veículo, o valor final e as condições do atendimento. Entendo que este pedido não confirma uma reserva.',
      saoPaulo: 'horário de São Paulo', notInformed: 'Não informado', estimate: 'Estimativa', route: 'Rota de referência',
      pricingFixed: 'Tabela fixa por serviço e veículo', pricingRoute: 'Tabela fixa da rota selecionada', pricingDistance: 'Rota homologada × tarifa por quilômetro', minimumApplied: 'Valor mínimo da tabela aplicado'
    },
    en: {
      eyebrow: 'PLAN YOUR JOURNEY', title: 'Your next appointment starts here.',
      intro: 'Tell us about your journey, choose your preferred vehicle and review the details before contacting our team.',
      stepDetails: 'Plan your journey', stepReview: 'Review the details', stepContact: 'Continue on WhatsApp',
      tripLegend: '01 · Your journey', peopleLegend: '02 · Passengers and vehicle', contactLegend: '03 · Your contact details',
      required: '* Required fields', service: 'Service', serviceLabel: 'Service *', serviceSelect: 'Select a service',
      aeroporto: 'Airport transfers', corporativo: 'Corporate transportation', disposicao: 'Chauffeur at disposal',
      eventos: 'Events', hoteis: 'Hotels & FBO', receptivo: 'Meet & greet',
      routeLabel: 'Reference route', routeCustom: 'Enter a different journey', routeHelp: 'A reference route uses the indicated pick-up and destination. For a different journey, choose “Enter a different journey”.',
      origin: 'Pick-up', originLabel: 'Pick-up point *', originPlaceholder: 'Airport, hotel or departure address',
      destination: 'Destination', destinationLabel: 'Destination *', destinationPlaceholder: 'Hotel, appointment or arrival address',
      date: 'Date', dateLabel: 'Date *', time: 'Time', timeLabel: 'Time *', timeHelp: 'Date and time are interpreted in the São Paulo time zone.',
      flight: 'Flight', flightLabel: 'Flight number (optional)', flightPlaceholder: 'E.g. airline and flight number',
      passengers: 'Passengers', passengersLabel: 'Passengers *', bags: 'Bags', bagsLabel: 'Bags *',
      vehicle: 'Preferred vehicle', vehicleLabel: 'Preferred vehicle *', vehicleSelect: 'Select a vehicle',
      vehicleHelp: 'Our team confirms model availability and suitability for your passengers and luggage.',
      name: 'Name', nameLabel: 'Full name *', namePlaceholder: 'How should we address you?',
      phone: 'Phone', phoneLabel: 'Phone / WhatsApp *', phonePlaceholder: '+55 (11) 99999-9999',
      phoneHelp: 'Include your area code and, for international numbers, the country code.',
      notes: 'Notes', notesLabel: 'Notes (optional)', notesPlaceholder: 'Itinerary, assistance requirements or other details',
      reviewButton: 'Review pre-booking request', privacy: 'Your details are only used to prepare the message. This site does not store them. You choose whether to send them on WhatsApp.',
      previewLabel: 'YOUR PREFERRED VEHICLE', vehicleEmpty: 'Choose a model', vehicleEmptyHelp: 'Your selected vehicle photo will appear here.',
      estimateLabel: 'Journey estimate', consult: 'Price on request', consultDetail: 'Our team provides the price after reviewing your service, vehicle and journey.',
      estimateDetail: 'Estimate calculated using the configured price list. Our team confirms the final price and journey conditions.',
      availability: 'Completing this form does not hold a vehicle or confirm a booking.',
      reviewEyebrow: 'BEFORE YOU CONTINUE', reviewTitle: 'Review your pre-booking request.', edit: 'Edit details',
      reviewNote: 'Our team confirms vehicle availability, the final price and the conditions before completing your booking.',
      continueButton: 'Continue on WhatsApp', fallback: 'Open the prepared message on WhatsApp',
      finalNote: 'On WhatsApp, review the message and tap send. Our team will then assist you.',
      ready: 'Your message is ready. If the new tab did not open, use the link below. Your request is only sent when you confirm it on WhatsApp.',
      changed: 'You changed some details. Please review your pre-booking request again before continuing.',
      errorsTitle: 'Please check the indicated fields before continuing:', requiredError: 'Please complete this field.',
      serviceError: 'Please select a valid service.', vehicleError: 'Please select your preferred vehicle.',
      dateError: 'Please enter today or a valid future date.', timeError: 'Please choose a future date and time in the São Paulo time zone.',
      leadError: 'This time does not meet the configured advance notice. Please choose a later time.',
      clockError: 'We could not validate the time. Please use the website WhatsApp contact to speak to our team.',
      passengersError: 'Please enter a whole number of passengers between 1 and 99.', bagsError: 'Please enter a whole number of bags between 0 and 99.',
      capacityPassengers: 'The number exceeds the configured capacity for this model. Choose another vehicle or contact our team.',
      capacityBags: 'The luggage exceeds the configured limit for this model. Choose another vehicle or contact our team.',
      phoneError: 'Please enter a valid phone number with area or country code (10 to 15 digits).',
      longError: 'This text exceeds the field limit.', whatsappError: 'We could not prepare WhatsApp. Please use the contact details on this website.',
      messageIntro: 'Hello! I would like to request a pre-booking with High Business Class.',
      messageEnd: 'Please confirm vehicle availability, the final price and the service conditions. I understand that this request does not confirm a booking.',
      saoPaulo: 'São Paulo time', notInformed: 'Not provided', estimate: 'Estimate', route: 'Reference route',
      pricingFixed: 'Fixed service and vehicle price list', pricingRoute: 'Fixed price for the selected route', pricingDistance: 'Approved route × price per kilometre', minimumApplied: 'Price-list minimum applied'
    }
  };
  let language = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'pt';
  const t = function (key) { return text[language][key] || text.pt[key] || key; };
  const normalize = function (value) { return String(value || '').trim().replace(/\s+/g, ' ').toLowerCase(); };
  const positive = function (value) { return typeof value === 'number' && Number.isFinite(value) && value > 0; };
  const vehicleIn = function (source, id) { return (Array.isArray(source.vehicles) ? source.vehicles : []).find(function (item) { return item.id === id; }); };

  function calculateEstimate(selection, source) {
    source = source || config;
    selection = selection || {};
    const pricing = source.pricing || {};
    const result = {status: 'consult', amount: null, currency: 'BRL', mode: pricing.mode || '', reason: 'not_configured', distanceKm: null, minimumApplied: false};
    if (pricing.enabled !== true || pricing.confirmedByClient !== true) return result;
    if (source.currency !== 'BRL') { result.reason = 'invalid_currency'; return result; }
    if (!serviceIds.includes(selection.service) || !vehicleIn(source, selection.vehicle)) { result.reason = 'missing_selection'; return result; }
    const rate = pricing.rates && pricing.rates[selection.service] && pricing.rates[selection.service][selection.vehicle];
    let amount = null;
    if (pricing.mode === 'service_fixed') {
      if (!rate || !positive(rate.fixed)) { result.reason = 'missing_price'; return result; }
      amount = rate.fixed;
    } else if (pricing.mode === 'route_fixed' || pricing.mode === 'route_distance') {
      const matches = (Array.isArray(pricing.routes) ? pricing.routes : []).filter(function (route) { return route.id === selection.route; });
      const route = matches.length === 1 ? matches[0] : null;
      if (!route || route.confirmedByClient !== true || !Array.isArray(route.services) || !route.services.includes(selection.service) || !normalize(route.origin) || !normalize(route.destination)) { result.reason = 'unapproved_route'; return result; }
      if (normalize(selection.origin) !== normalize(route.origin) || normalize(selection.destination) !== normalize(route.destination)) { result.reason = 'route_mismatch'; return result; }
      if (pricing.mode === 'route_fixed') {
        amount = route.fixedByVehicle && route.fixedByVehicle[selection.vehicle];
        if (!positive(amount)) { result.reason = 'missing_price'; return result; }
      } else {
        if (!positive(route.distanceKm)) { result.reason = 'missing_distance'; return result; }
        if (!rate || !positive(rate.perKm) || (rate.minimum !== null && rate.minimum !== undefined && !positive(rate.minimum))) { result.reason = 'invalid_rate'; return result; }
        result.distanceKm = route.distanceKm;
        amount = route.distanceKm * rate.perKm;
        if (positive(rate.minimum) && amount < rate.minimum) { amount = rate.minimum; result.minimumApplied = true; }
      }
    } else { result.reason = 'invalid_mode'; return result; }
    const cents = Math.round((amount + Number.EPSILON) * 100);
    if (!Number.isSafeInteger(cents) || cents <= 0) { result.reason = 'invalid_amount'; return result; }
    result.status = 'estimate';
    result.amount = cents / 100;
    result.reason = '';
    return result;
  }

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
  window.HBCBooking = {version: '1.0.0', calculateEstimate: calculateEstimate, isFutureDateTime: isFutureDateTime, setLanguage: setLanguage};
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

  function money(amount) { return new Intl.NumberFormat(language === 'en' ? 'en-US' : 'pt-BR', {style: 'currency', currency: 'BRL'}).format(amount); }
  function readDraft() {
    const draft = {};
    ['service', 'route', 'origin', 'destination', 'date', 'time', 'passengers', 'bags', 'vehicle', 'name', 'phone', 'flight', 'notes'].forEach(function (name) {
      draft[name] = field(name) ? String(field(name).value || '').trim() : '';
    });
    return draft;
  }
  function setStatus(key) { statusKey = key; node('status').textContent = key ? t(key) : ''; }
  function routeFor(id) { return ((config.pricing || {}).routes || []).find(function (route) { return route.id === id && route.confirmedByClient === true; }); }

  function renderStatic() {
    scope.querySelectorAll('[data-booking-i18n]').forEach(function (element) { element.textContent = t(element.dataset.bookingI18n); });
    scope.querySelectorAll('[data-booking-placeholder]').forEach(function (element) { element.placeholder = t(element.dataset.bookingPlaceholder); });
  }

  function renderRoutes() {
    const select = field('route');
    const current = select.value;
    const routes = ((config.pricing || {}).routes || []).filter(function (route) {
      return route.confirmedByClient === true && typeof route.id === 'string' && route.id && Array.isArray(route.services) && route.services.includes(field('service').value) && normalize(route.origin) && normalize(route.destination);
    });
    select.replaceChildren();
    const custom = new Option(t('routeCustom'), '');
    select.appendChild(custom);
    routes.forEach(function (route) {
      select.appendChild(new Option((route.label && (route.label[language] || route.label.pt)) || route.origin + ' → ' + route.destination, route.id));
    });
    select.value = routes.some(function (route) { return route.id === current; }) ? current : '';
    node('route-field').hidden = routes.length === 0;
    if (!select.value) { field('origin').readOnly = false; field('destination').readOnly = false; }
  }

  function renderVehicles() {
    const current = field('vehicle').value;
    field('vehicle').replaceChildren(new Option(t('vehicleSelect'), ''));
    (config.vehicles || []).forEach(function (vehicle) { field('vehicle').appendChild(new Option(vehicle.name, vehicle.id)); });
    field('vehicle').value = current;
  }

  function pricingDescription(estimate) {
    if (estimate.status !== 'estimate') return t('consultDetail');
    let description = t(estimate.mode === 'service_fixed' ? 'pricingFixed' : estimate.mode === 'route_fixed' ? 'pricingRoute' : 'pricingDistance');
    if (estimate.distanceKm !== null) description += ' · ' + new Intl.NumberFormat(language === 'en' ? 'en-US' : 'pt-BR').format(estimate.distanceKm) + ' km';
    if (estimate.minimumApplied) description += ' · ' + t('minimumApplied');
    return description + '. ' + t('estimateDetail');
  }

  function renderPreview() {
    const draft = readDraft();
    const vehicle = vehicleIn(config, draft.vehicle);
    const image = node('vehicle-image');
    image.hidden = !vehicle;
    node('vehicle-placeholder').hidden = !!vehicle;
    node('vehicle-name').textContent = vehicle ? vehicle.name : t('vehicleEmpty');
    if (vehicle) { image.src = vehicle.image; image.alt = vehicle.name; }
    else { image.removeAttribute('src'); image.alt = ''; }
    const estimate = calculateEstimate(draft);
    const priceText = estimate.status === 'estimate' ? money(estimate.amount) : t('consult');
    node('price').textContent = priceText;
    const inline = node('selected-vehicle');
    if (inline) {
      inline.hidden = !vehicle;
      node('inline-vehicle-name').textContent = vehicle ? vehicle.name : '';
      node('inline-price').textContent = priceText;
      if (vehicle) node('inline-vehicle-image').src = vehicle.image;
      else node('inline-vehicle-image').removeAttribute('src');
    }
    node('price-detail').textContent = pricingDescription(estimate);
  }

  function renderErrors() {
    const summary = node('errors');
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
    ['service', 'origin', 'destination', 'date', 'time', 'passengers', 'bags', 'vehicle', 'name', 'phone', 'flight', 'notes'].forEach(function (name) {
      const error = node('error-' + name);
      if (!error) return;
      error.textContent = errors[name] ? t(errors[name]) : '';
      error.hidden = !errors[name];
      field(name).setAttribute('aria-invalid', String(!!errors[name]));
    });
    summary.hidden = Object.keys(errors).length === 0;
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
    if (!vehicleIn(config, draft.vehicle)) errors.vehicle = 'vehicleError';
    ['origin', 'destination', 'name', 'phone'].forEach(function (name) { if (!draft[name]) errors[name] = 'requiredError'; });
    Object.entries({origin: 180, destination: 180, name: 80, phone: 30, flight: 30, notes: 600}).forEach(function (entry) { if (draft[entry[0]].length > entry[1]) errors[entry[0]] = 'longError'; });
    const phoneDigits = draft.phone.replace(/\D/g, '');
    if (draft.phone && (!/^\+?[0-9() .-]+$/.test(draft.phone) || phoneDigits.length < 10 || phoneDigits.length > 15)) errors.phone = 'phoneError';
    if (!/^\d+$/.test(draft.passengers) || Number(draft.passengers) < 1 || Number(draft.passengers) > 99) errors.passengers = 'passengersError';
    if (!/^\d+$/.test(draft.bags) || Number(draft.bags) > 99) errors.bags = 'bagsError';
    updateDateMinimum();
    const future = isFutureDateTime(draft.date, draft.time);
    if (!future.valid) errors[future.reason === 'dateError' ? 'date' : 'time'] = future.reason;
    const vehicle = vehicleIn(config, draft.vehicle);
    if (vehicle) {
      if (Number.isInteger(vehicle.passengers) && vehicle.passengers > 0 && Number(draft.passengers) > vehicle.passengers) errors.passengers = 'capacityPassengers';
      if (Number.isInteger(vehicle.bags) && vehicle.bags >= 0 && draft.bags && Number(draft.bags) > vehicle.bags) errors.bags = 'capacityBags';
    }
    renderErrors();
    if (Object.keys(errors).length) { clearReview(false); node('errors').focus(); return null; }
    return draft;
  }

  function dateLabel(value) { const parts = value.split('-'); return language === 'en' ? value : parts[2] + '/' + parts[1] + '/' + parts[0]; }
  function summaryEntries(draft, estimate) {
    const vehicle = vehicleIn(config, draft.vehicle);
    const entries = [
      ['service', t(draft.service)], ['vehicle', vehicle ? vehicle.name : ''],
      ['origin', draft.origin], ['destination', draft.destination],
      ['date', dateLabel(draft.date)], ['time', draft.time + ' · ' + t('saoPaulo')],
      ['passengers', draft.passengers], ['bags', draft.bags || t('notInformed')],
      ['name', draft.name], ['phone', draft.phone]
    ];
    if (draft.flight) entries.push(['flight', draft.flight]);
    if (draft.notes) entries.push(['notes', draft.notes]);
    entries.push(['estimate', estimate.status === 'estimate' ? money(estimate.amount) : t('consult')]);
    return entries;
  }

  function renderReview() {
    if (!reviewed) return;
    const details = node('review-details');
    details.replaceChildren();
    summaryEntries(reviewed.draft, reviewed.estimate).forEach(function (entry) {
      const row = document.createElement('div');
      const dt = document.createElement('dt');
      const dd = document.createElement('dd');
      dt.textContent = t(entry[0]); dd.textContent = entry[1];
      if (entry[0] === 'notes' || entry[0] === 'estimate') row.classList.add('booking-summary-wide');
      if (entry[0] === 'estimate') row.classList.add('booking-summary-price');
      row.appendChild(dt); row.appendChild(dd); details.appendChild(row);
    });
    node('review-price-note').textContent = pricingDescription(reviewed.estimate);
    if (opened) fallback.href = messageUrl();
  }

  function messageUrl() {
    if (!reviewed) return '';
    const whatsapp = String(config.whatsapp || (window.HBC_CONFIG || {}).whatsapp || '5511960781389').replace(/\D/g, '');
    if (!/^\d{10,15}$/.test(whatsapp)) return '';
    const lines = [t('messageIntro'), ''];
    summaryEntries(reviewed.draft, reviewed.estimate).forEach(function (entry) { lines.push(t(entry[0]) + ': ' + entry[1]); });
    lines.push('', pricingDescription(reviewed.estimate), '', t('messageEnd'));
    return 'https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(lines.join('\n'));
  }

  function setLanguage(next) {
    if (next !== 'pt' && next !== 'en') return;
    language = next;
    if (!scope || !form) return;
    renderStatic(); renderVehicles(); renderRoutes(); renderPreview(); renderErrors(); renderReview();
    if (statusKey) setStatus(statusKey);
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const draft = validate();
    if (!draft) return;
    reviewed = {draft: draft, estimate: calculateEstimate(draft)};
    opened = false; continueButton.disabled = false;
    fallback.hidden = true; fallback.removeAttribute('href'); setStatus('');
    renderReview(); review.hidden = false; review.focus({preventScroll: true});
    review.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest'});
  });

  form.addEventListener('input', function (event) {
    if (event.target.name && errors[event.target.name]) { delete errors[event.target.name]; renderErrors(); }
    clearReview(true); renderPreview();
  });
  form.addEventListener('change', function (event) {
    if (event.target.name === 'service') renderRoutes();
    if (event.target.name === 'route') {
      const route = routeFor(field('route').value);
      field('origin').readOnly = !!route; field('destination').readOnly = !!route;
      if (route) { field('origin').value = route.origin; field('destination').value = route.destination; }
    }
    clearReview(true); renderPreview();
  });
  form.addEventListener('reset', function () {
    clearReview(false); errors = {}; renderErrors();
    setTimeout(function () { renderRoutes(); renderPreview(); }, 0);
  });
  node('edit').addEventListener('click', function () { clearReview(false); field('service').focus(); });
  continueButton.addEventListener('click', function () {
    if (!reviewed) return;
    const previous = reviewed;
    const draft = validate();
    if (!draft) return;
    const estimate = calculateEstimate(draft);
    if (JSON.stringify(draft) !== JSON.stringify(previous.draft) || JSON.stringify(estimate) !== JSON.stringify(previous.estimate)) { clearReview(true); field('service').focus(); return; }
    const url = messageUrl();
    if (!url) { setStatus('whatsappError'); return; }
    opened = true; fallback.href = url; fallback.hidden = false; setStatus('ready');
    try { window.open(url, '_blank', 'noopener,noreferrer'); } catch (_) { /* The visible fallback remains available. */ }
  });
  document.querySelectorAll('[data-booking-service], [data-booking-vehicle]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (serviceIds.includes(link.dataset.bookingService)) { field('service').value = link.dataset.bookingService; renderRoutes(); }
      if (vehicleIn(config, link.dataset.bookingVehicle)) field('vehicle').value = link.dataset.bookingVehicle;
      clearReview(true); renderPreview();
    });
  });
  document.addEventListener('hbc:language', function (event) { setLanguage(event.detail && (event.detail.language || event.detail.lang)); });
  document.querySelectorAll('[data-lang]').forEach(function (button) { button.addEventListener('click', function () { setLanguage(button.dataset.lang); }); });
  updateDateMinimum(); renderVehicles(); renderRoutes(); renderStatic(); renderPreview();
  form.noValidate = true;
  form.querySelectorAll('[data-booking-requires-js]').forEach(function (element) { element.disabled = false; });
})();
