/* Service explanations: native dialogs, local content and keyboard navigation. */
(function () {
  'use strict';

  const dialogs = Array.from(document.querySelectorAll('.service-dialog'));
  let active = null;
  let opener = null;
  let returnFocus = true;

  function restore() {
    document.documentElement.classList.remove('service-dialog-open');
    if (returnFocus && opener && opener.isConnected) {
      let target = opener;
      // Navigation shortcuts close their menu before opening the dialog. Return
      // to its visible control instead of focusing a now-hidden submenu link.
      if (opener.closest('#site-nav')) {
        const menuToggle = document.getElementById('menu-toggle');
        const section = opener.closest('details');
        const summary = section && section.querySelector('summary');
        target = menuToggle && menuToggle.getClientRects().length ? menuToggle : (summary || opener);
      }
      target.focus({ preventScroll: true });
    }
    active = null;
    opener = null;
    returnFocus = true;
  }

  function close(restoreFocus) {
    if (!active) return;
    returnFocus = restoreFocus !== false;
    if (typeof active.close === 'function') active.close();
    else {
      active.removeAttribute('open');
      restore();
    }
  }

  document.querySelectorAll('[data-service-open]').forEach(function (button) {
    const dialog = document.getElementById('service-dialog-' + button.dataset.serviceOpen);
    if (!dialog) return;
    button.hidden = false;
    button.addEventListener('click', function (event) {
      if (button.matches('a[href]') && (event.button > 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)) return;
      // Keep each anchor's card destination as its no-JS fallback, but do not
      // navigate or scroll there while opening the explanation.
      event.preventDefault();
      if (active) return;
      opener = button;
      active = dialog;
      returnFocus = true;
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
      dialog.scrollTop = 0;
      document.documentElement.classList.add('service-dialog-open');
      dialog.querySelector('[data-service-close]').focus({ preventScroll: true });
    });
  });

  dialogs.forEach(function (dialog) {
    dialog.querySelectorAll('[data-service-close]').forEach(function (button) {
      button.addEventListener('click', function () { close(); });
    });
    dialog.querySelectorAll('[data-booking-service]').forEach(function (link) {
      link.addEventListener('click', function () {
        close(false);
        // Let the booking listener select the service before focusing the form.
        window.requestAnimationFrame(function () {
          const service = document.getElementById('booking-service');
          if (service) service.focus({ preventScroll: true });
        });
      });
    });
    dialog.addEventListener('cancel', function (event) {
      event.preventDefault();
      close();
    });
    dialog.addEventListener('close', restore);
    dialog.addEventListener('click', function (event) {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
    });
  });

  // Native dialogs provide focus containment; keep a small fallback for older browsers.
  document.addEventListener('keydown', function (event) {
    if (!active || typeof active.showModal === 'function') return;
    if (event.key === 'Escape') { event.preventDefault(); close(); return; }
    if (event.key !== 'Tab') return;
    const focusable = Array.from(active.querySelectorAll('button:not([disabled]), a[href]'));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
})();
