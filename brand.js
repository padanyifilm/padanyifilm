(function () {
  'use strict';
  var en = document.documentElement.lang === 'en';
  document.querySelectorAll('[data-package]').forEach(function (link) {
    link.addEventListener('click', function () {
      var select = document.getElementById('contact-package');
      var names = { mini: 'Mini', full: en ? 'Full' : 'Teljes', premium: en ? 'Premium' : 'Prémium' };
      if (select) select.value = names[link.dataset.package] || '';
    });
  });
  document.querySelectorAll('.film-launch').forEach(function (button) {
    button.addEventListener('click', function () {
      var frame = document.createElement('iframe');
      frame.src = 'https://www.youtube-nocookie.com/embed/' + button.dataset.film + '?autoplay=1&rel=0';
      frame.title = button.getAttribute('aria-label');
      frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      frame.allowFullscreen = true;
      button.replaceWith(frame);
      frame.focus();
    });
  });
  var image = document.querySelector('.hero-film img');
  if (image) {
    function fallback() {
      if (image.src.includes('maxresdefault') && (!image.naturalWidth || image.naturalWidth < 200)) {
        image.src = image.src.replace('maxresdefault', 'hqdefault');
      }
    }
    image.addEventListener('error', fallback);
    image.addEventListener('load', fallback);
    if (image.complete) fallback();
  }
})();
