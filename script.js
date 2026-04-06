// Palette switching functionality
document.addEventListener('DOMContentLoaded', function() {
  const palette1Btn = document.getElementById('palette1');
  const palette2Btn = document.getElementById('palette2');
  const palette3Btn = document.getElementById('palette3');
  const palette4Btn = document.getElementById('palette4');
  const paletteButtons = [palette1Btn, palette2Btn, palette3Btn, palette4Btn].filter(Boolean);
  const body = document.body;

  // Load saved palette from localStorage
  const savedPalette = localStorage.getItem('colorPalette') || 'palette1';
  applyPalette(savedPalette);

  // Palette 1: Gold & Purple
  palette1Btn.addEventListener('click', function() {
    applyPalette('palette1');
  });

  // Palette 2: Burnt Orange & Black
  palette2Btn.addEventListener('click', function() {
    applyPalette('palette2');
  });

  // Palette 3: Teal
  if (palette3Btn) {
    palette3Btn.addEventListener('click', function() {
      applyPalette('palette3');
    });
  }

  // Palette 4: Night Mode
  if (palette4Btn) {
    palette4Btn.addEventListener('click', function() {
      applyPalette('palette4');
    });
  }

  function applyPalette(paletteName) {
    body.classList.remove('palette-2', 'palette-3', 'palette-4');

    if (paletteName === 'palette2') {
      body.classList.add('palette-2');
      updateButtonStates(palette2Btn);
    } else if (paletteName === 'palette3') {
      body.classList.add('palette-3');
      updateButtonStates(palette3Btn);
    } else if (paletteName === 'palette4') {
      body.classList.add('palette-4');
      updateButtonStates(palette4Btn);
    } else {
      updateButtonStates(palette1Btn);
    }

    localStorage.setItem('colorPalette', paletteName);
  }

  function updateButtonStates(activeBtn) {
    paletteButtons.forEach(function(btn) {
      btn.style.opacity = btn === activeBtn ? '1' : '0.5';
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
});