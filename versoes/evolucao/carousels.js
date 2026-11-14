/* High Business Class — progressive, dependency-free photo carousels. */
(function () {
  'use strict';

  const media = window.HBC_MEDIA || {};
  const galleries = media.galleries || {};
  const interval = Math.max(4000, Math.min(15000, Number(media.interval) || 5000));
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const instances = [];
  let activeLanguage = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'pt';
  const words = {
    pt: { gallery: 'Fotos de ', carousel: 'carrossel', slide: 'foto', previous: 'Foto anterior', next: 'Próxima foto', pause: 'Pausar apresentação', play: 'Reproduzir apresentação', photo: 'Ir para foto ' },
    en: { gallery: 'Photos of ', carousel: 'carousel', slide: 'photo', previous: 'Previous photo', next: 'Next photo', pause: 'Pause slideshow', play: 'Play slideshow', photo: 'Go to photo ' }
  };

  function language() {
    return activeLanguage;
  }

  function translated(value, fallback) {
    if (typeof value === 'string') return value;
    return value && (value[language()] || value.pt || value.en) || fallback || '';
  }

  function source(value) {
    // Only project-local assets are accepted. Content is never inserted as HTML.
    if (typeof value !== 'string' || !value.startsWith('assets/') || value.includes('\\')) return '';
    try {
      if (decodeURIComponent(value).split('/').some(function (part) { return part === '..'; })) return '';
      return new URL(value, document.baseURI).href;
    } catch (_) { return ''; }
  }

  function icon(kind) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const paths = { previous: 'm14 5-7 7 7 7', next: 'm10 5 7 7-7 7', pause: 'M9 5v14M15 5v14', play: 'm9 5 10 7-10 7Z' };
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    path.setAttribute('d', paths[kind]);
    path.setAttribute('fill', kind === 'play' ? 'currentColor' : 'none');
    path.setAttribute('stroke', 'currentColor');
    path.setAttribute('stroke-width', '1.8');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(path);
    return svg;
  }

  function button(kind) {
    const element = document.createElement('button');
    element.type = 'button';
    element.className = 'hbc-carousel-button hbc-carousel-' + kind;
    element.appendChild(icon(kind));
    return element;
  }

  function enhance(root) {
    const initialImage = root.querySelector('img');
    if (!initialImage) return;
    const entry = galleries[root.dataset.carousel] || {};
    const configured = Array.isArray(entry.slides) ? entry.slides : [];
    const initialSource = initialImage.currentSrc || initialImage.src;
    const initialMetadata = configured.find(function (item) { return item && source(item.src) === initialSource; }) || {};
    const records = [{
      src: initialSource,
      alt: initialMetadata.alt || { pt: initialImage.dataset.ptAlt || initialImage.alt, en: initialImage.dataset.enAlt || initialImage.alt },
      fit: initialMetadata.fit,
      position: initialMetadata.position,
      element: initialImage
    }];
    const seen = new Set([initialSource]);
    configured.forEach(function (item) {
      const url = item && source(item.src);
      if (!url || seen.has(url)) return;
      seen.add(url);
      records.push({ src: url, alt: item.alt || '', fit: item.fit, position: item.position });
    });

    function frame(image, record) {
      if (record.fit === 'contain' || record.fit === 'cover') image.style.objectFit = record.fit;
      if (typeof record.position === 'string' && /^(center|top|bottom|left|right|\d{1,3}%)( (center|top|bottom|left|right|\d{1,3}%))?$/.test(record.position)) image.style.objectPosition = record.position;
    }
    frame(initialImage, records[0]);

    // With one photo the existing markup and image remain fully functional.
    root.dataset.carouselReady = records.length > 1 ? 'multiple' : 'single';
    if (records.length < 2) return;

    const state = { index: 0, timer: 0, request: 0, paused: false, hover: false, focus: false, visible: false };
    const slides = [];
    const track = document.createElement('div');
    track.className = 'hbc-carousel-track';
    root.classList.add('hbc-carousel');
    root.tabIndex = 0;
    root.setAttribute('role', 'group');
    root.setAttribute('aria-live', 'off');
    root.appendChild(track);

    records.forEach(function (record, index) {
      const slide = document.createElement('div');
      const image = record.element || document.createElement('img');
      slide.className = 'hbc-carousel-slide' + (index === 0 ? ' is-active' : '');
      slide.setAttribute('aria-hidden', String(index !== 0));
      image.classList.add('hbc-carousel-image');
      frame(image, record);
      image.decoding = 'async';
      // Additional files load when the gallery is nearby, then one step ahead.
      if (!record.element) image.loading = 'eager';
      slide.appendChild(image);
      track.appendChild(slide);
      slides.push({ element: slide, image: image, record: record, failed: false, loading: null });
    });

    const controls = document.createElement('div');
    const bar = document.createElement('div');
    const indicators = document.createElement('div');
    const previous = button('previous');
    const next = button('next');
    const pause = button('pause');
    controls.className = 'hbc-carousel-controls';
    bar.className = 'hbc-carousel-bar';
    indicators.className = 'hbc-carousel-indicators';
    const dots = slides.map(function (_, index) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'hbc-carousel-dot';
      dot.addEventListener('click', function () { go(index); });
      indicators.appendChild(dot);
      return dot;
    });
    bar.append(indicators, pause);
    controls.append(previous, next, bar);
    root.appendChild(controls);

    function available() {
      return slides.reduce(function (count, slide) { return count + (slide.failed ? 0 : 1); }, 0);
    }

    function neighbour(from, step) {
      for (let offset = 1; offset <= slides.length; offset += 1) {
        const index = (from + step * offset + slides.length * offset) % slides.length;
        if (!slides[index].failed) return index;
      }
      return state.index;
    }

    function stop() {
      window.clearTimeout(state.timer);
      state.timer = 0;
      root.dataset.carouselPlaying = 'false';
    }

    function schedule() {
      stop();
      if (available() < 2 || state.paused || state.hover || state.focus || !state.visible || document.hidden || motion.matches) return;
      root.dataset.carouselPlaying = 'true';
      state.timer = window.setTimeout(function () { go(neighbour(state.index, 1)); }, interval);
    }

    function labels() {
      const text = words[language()];
      const label = translated(entry.label, language() === 'en' ? root.dataset.carouselLabelEn : root.dataset.carouselLabel) || root.dataset.carousel;
      root.setAttribute('aria-label', text.gallery + label);
      root.setAttribute('aria-roledescription', text.carousel);
      previous.setAttribute('aria-label', text.previous);
      next.setAttribute('aria-label', text.next);
      pause.setAttribute('aria-label', state.paused ? text.play : text.pause);
      pause.setAttribute('aria-pressed', String(state.paused));
      pause.hidden = motion.matches;
      pause.replaceChildren(icon(state.paused ? 'play' : 'pause'));
      controls.hidden = available() < 2;
      slides.forEach(function (slide, index) {
        slide.image.alt = translated(slide.record.alt);
        slide.element.setAttribute('role', 'group');
        slide.element.setAttribute('aria-roledescription', text.slide);
        dots[index].setAttribute('aria-label', text.photo + (index + 1));
        dots[index].hidden = slide.failed;
        if (index === state.index) dots[index].setAttribute('aria-current', 'true');
        else dots[index].removeAttribute('aria-current');
      });
    }

    function load(index) {
      const slide = slides[index];
      if (slide.failed) return Promise.resolve(false);
      if (slide.image.complete && slide.image.naturalWidth > 0) return Promise.resolve(true);
      if (slide.loading) return slide.loading;
      slide.loading = new Promise(function (resolve) {
        function complete(ok) {
          slide.image.removeEventListener('load', loaded);
          slide.image.removeEventListener('error', failed);
          slide.failed = !ok;
          if (!ok) labels();
          resolve(ok);
        }
        function loaded() { complete(true); }
        function failed() { complete(false); }
        slide.image.addEventListener('load', loaded);
        slide.image.addEventListener('error', failed);
        if (!slide.image.getAttribute('src')) slide.image.src = slide.record.src;
        // A previously failed request must not wait for an event that already fired.
        else if (slide.image.complete && !slide.image.naturalWidth) complete(false);
      });
      return slide.loading;
    }

    function preload() {
      if (state.visible && available() > 1) load(neighbour(state.index, 1));
    }

    async function go(index) {
      stop();
      if (index === state.index || available() < 2) { schedule(); return; }
      const request = ++state.request;
      if (!await load(index)) {
        if (request === state.request && available() > 1) go(neighbour(index, 1));
        else schedule();
        return;
      }
      if (request !== state.request) return;
      slides[state.index].element.classList.remove('is-active');
      slides[state.index].element.setAttribute('aria-hidden', 'true');
      slides[index].element.classList.add('is-active');
      slides[index].element.setAttribute('aria-hidden', 'false');
      state.index = index;
      root.dataset.carouselIndex = String(index);
      labels();
      preload();
      schedule();
    }

    previous.addEventListener('click', function () { go(neighbour(state.index, -1)); });
    next.addEventListener('click', function () { go(neighbour(state.index, 1)); });
    pause.addEventListener('click', function () { state.paused = !state.paused; labels(); schedule(); });
    root.addEventListener('pointerenter', function (event) { if (event.pointerType !== 'touch') { state.hover = true; schedule(); } });
    root.addEventListener('pointerleave', function (event) { if (event.pointerType !== 'touch') { state.hover = false; schedule(); } });
    root.addEventListener('focusin', function () { state.focus = true; schedule(); });
    root.addEventListener('focusout', function (event) {
      if (!root.contains(event.relatedTarget)) { state.focus = false; schedule(); }
    });
    root.addEventListener('keydown', function (event) {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      let target;
      if (event.key === 'ArrowLeft') target = neighbour(state.index, -1);
      else if (event.key === 'ArrowRight') target = neighbour(state.index, 1);
      else if (event.key === 'Home') target = neighbour(slides.length - 1, 1);
      else if (event.key === 'End') target = neighbour(0, -1);
      else return;
      event.preventDefault();
      go(target);
    });
    let touch = null;
    root.addEventListener('pointerdown', function (event) {
      if (event.pointerType === 'touch' && !event.target.closest('button')) touch = { x: event.clientX, y: event.clientY };
    });
    root.addEventListener('pointerup', function (event) {
      if (!touch) return;
      const dx = event.clientX - touch.x;
      const dy = event.clientY - touch.y;
      touch = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) go(neighbour(state.index, dx < 0 ? 1 : -1));
    });
    root.addEventListener('pointercancel', function () { touch = null; });

    root.dataset.carouselIndex = '0';
    labels();
    instances.push({ root: root, labels: labels, schedule: schedule, visible: function (value) { state.visible = value; preload(); schedule(); } });
  }

  document.querySelectorAll('[data-carousel]').forEach(enhance);
  if (!instances.length) return;
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        const instance = instances.find(function (item) { return item.root === entry.target; });
        if (instance) instance.visible(entry.isIntersecting && entry.intersectionRatio >= 0.12);
      });
    }, { threshold: [0, 0.12] });
    instances.forEach(function (instance) { observer.observe(instance.root); });
  } else {
    let frame = 0;
    function checkVisibility() {
      frame = 0;
      instances.forEach(function (instance) {
        const box = instance.root.getBoundingClientRect();
        instance.visible(box.bottom > 0 && box.top < window.innerHeight);
      });
    }
    function requestVisibility() { if (!frame) frame = window.requestAnimationFrame(checkVisibility); }
    window.addEventListener('scroll', requestVisibility, { passive: true });
    window.addEventListener('resize', requestVisibility);
    checkVisibility();
  }
  function refresh() {
    instances.forEach(function (instance) { instance.labels(); instance.schedule(); });
  }
  function changeLanguage(event) {
    const detail = event.detail || {};
    const value = typeof detail === 'string' ? detail : (detail.language || detail.lang);
    activeLanguage = value === 'en' || value === 'pt' ? value : (document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'pt');
    refresh();
  }
  document.addEventListener('visibilitychange', refresh);
  document.addEventListener('hbc:language', changeLanguage);
  window.addEventListener('hbc:language', changeLanguage);
  // Also support integrations that change html[lang] without dispatching an event.
  new MutationObserver(function () { changeLanguage({ detail: {} }); }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  if (motion.addEventListener) motion.addEventListener('change', refresh);
  else motion.addListener(refresh);
}());
