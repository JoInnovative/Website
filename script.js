document.addEventListener('DOMContentLoaded', function() {

  // Mark active nav link based on current page — delayed so drop-in transition plays
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  let activeLink = null;
  document.querySelectorAll('.navbar__menu a, .navbar__item a').forEach(function(link) {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) {
      activeLink = link;
    }
  });
  if (activeLink) {
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        activeLink.classList.add('nav--active');
      });
    });
  }

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 0) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Hamburger toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.innerHTML = isOpen ? '&#10005;' : '&#9776;';
    });
    // Close menu when any nav link is clicked
    navMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '&#9776;';
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
  // Fill in your three IDs from the EmailJS dashboard:
  const EMAILJS_PUBLIC_KEY  = 'LC809u0278A1nNb9E';
  const EMAILJS_SERVICE_ID  = 'PrivateEmail';
  const EMAILJS_TEMPLATE_ID = 'template_x1ekivr';

  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Honeypot check
      if (contactForm.querySelector('[name="website"]')?.value) return;

      const submitBtn  = contactForm.querySelector('.form-submit');
      const successMsg = document.getElementById('formSuccess');
      const originalText = submitBtn.querySelector('.form-submit__text').textContent;

      submitBtn.disabled = true;
      submitBtn.querySelector('.form-submit__text').textContent = 'Sending…';

      const templateParams = {
        from_name:  contactForm.querySelector('[name="name"]').value.trim(),
        from_email: contactForm.querySelector('[name="email"]').value.trim(),
        message:    contactForm.querySelector('[name="message"]').value.trim()
      };

      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(function() {
          contactForm.reset();
          successMsg.hidden = false;
          submitBtn.querySelector('.form-submit__text').textContent = 'Sent!';
        })
        .catch(function() {
          submitBtn.querySelector('.form-submit__text').textContent = originalText;
          submitBtn.disabled = false;
          alert('Something went wrong. Please try again or email us directly at info@joinnovativesolutions.com.');
        });
    });
  }
});

// Mobile navbar toggle
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".navbar__toggle");
  const menu = document.querySelector(".navbar__menu");

  if (!toggle || !menu) return;

  toggle.setAttribute("aria-expanded", "false");

  toggle.addEventListener("click", function () {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
});
