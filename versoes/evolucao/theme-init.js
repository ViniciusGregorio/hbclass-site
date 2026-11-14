/* Resolve a preferência antes do CSS para evitar mudança de tema na abertura. */
(function () {
  'use strict';
  var theme = 'dark';
  try {
    var saved = localStorage.getItem('hbc-theme');
    if (saved === 'light' || saved === 'dark') theme = saved;
  } catch (_) { /* O site funciona também com armazenamento indisponível. */ }
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
})();
