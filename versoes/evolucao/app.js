/* High Business Class — sem dependências, funciona também por file://. */
(function () {
  'use strict';

  const config = Object.assign({
    whatsapp: '5511960781389',
    email: 'high.class.agendamentos@gmail.com',
    instagramUrl: '',
    timeZone: 'America/Sao_Paulo',
    menuBreakpoint: 1180,
    emitEvents: true
  }, window.HBC_CONFIG || {});
  const serviceIds = ['aeroporto', 'corporativo', 'disposicao', 'eventos', 'aviacao', 'receptivo', 'assistants', 'familyoffice', 'hoteis'];
  const dictionary = {
    pt: {
      'nav.home': 'Início', 'nav.services': 'Serviços', 'nav.fleet': 'Nossa frota',
      'nav.why': 'Por que a HBC', 'nav.about': 'Sobre', 'nav.contact': 'Contato',
      'cta.quote': 'Solicitar orçamento', 'cta.whatsapp': 'Falar no WhatsApp',
      'cta.service': 'Consultar este serviço', 'cta.gallery': 'Ver fotos',
      'aria.menuOpen': 'Abrir menu', 'aria.menuClose': 'Fechar menu',
      'aria.galleryClose': 'Fechar galeria', 'aria.whatsapp': 'Falar com a High Business Class pelo WhatsApp',
      'aria.instagram': 'Instagram da High Business Class (abre em nova aba)',
      'service.aeroporto.title': 'Transfer aeroporto',
      'service.corporativo.title': 'Transporte corporativo',
      'service.disposicao.title': 'Disposição executiva',
      'service.eventos.title': 'Eventos',
      'service.aviacao.title': 'Aviação Executiva & FBO',
      'service.hoteis.title': 'Hotéis',
      'service.receptivo.title': 'Receptivo Executivo',
      'service.assistants.title': 'Assistants & Secretaries',
      'service.familyoffice.title': 'Family Office & Private Clients',
      'quote.fallback': 'Continuar no WhatsApp',
      'quote.ready': 'Seu resumo está pronto. Envie a mensagem no WhatsApp para solicitar disponibilidade e orçamento. Se a nova aba não abriu, use o link abaixo.',
      'quote.invalid': 'Confira os campos indicados antes de continuar.',
      'quote.invalidService': 'Selecione um serviço.',
      'quote.invalidDate': 'Escolha a data de hoje ou uma data futura.',
      'quote.invalidTime': 'Informe um horário válido.',
      'quote.invalidPassengers': 'Informe um número inteiro de passageiros entre 1 e 99.',
      'quote.invalidBags': 'Informe um número inteiro de bagagens entre 0 e 99.',
      'quote.invalidText': 'Preencha este campo.',
      'quote.tooLong': 'Reduza o texto deste campo.',
      'quote.unavailable': 'Não foi possível preparar o WhatsApp. Entre em contato pelo e-mail informado no site.',
      'whatsapp.intro': 'Olá! Vim pelo site da High Business Class e gostaria de solicitar um orçamento.',
      'whatsapp.serviceIntro': 'Olá! Vim pelo site da High Business Class e gostaria de um orçamento para: ',
      'whatsapp.quoteIntro': 'Olá! Gostaria de solicitar um orçamento pela High Business Class.',
      'whatsapp.name': 'Nome', 'whatsapp.service': 'Serviço', 'whatsapp.origin': 'Origem',
      'whatsapp.destination': 'Destino', 'whatsapp.date': 'Data', 'whatsapp.time': 'Horário',
      'whatsapp.passengers': 'Passageiros', 'whatsapp.bags': 'Bagagens', 'whatsapp.notes': 'Observações',
      'whatsapp.timeZone': 'horário local na origem',
      'whatsapp.confirmation': 'Podem informar a disponibilidade e o valor? Aguardo a confirmação do atendimento.'
    },
    en: {
      'nav.home': 'Home', 'nav.services': 'Services', 'nav.fleet': 'Our fleet',
      'nav.why': 'Why HBC', 'nav.about': 'About', 'nav.contact': 'Contact',
      'cta.quote': 'Request a quote', 'cta.whatsapp': 'Chat on WhatsApp',
      'cta.service': 'Ask about this service', 'cta.gallery': 'View photos',
      'aria.menuOpen': 'Open menu', 'aria.menuClose': 'Close menu',
      'aria.galleryClose': 'Close gallery', 'aria.whatsapp': 'Contact High Business Class on WhatsApp',
      'aria.instagram': 'High Business Class on Instagram (opens in a new tab)',
      'service.aeroporto.title': 'Airport transfers',
      'service.corporativo.title': 'Corporate transportation',
      'service.disposicao.title': 'Chauffeur at disposal',
      'service.eventos.title': 'Events',
      'service.aviacao.title': 'EXECUTIVE AVIATION & FBO',
      'service.hoteis.title': 'Hotels',
      'service.receptivo.title': 'Executive Meet & Greet',
      'service.assistants.title': 'Assistants & Secretaries',
      'service.familyoffice.title': 'Family Office & Private Clients',
      'quote.fallback': 'Continue on WhatsApp',
      'quote.ready': 'Your summary is ready. Send the message on WhatsApp to request availability and a quote. If the new tab did not open, use the link below.',
      'quote.invalid': 'Please check the indicated fields before continuing.',
      'quote.invalidService': 'Please select a service.',
      'quote.invalidDate': 'Please choose today or a future date.',
      'quote.invalidTime': 'Please enter a valid time.',
      'quote.invalidPassengers': 'Please enter a whole number of passengers between 1 and 99.',
      'quote.invalidBags': 'Please enter a whole number of bags between 0 and 99.',
      'quote.invalidText': 'Please complete this field.',
      'quote.tooLong': 'Please shorten the text in this field.',
      'quote.unavailable': 'We could not prepare WhatsApp. Please use the email address on this website to contact us.',
      'whatsapp.intro': 'Hello! I found High Business Class through your website and would like to request a quote.',
      'whatsapp.serviceIntro': 'Hello! I found High Business Class through your website and would like a quote for: ',
      'whatsapp.quoteIntro': 'Hello! I would like to request a quote from High Business Class.',
      'whatsapp.name': 'Name', 'whatsapp.service': 'Service', 'whatsapp.origin': 'Pick-up',
      'whatsapp.destination': 'Destination', 'whatsapp.date': 'Date', 'whatsapp.time': 'Time',
      'whatsapp.passengers': 'Passengers', 'whatsapp.bags': 'Bags', 'whatsapp.notes': 'Notes',
      'whatsapp.timeZone': 'local time at pick-up',
      'whatsapp.confirmation': 'Could you let me know the availability and price? I will wait for your confirmation of the service.'
    }
  };

  let language = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'pt';
  let quotePrepared = false;
  let quoteStatusKey = '';
  let quoteStatusError = false;
  let activeGalleryTrigger = null;
  let galleryReturnFocus = null;
  const form = document.getElementById('quote-form');
  const fallback = document.getElementById('quote-fallback');
  const menu = document.getElementById('site-nav');
  const menuToggle = document.getElementById('menu-toggle');
  const serviceNavigation = document.getElementById('nav-services');
  const gallery = document.getElementById('gallery-dialog');
  const galleryImage = document.getElementById('gallery-image');
  const galleryCaption = document.getElementById('gallery-caption');
  const galleryClose = document.getElementById('gallery-close');
  const translations = [];

  function t(key) {
    return dictionary[language][key] || dictionary.pt[key] || key;
  }

  // The Portuguese source is captured once; switching languages never rewrites markup.
  [
    { selector: '[data-i18n]', key: 'i18n', attribute: null, suffix: '' },
    { selector: '[data-i18n-placeholder]', key: 'i18nPlaceholder', attribute: 'placeholder', suffix: 'Placeholder' },
    { selector: '[data-i18n-aria]', key: 'i18nAria', attribute: 'aria-label', suffix: 'Aria' },
    { selector: '[data-i18n-alt]', key: 'i18nAlt', attribute: 'alt', suffix: 'Alt' }
  ].forEach(function (kind) {
    document.querySelectorAll(kind.selector).forEach(function (element) {
      const key = element.dataset[kind.key];
      const original = kind.attribute ? (element.getAttribute(kind.attribute) || '') : element.textContent;
      translations.push({
        element: element,
        attribute: kind.attribute,
        pt: element.dataset['pt' + kind.suffix] !== undefined ? element.dataset['pt' + kind.suffix] : original,
        en: element.dataset['en' + kind.suffix] !== undefined ? element.dataset['en' + kind.suffix] : (dictionary.en[key] || original)
      });
    });
  });

  function emit(action, service, position) {
    if (!config.emitEvents) return;
    const metadata = {
      action: action,
      service: serviceIds.includes(service) ? service : '',
      position: /^[a-z0-9_-]{1,40}$/i.test(position || '') ? position : 'unknown'
    };
    // No form fields, contact details, URLs or message text enter these events.
    document.dispatchEvent(new CustomEvent('hbc:action', { detail: metadata }));
  }

  function whatsappUrl(message) {
    const number = String(config.whatsapp || '').replace(/\D/g, '');
    if (!/^\d{10,15}$/.test(number)) return '';
    return 'https://wa.me/' + number + '?text=' + encodeURIComponent(message);
  }

  function updateWhatsAppLinks() {
    document.querySelectorAll('a[data-whatsapp]').forEach(function (link) {
      const service = link.dataset.service;
      const message = serviceIds.includes(service)
        ? t('whatsapp.serviceIntro') + t('service.' + service + '.title') + '.'
        : t('whatsapp.intro');
      const url = whatsappUrl(message);
      if (url) link.href = url;
      if (link.target === '_blank') link.rel = 'noopener noreferrer';
    });
  }

  function updateMetadata() {
    const seo = config.seo && config.seo[language];
    if (!seo) return;
    if (seo.title) {
      document.title = seo.title;
      document.querySelectorAll('meta[property="og:title"], meta[name="twitter:title"]').forEach(function (meta) {
        meta.content = seo.title;
      });
    }
    if (seo.description) {
      document.querySelectorAll('meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]').forEach(function (meta) {
        meta.content = seo.description;
      });
    }
    const locale = document.querySelector('meta[property="og:locale"]');
    if (locale) locale.content = language === 'en' ? 'en_US' : 'pt_BR';
  }

  function menuIsOpen() {
    return !!(menuToggle && menuToggle.getAttribute('aria-expanded') === 'true');
  }

  function setMenu(open, returnFocus) {
    if (!menu || !menuToggle) return;
    menu.classList.toggle('is-open', open);
    menu.classList.toggle('open', open);
    document.documentElement.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', t(open ? 'aria.menuClose' : 'aria.menuOpen'));
    if (serviceNavigation) serviceNavigation.open = !!(open && window.innerWidth <= Number(config.menuBreakpoint));
    if (returnFocus) menuToggle.focus({ preventScroll: true });
  }

  function setLanguage(next) {
    if (next !== 'pt' && next !== 'en') return;
    language = next;
    document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR';
    translations.forEach(function (entry) {
      const value = entry[language];
      if (entry.attribute) entry.element.setAttribute(entry.attribute, value);
      else entry.element.textContent = value;
    });
    document.querySelectorAll('[data-lang]').forEach(function (button) {
      const active = button.dataset.lang === language;
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('active', active);
      button.classList.toggle('is-active', active);
    });
    setMenu(false, false);
    updateWhatsAppLinks();
    updateMetadata();
    document.querySelectorAll('a[data-instagram]:not([data-i18n-aria])').forEach(function (link) {
      link.setAttribute('aria-label', t('aria.instagram'));
    });
    if (galleryClose && !galleryClose.hasAttribute('data-i18n-aria')) galleryClose.setAttribute('aria-label', t('aria.galleryClose'));
    if (activeGalleryTrigger) updateGalleryContent(activeGalleryTrigger);
    if (form) {
      Array.from(form.elements).forEach(function (field) {
        if (typeof field.setCustomValidity === 'function') field.setCustomValidity('');
      });
    }
    if (quotePrepared && fallback && form) {
      fallback.href = whatsappUrl(buildQuoteMessage());
      setQuoteStatus('quote.ready');
      if (!fallback.hasAttribute('data-i18n')) fallback.textContent = t('quote.fallback');
    } else if (quoteStatusKey) setQuoteStatus(quoteStatusKey, quoteStatusError);
    document.dispatchEvent(new CustomEvent('hbc:language', { detail: { language: language } }));
  }

  document.querySelectorAll('[data-lang]').forEach(function (button) {
    button.addEventListener('click', function () {
      setLanguage(button.dataset.lang);
      emit('language_change', '', 'language_switch');
    });
  });

  if (menu && menuToggle) {
    menuToggle.addEventListener('click', function () { setMenu(!menuIsOpen(), false); });
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false, false); });
    });
    document.addEventListener('click', function (event) {
      if (menuIsOpen() && !menu.contains(event.target) && !menuToggle.contains(event.target)) setMenu(false, false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > Number(config.menuBreakpoint || 960)) setMenu(false, false);
    }, { passive: true });
  }

  if (serviceNavigation) {
    document.addEventListener('click', function (event) {
      if (serviceNavigation.open && !serviceNavigation.contains(event.target) && !menuToggle.contains(event.target)) serviceNavigation.open = false;
    });
    serviceNavigation.addEventListener('focusout', function () {
      window.setTimeout(function () {
        if (window.innerWidth > Number(config.menuBreakpoint) && !serviceNavigation.contains(document.activeElement)) serviceNavigation.open = false;
      }, 0);
    });
  }

  document.querySelectorAll('a[data-whatsapp]').forEach(function (link) {
    link.addEventListener('click', function () {
      emit('whatsapp_click', link.dataset.service, link.dataset.position);
    });
  });

  // A missing official Instagram account never produces a placeholder link.
  let instagramUrl = '';
  try {
    const candidate = new URL(config.instagramUrl);
    if (candidate.protocol === 'https:' && (candidate.hostname === 'instagram.com' || candidate.hostname.endsWith('.instagram.com'))) instagramUrl = candidate.href;
  } catch (_) { /* The account is still awaiting confirmation. */ }
  document.querySelectorAll('a[data-instagram]').forEach(function (link) {
    link.hidden = !instagramUrl;
    if (!instagramUrl) {
      link.removeAttribute('href');
      return;
    }
    link.href = instagramUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    if (!link.hasAttribute('data-i18n-aria')) link.setAttribute('aria-label', t('aria.instagram'));
    link.addEventListener('click', function () { emit('instagram_click', '', link.dataset.position); });
  });
  document.querySelectorAll('a[data-email]').forEach(function (link) {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email || '')) link.href = 'mailto:' + config.email;
  });

  function field(name) {
    return form ? form.elements.namedItem(name) : null;
  }

  function value(name) {
    const element = field(name);
    return element && typeof element.value === 'string' ? element.value.trim().replace(/[\r\n]+/g, ' ') : '';
  }

  function todayInServiceZone() {
    const now = new Date();
    try {
      const parts = new Intl.DateTimeFormat('en', {
        timeZone: config.timeZone,
        year: 'numeric', month: '2-digit', day: '2-digit'
      }).formatToParts(now);
      const part = function (type) { return parts.find(function (entry) { return entry.type === type; }).value; };
      return part('year') + '-' + part('month') + '-' + part('day');
    } catch (_) {
      return now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
    }
  }

  function setQuoteStatus(key, error) {
    quoteStatusKey = key;
    quoteStatusError = !!error;
    let status = document.getElementById('quote-status');
    if (!status && form) {
      status = document.createElement('p');
      status.id = 'quote-status';
      form.appendChild(status);
    }
    if (status) {
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      status.textContent = key ? t(key) : '';
      status.classList.toggle('is-error', !!error);
    }
  }

  function invalidate(name, message) {
    const element = field(name);
    if (element && typeof element.setCustomValidity === 'function') element.setCustomValidity(message);
  }

  function validateQuote() {
    if (!form) return false;
    Array.from(form.elements).forEach(function (element) {
      if (typeof element.setCustomValidity === 'function') element.setCustomValidity('');
    });
    if (!serviceIds.includes(value('service'))) invalidate('service', t('quote.invalidService'));
    ['origin', 'destination'].forEach(function (name) {
      if (!value(name)) invalidate(name, t('quote.invalidText'));
    });
    const date = value('date');
    const dateField = field('date');
    if (dateField) dateField.min = todayInServiceZone();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < todayInServiceZone()) invalidate('date', t('quote.invalidDate'));
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value('time'))) invalidate('time', t('quote.invalidTime'));
    if (!/^\d+$/.test(value('passengers')) || Number(value('passengers')) < 1 || Number(value('passengers')) > 99) invalidate('passengers', t('quote.invalidPassengers'));
    if (value('bags') && (!/^\d+$/.test(value('bags')) || Number(value('bags')) > 99)) invalidate('bags', t('quote.invalidBags'));
    Object.entries({ origin: 180, destination: 180, name: 80, notes: 600 }).forEach(function (entry) {
      if (value(entry[0]).length > entry[1]) invalidate(entry[0], t('quote.tooLong'));
    });
    if (!form.checkValidity()) {
      setQuoteStatus('quote.invalid', true);
      form.reportValidity();
      return false;
    }
    return true;
  }

  function displayDate(iso) {
    const parts = iso.split('-');
    if (parts.length !== 3) return iso;
    return language === 'en' ? parts[0] + '-' + parts[1] + '-' + parts[2] : parts[2] + '/' + parts[1] + '/' + parts[0];
  }

  function buildQuoteMessage() {
    const lines = [t('whatsapp.quoteIntro'), ''];
    if (value('name')) lines.push(t('whatsapp.name') + ': ' + value('name'));
    const service = value('service');
    lines.push(t('whatsapp.service') + ': ' + (serviceIds.includes(service) ? t('service.' + service + '.title') : service));
    lines.push(t('whatsapp.origin') + ': ' + value('origin'));
    lines.push(t('whatsapp.destination') + ': ' + value('destination'));
    lines.push(t('whatsapp.date') + ': ' + displayDate(value('date')));
    lines.push(t('whatsapp.time') + ': ' + value('time') + ' (' + t('whatsapp.timeZone') + ')');
    lines.push(t('whatsapp.passengers') + ': ' + value('passengers'));
    if (value('bags')) lines.push(t('whatsapp.bags') + ': ' + value('bags'));
    if (value('notes')) lines.push(t('whatsapp.notes') + ': ' + value('notes'));
    lines.push('', t('whatsapp.confirmation'));
    return lines.join('\n');
  }

  function clearQuoteFeedback() {
    if (quotePrepared) {
      quotePrepared = false;
      if (fallback) {
        fallback.hidden = true;
        fallback.removeAttribute('href');
      }
      setQuoteStatus('');
    }
  }

  if (fallback) {
    fallback.hidden = true;
    fallback.removeAttribute('href');
    fallback.target = '_blank';
    fallback.rel = 'noopener noreferrer';
    fallback.addEventListener('click', function () { emit('whatsapp_click', value('service'), 'quote_fallback'); });
  }
  if (form) {
    ['service', 'origin', 'destination', 'date', 'time', 'passengers'].forEach(function (name) {
      const element = field(name);
      if (element) element.required = true;
    });
    if (field('date')) field('date').min = todayInServiceZone();
    Array.from(form.elements).forEach(function (element) {
      ['input', 'change'].forEach(function (eventName) {
        element.addEventListener(eventName, function () {
          if (typeof element.setCustomValidity === 'function') element.setCustomValidity('');
          clearQuoteFeedback();
        });
      });
    });
    // Keep browser validation accessible and in the selected site language.
    form.addEventListener('invalid', function (event) {
      const element = event.target;
      clearQuoteFeedback();
      if (element.validity && !element.validity.customError) {
        const messages = {
          service: 'quote.invalidService', date: 'quote.invalidDate', time: 'quote.invalidTime',
          passengers: 'quote.invalidPassengers', bags: 'quote.invalidBags'
        };
        element.setCustomValidity(t(messages[element.name] || 'quote.invalidText'));
      }
      setQuoteStatus('quote.invalid', true);
    }, true);
    form.addEventListener('reset', function () {
      clearQuoteFeedback();
      Array.from(form.elements).forEach(function (element) {
        if (typeof element.setCustomValidity === 'function') element.setCustomValidity('');
      });
      setQuoteStatus('');
    });
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!validateQuote()) return;
      const url = whatsappUrl(buildQuoteMessage());
      if (!url) {
        setQuoteStatus('quote.unavailable', true);
        return;
      }
      quotePrepared = true;
      if (fallback) {
        fallback.href = url;
        fallback.hidden = false;
        if (!fallback.hasAttribute('data-i18n')) fallback.textContent = t('quote.fallback');
      }
      setQuoteStatus('quote.ready');
      emit('quote_open', value('service'), 'quote_form');
      // Synchronous user gesture. The visible link also works if popups are blocked.
      try { window.open(url, '_blank', 'noopener,noreferrer'); } catch (_) { /* Use the visible fallback. */ }
    });
  }

  function galleryText(trigger) {
    const child = trigger.querySelector('img');
    const key = trigger.dataset.captionKey || trigger.dataset.galleryCaptionKey;
    const alt = trigger.dataset[language === 'en' ? 'altEn' : 'altPt'] || trigger.dataset.alt || (child && child.alt) || '';
    return { alt: alt, caption: key ? t(key) : (trigger.dataset[language === 'en' ? 'captionEn' : 'captionPt'] || trigger.dataset.caption || alt) };
  }

  function updateGalleryContent(trigger) {
    if (!galleryImage) return;
    const text = galleryText(trigger);
    galleryImage.src = trigger.dataset.src || '';
    galleryImage.alt = text.alt;
    if (galleryCaption) galleryCaption.textContent = text.caption;
  }

  function restoreGalleryFocus() {
    activeGalleryTrigger = null;
    if (galleryReturnFocus && galleryReturnFocus.isConnected) galleryReturnFocus.focus({ preventScroll: true });
    galleryReturnFocus = null;
  }

  function closeGallery() {
    if (!gallery || !gallery.hasAttribute('open')) return;
    if (typeof gallery.close === 'function') gallery.close();
    else {
      gallery.removeAttribute('open');
      restoreGalleryFocus();
    }
  }

  if (gallery && galleryImage) {
    document.querySelectorAll('[data-gallery]').forEach(function (trigger) {
      trigger.addEventListener('click', function (event) {
        if (!trigger.dataset.src) return;
        event.preventDefault();
        setMenu(false, false);
        activeGalleryTrigger = trigger;
        galleryReturnFocus = trigger;
        updateGalleryContent(trigger);
        if (typeof gallery.showModal === 'function') {
          if (!gallery.open) gallery.showModal();
        } else {
          gallery.setAttribute('open', '');
          gallery.setAttribute('role', 'dialog');
          gallery.setAttribute('aria-modal', 'true');
        }
        if (galleryClose) galleryClose.focus({ preventScroll: true });
        emit('gallery_open', '', 'fleet');
      });
    });
    if (galleryClose) galleryClose.addEventListener('click', closeGallery);
    gallery.addEventListener('cancel', function (event) { event.preventDefault(); closeGallery(); });
    gallery.addEventListener('close', restoreGalleryFocus);
    gallery.addEventListener('click', function (event) {
      if (event.target === gallery) closeGallery();
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      if (gallery && gallery.hasAttribute('open')) closeGallery();
      else if (serviceNavigation && serviceNavigation.open) {
        serviceNavigation.open = false;
        serviceNavigation.querySelector('summary').focus({ preventScroll: true });
      }
      else if (menuIsOpen()) setMenu(false, true);
    }
    // Native <dialog> traps focus. This is only for older browsers without it.
    if (event.key === 'Tab' && gallery && gallery.hasAttribute('open') && typeof gallery.showModal !== 'function') {
      const focusable = Array.from(gallery.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  setLanguage(language);
  // The unenhanced form stays disabled; the no-JS contact link remains available.
  if (form) form.querySelectorAll('[data-requires-js]').forEach(function (element) { element.disabled = false; });
})();
