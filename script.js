document.addEventListener('DOMContentLoaded', function () {
  // Mark active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  let activeLink = null;

  document.querySelectorAll('.navbar__menu a, .navbar__item a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (!href) return;

    const linkPage = href.split('/').pop();

    if (linkPage === currentPage) {
      activeLink = link;
    }
  });

  if (activeLink) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        activeLink.classList.add('nav--active');
      });
    });
  }

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Hamburger toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.setAttribute('aria-expanded', 'false');

    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.innerHTML = isOpen ? '✕' : '☰';
    });

    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '☰';
      });
    });
  }

  // Smooth scroll for same-page anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Contact form — EmailJS
  const EMAILJS_PUBLIC_KEY = 'LC809u0278A1nNb9E';
  const EMAILJS_SERVICE_ID = 'PrivateEmail';
  const EMAILJS_TEMPLATE_ID = 'template_x1ekivr';

  if (typeof emailjs !== 'undefined') {
    emailjs.init({
      publicKey: EMAILJS_PUBLIC_KEY
    });
  }

  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Honeypot check
      const honeypot = contactForm.querySelector('[name="website"]');
      if (honeypot && honeypot.value) return;

      const submitBtn = contactForm.querySelector('.form-submit');
      const successMsg = document.getElementById('formSuccess');

      if (!submitBtn) return;

      const submitText = submitBtn.querySelector('.form-submit__text');
      const originalText = submitText ? submitText.textContent : 'Send Message';

      submitBtn.disabled = true;

      if (submitText) {
        submitText.textContent = 'Sending…';
      }

      const templateParams = {
        from_name: contactForm.querySelector('[name="name"]').value.trim(),
        from_email: contactForm.querySelector('[name="email"]').value.trim(),
        message: contactForm.querySelector('[name="message"]').value.trim()
      };

      if (typeof emailjs === 'undefined') {
        alert('Email service is not loaded. Please email us directly at info@joinnovativesolutions.com.');

        submitBtn.disabled = false;

        if (submitText) {
          submitText.textContent = originalText;
        }

        return;
      }

      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(function () {
          contactForm.reset();

          if (successMsg) {
            successMsg.hidden = false;
          }

          if (submitText) {
            submitText.textContent = 'Sent!';
          }
        })
        .catch(function () {
          if (submitText) {
            submitText.textContent = originalText;
          }

          submitBtn.disabled = false;

          alert('Something went wrong. Please try again or email us directly at info@joinnovativesolutions.com.');
        });
    });
  }
});
