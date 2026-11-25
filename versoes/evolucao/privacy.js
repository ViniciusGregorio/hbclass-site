/* Consentimento prévio: nenhuma tag, ping ou conexão ao Google antes do aceite. */
(function () {
  'use strict';

  const config = window.HBC_PRIVACY_CONFIG || {};
  const analytics = config.analytics || {};
  const measurementId = String(analytics.measurementId || '').trim();
  const version = String(config.policyVersion || '2026-11-23');
  const storageKey = 'hbc-privacy-choice';
  const day = 86400000;
  const consentDays = Math.min(365, Math.max(1, Number(config.consentMaxAgeDays) || 180));
  const cookieDays = Math.min(365, Math.max(1, Number(analytics.cookieLifetimeDays) || 180));
  const available = analytics.enabled === true && analytics.setupReviewed === true && /^G-[A-Z0-9]{4,20}$/.test(measurementId) && /^https?:$/.test(window.location.protocol);
  const policyPage = document.body.classList.contains('privacy-page');
  const banner = document.getElementById('privacy-banner');
  const dialog = document.getElementById('privacy-dialog');
  const checkbox = document.getElementById('privacy-analytics');
  const actions = new Set(['language_change', 'whatsapp_click', 'instagram_click', 'quote_open', 'gallery_open', 'booking_review', 'booking_whatsapp']);
  const services = new Set(['aeroporto', 'corporativo', 'disposicao', 'eventos', 'aviacao', 'receptivo', 'assistants', 'familyoffice', 'hoteis']);
  const positions = new Set(['language_switch', 'header', 'hero', 'services_intro', 'service', 'service_details', 'fleet', 'contact', 'footer', 'floating', 'quote_form', 'quote_fallback', 'journey_planner', 'unknown']);
  let choice = null;
  let active = false;
  let script = null;
  let returnFocus = null;
  let reloadPending = false;
  let storageAvailable = true;

  function language() { return document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'pt'; }
  function translated(pt, en) { return language() === 'en' ? en : pt; }

  function readChoice() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (!saved || saved.version !== version || !['granted', 'denied'].includes(saved.analytics) || !Number.isFinite(saved.updatedAt)) { localStorage.removeItem(storageKey); return null; }
      const age = Date.now() - saved.updatedAt;
      if (age >= 0 && age < consentDays * day) return saved.analytics;
      localStorage.removeItem(storageKey);
      return null;
    } catch (_) { storageAvailable = false; return null; }
  }

  function saveChoice(value) {
    choice = value;
    try {
      // No names, journeys, dates, contact details, URLs or GA identifiers.
      localStorage.setItem(storageKey, JSON.stringify({ version: version, analytics: value, updatedAt: Date.now() }));
      storageAvailable = true;
    } catch (_) { storageAvailable = false; }
  }

  function clearAnalyticsCookies() {
    const names = document.cookie.split(';').map(function (item) { return item.trim().split('=')[0]; }).filter(function (name) { return /^(_ga(?:_|$)|_gid$|_gat(?:_|$))/.test(name); });
    const host = window.location.hostname;
    const domains = [''];
    if (host && host !== 'localhost' && !/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
      const labels = host.split('.');
      for (let i = 0; i < labels.length - 1; i += 1) {
        domains.push(labels.slice(i).join('.'), '.' + labels.slice(i).join('.'));
      }
    }
    const paths = new Set(['/']);
    const parts = window.location.pathname.split('/').filter(Boolean);
    parts.pop();
    for (let i = 1; i <= parts.length; i += 1) paths.add('/' + parts.slice(0, i).join('/') + '/');
    names.forEach(function (name) {
      domains.forEach(function (domain) {
        paths.forEach(function (path) {
          document.cookie = name + '=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=' + path + (domain ? '; domain=' + domain : '') + '; SameSite=Lax' + (window.location.protocol === 'https:' ? '; Secure' : '');
        });
      });
    });
  }

  function cleanLocation() {
    // These are static pages. Search strings, fragments and referring URLs stay out.
    return window.location.origin + window.location.pathname;
  }

  function pageParameters() {
    return {
      page_location: cleanLocation(),
      page_referrer: '',
      page_title: policyPage ? 'High Business Class | Privacy' : 'High Business Class | Website'
    };
  }

  function command() {
    if (!active || choice !== 'granted' || !available || reloadPending) return;
    window.dataLayer.push(arguments);
  }

  function startAnalytics() {
    if (!available || choice !== 'granted' || active || reloadPending) return;
    // Only this integration owns the tag. No tag manager, advertising or User-ID.
    active = true;
    window['ga-disable-' + measurementId] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = command;
    command('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    command('consent', 'update', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    command('set', Object.assign(pageParameters(), { allow_google_signals: false, allow_ad_personalization_signals: false, ads_data_redaction: true, url_passthrough: false }));
    command('js', new Date());
    command('config', measurementId, Object.assign(pageParameters(), {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      ignore_referrer: true,
      cookie_domain: 'none',
      cookie_expires: cookieDays * 86400,
      cookie_update: false,
      cookie_flags: 'SameSite=Lax' + (window.location.protocol === 'https:' ? ';Secure' : '')
    }));
    // Enhanced measurement must also be disabled in the GA4 account before activation.
    command('event', 'page_view', Object.assign(pageParameters(), { send_to: measurementId }));
    script = document.createElement('script');
    script.id = 'hbc-analytics-tag';
    script.async = true;
    script.referrerPolicy = 'no-referrer';
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    document.head.appendChild(script);
  }

  function stopAnalytics() {
    const wasStarted = active || !!script;
    active = false;
    if (/^G-[A-Z0-9]{4,20}$/.test(measurementId)) window['ga-disable-' + measurementId] = true;
    if (wasStarted) {
      // Do not send a consent-update ping after revocation. Block, purge, then unload.
      reloadPending = true;
      if (window.dataLayer) window.dataLayer.length = 0;
      window.gtag = function () {};
      if (script) script.remove();
    }
    clearAnalyticsCookies();
    if (wasStarted) window.setTimeout(function () { window.location.reload(); }, 0);
  }

  function updateText() {
    const lang = language();
    document.querySelectorAll('[data-privacy-pt]').forEach(function (element) {
      const value = lang === 'en' ? element.dataset.privacyEn : element.dataset.privacyPt;
      if (value !== undefined) element.textContent = value;
    });
    document.querySelectorAll('[data-privacy-aria-pt]').forEach(function (element) {
      element.setAttribute('aria-label', lang === 'en' ? element.dataset.privacyAriaEn : element.dataset.privacyAriaPt);
    });
    document.querySelectorAll('[data-privacy-policy-link]').forEach(function (link) { link.href = 'privacidade.html' + (lang === 'en' ? '?lang=en' : ''); });
    document.querySelectorAll('[data-privacy-status]').forEach(function (element) {
      element.textContent = !available
        ? translated('Estatísticas opcionais desativadas neste site.', 'Optional analytics are disabled on this website.')
        : choice === 'granted'
          ? translated('Estatísticas autorizadas. A escolha pode ser alterada a qualquer momento.', 'Analytics allowed. This choice can be changed at any time.')
          : translated('Estatísticas não autorizadas. A navegação continua normalmente.', 'Analytics are not allowed. You can keep browsing as usual.');
    });
    document.querySelectorAll('[data-privacy-storage-note]').forEach(function (element) {
      element.hidden = storageAvailable;
      element.textContent = translated('O navegador não permitiu salvar a preferência. A escolha vale apenas nesta visita.', 'Your browser could not save this preference. This choice applies only to this visit.');
    });
    if (checkbox) { checkbox.checked = available && choice === 'granted'; checkbox.disabled = !available; }
    document.querySelectorAll('[data-privacy-accept]').forEach(function (button) { button.disabled = !available; });
    if (banner) banner.hidden = !available || choice !== null;
    if (policyPage) {
      document.title = translated('Privacidade e cookies | High Business Class', 'Privacy and cookies | High Business Class');
      document.querySelectorAll('[data-lang]').forEach(function (button) {
        const selected = button.dataset.lang === lang;
        button.setAttribute('aria-pressed', String(selected));
        button.classList.toggle('active', selected);
      });
    }
  }

  function closePreferences() {
    if (!dialog) return;
    if (typeof dialog.close === 'function' && dialog.open) dialog.close();
    else { dialog.removeAttribute('open'); document.documentElement.classList.remove('privacy-dialog-open'); if (returnFocus) returnFocus.focus({ preventScroll: true }); }
  }

  function openPreferences(trigger) {
    if (!dialog) return;
    returnFocus = trigger || document.activeElement;
    updateText();
    document.documentElement.classList.add('privacy-dialog-open');
    if (typeof dialog.showModal === 'function') { if (!dialog.open) dialog.showModal(); }
    else { dialog.setAttribute('open', ''); const first = dialog.querySelector('button'); if (first) first.focus(); }
  }

  function choose(value) {
    saveChoice(available && value === 'granted' ? 'granted' : 'denied');
    closePreferences();
    updateText();
    if (choice === 'granted') startAnalytics();
    else stopAnalytics();
  }

  document.querySelectorAll('[data-privacy-open]').forEach(function (button) {
    button.hidden = false;
    button.addEventListener('click', function () { openPreferences(button); });
  });
  document.querySelectorAll('[data-privacy-close]').forEach(function (button) { button.addEventListener('click', closePreferences); });
  document.querySelectorAll('[data-privacy-accept]').forEach(function (button) { button.addEventListener('click', function () { choose('granted'); }); });
  document.querySelectorAll('[data-privacy-reject]').forEach(function (button) { button.addEventListener('click', function () { choose('denied'); }); });
  document.querySelectorAll('[data-privacy-save]').forEach(function (button) { button.addEventListener('click', function () { choose(checkbox && checkbox.checked ? 'granted' : 'denied'); }); });
  if (dialog) {
    dialog.addEventListener('close', function () {
      document.documentElement.classList.remove('privacy-dialog-open');
      if (returnFocus && document.contains(returnFocus)) returnFocus.focus({ preventScroll: true });
    });
    dialog.addEventListener('click', function (event) {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closePreferences();
    });
    dialog.addEventListener('keydown', function (event) {
      if (typeof dialog.showModal === 'function') return;
      if (event.key === 'Escape') { event.preventDefault(); closePreferences(); }
      if (event.key !== 'Tab') return;
      const elements = Array.from(dialog.querySelectorAll('button:not(:disabled), input:not(:disabled), a[href]')).filter(function (element) { return !element.hidden; });
      const first = elements[0]; const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
  }

  document.addEventListener('hbc:action', function (event) {
    if (!active || choice !== 'granted') return;
    const detail = event.detail || {};
    if (!actions.has(detail.action)) return;
    // Strict enum allowlists. Never copy event objects, form fields or link URLs.
    command('event', 'hbc_action', Object.assign(pageParameters(), {
      send_to: measurementId,
      action: detail.action,
      service: services.has(detail.service) ? detail.service : '',
      position: positions.has(detail.position) ? detail.position : 'unknown'
    }));
  });
  document.addEventListener('hbc:language', updateText);
  window.addEventListener('storage', function (event) {
    if (event.key !== storageKey && event.key !== null) return;
    choice = readChoice();
    updateText();
    if (choice !== 'granted') stopAnalytics();
    else startAnalytics();
  });

  const email = String(config.contactEmail || (window.HBC_CONFIG || {}).email || 'high.class.agendamentos@gmail.com');
  document.querySelectorAll('[data-privacy-email]').forEach(function (link) {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { link.textContent = email; link.href = 'mailto:' + email; }
  });
  document.querySelectorAll('[data-privacy-controller]').forEach(function (element) { element.textContent = String(config.controllerLegalName || config.controllerName || 'High Business Class'); });
  document.querySelectorAll('[data-privacy-tax-id]').forEach(function (element) { element.hidden = !config.controllerTaxId; element.textContent = config.controllerTaxId ? 'CNPJ: ' + String(config.controllerTaxId) : ''; });
  if (policyPage) {
    const requested = new URLSearchParams(window.location.search).get('lang');
    if (requested === 'en') document.documentElement.lang = 'en';
    document.querySelectorAll('[data-lang]').forEach(function (button) {
      button.addEventListener('click', function () {
        if (!['pt', 'en'].includes(button.dataset.lang)) return;
        document.documentElement.lang = button.dataset.lang === 'en' ? 'en' : 'pt-BR';
        updateText();
        document.dispatchEvent(new CustomEvent('hbc:language', { detail: { language: button.dataset.lang } }));
      });
    });
  }
  choice = readChoice();
  updateText();
  if (choice === 'granted' && available) startAnalytics();
  else stopAnalytics();
})();
