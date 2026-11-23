/* =========================================================
   Padányifilm — script.js
   Navigation + Formspree submit + FAQ
   ========================================================= */

(function () {
  'use strict';

  /* ---------- SMOOTH SCROLL on nav ---------- */
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var nav = document.querySelector('.topnav');
          var navOffset = (nav ? nav.offsetHeight : 70) + 18;
          var top = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------- FORMSPREE SUBMIT ---------- */
  var form = document.getElementById('contactForm');
  var en = document.documentElement.lang === 'en';
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('formStatus');
      var submitBtn = form.querySelector('.form-submit');
      if (submitBtn && submitBtn.disabled) return;
      form.dataset.sending = 'true';
      var data = new FormData(form);

      if (status) {
        status.textContent = en ? 'Sending…' : 'Küldés folyamatban…';
        status.className = 'form-status';
      }
      if (submitBtn) submitBtn.disabled = true;

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            if (status) {
              status.textContent =
                en ? 'Thank you, your enquiry has been submitted. I’ll be in touch.' : 'Köszönöm, az ajánlatkérést elküldtétek. Hamarosan jelentkezem.';
              status.className = 'form-status success';
            }
          } else {
            return response.json().then(function (data) {
              throw new Error(
                (data && data.errors && data.errors[0] && data.errors[0].message) ||
                  'Hiba történt a küldés során.'
              );
            });
          }
        })
        .catch(function (err) {
          if (status) {
            status.textContent = en ?
              'We could not confirm delivery. Your details are still here; please try again or email padanyifilm@gmail.com.' :
              'A kézbesítést nem sikerült visszaigazolni. Az adataitok megmaradtak; próbáljátok újra, vagy írjatok ide: padanyifilm@gmail.com.';
            status.className = 'form-status error';
          }
        })
        .finally(function () {
          form.dataset.sending = 'false';
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }

  /* ---------- FAQ ACCORDION ---------- */
  document.querySelectorAll('.faq-question').forEach(function (button) {
    button.addEventListener('click', function () {
      var answerId = button.getAttribute('aria-controls');
      var answer = answerId ? document.getElementById(answerId) : null;
      if (!answer) return;

      var isOpen = button.getAttribute('aria-expanded') === 'true';
      var item = button.closest('.faq-item');

      if (!isOpen) {
        document.querySelectorAll('.faq-question[aria-expanded="true"]').forEach(function (openButton) {
          var openAnswerId = openButton.getAttribute('aria-controls');
          var openAnswer = openAnswerId ? document.getElementById(openAnswerId) : null;
          var openItem = openButton.closest('.faq-item');
          openButton.setAttribute('aria-expanded', 'false');
          if (openAnswer) openAnswer.setAttribute('aria-hidden', 'true');
          if (openItem) openItem.classList.remove('is-open');
        });
      }

      button.setAttribute('aria-expanded', String(!isOpen));
      answer.setAttribute('aria-hidden', String(isOpen));
      if (item) item.classList.toggle('is-open', !isOpen);
    });
  });

})();
