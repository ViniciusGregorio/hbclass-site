(function () {
  'use strict';
  var button = document.getElementById('theme-toggle');
  if (!button) return;
  var label = button.querySelector('[data-theme-label]');
  function update() {
    var isLight = document.documentElement.dataset.theme === 'light';
    var english = document.documentElement.lang === 'en';
    button.setAttribute('aria-label', english ? (isLight ? 'Switch to dark theme' : 'Switch to light theme') : (isLight ? 'Ativar tema escuro' : 'Ativar tema claro'));
    button.title = button.getAttribute('aria-label');
    if (label) label.textContent = english ? (isLight ? 'Dark' : 'Light') : (isLight ? 'Escuro' : 'Claro');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = isLight ? '#faf8f4' : '#091015';
  }
  button.disabled = false;
  button.addEventListener('click', function () {
    var theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try { localStorage.setItem('hbc-theme', theme); } catch (_) { /* Preferência somente nesta visita. */ }
    update();
    document.dispatchEvent(new CustomEvent('hbc:theme', { detail: { theme: theme } }));
  });
  document.addEventListener('hbc:language', update);
  update();
})();
