// ========== TYPING ANIMATION ==========
const typedSpan = document.querySelector('.typed-text');
if (typedSpan) {
  const words = ['a developer', 'a ministry leader', 'an athlete', 'a CS student', 'a servant'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typedSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeEffect, 300);
      return;
    }
    setTimeout(typeEffect, isDeleting ? 70 : 120);
  }
  typeEffect();
}

// ========== SCROLL COUNTERS ==========
const counters = document.querySelectorAll('.stat-num');
let countersStarted = false;

function startCounters() {
  counters.forEach(counter => {
    const target = parseFloat(counter.getAttribute('data-target'));
    let current = 0;
    const isFloat = target % 1 !== 0;
    const increment = target / 45;
    
    const updateCount = () => {
      if (current < target) {
        current = Math.min(current + increment, target);
        counter.innerText = isFloat ? current.toFixed(1) : Math.floor(current);
        setTimeout(updateCount, 25);
      } else {
        counter.innerText = isFloat ? target.toFixed(1) : target;
      }
    };
    updateCount();
  });
}

const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !countersStarted) {
    countersStarted = true;
    startCounters();
  }
}, { threshold: 0.3 });

if (document.querySelector('.stats-mini')) {
  statsObserver.observe(document.querySelector('.stats-mini'));
}

// ========== CUSTOM CURSOR (desktop only) ==========
const cursorDiv = document.querySelector('.cursor-glow');
if (cursorDiv && window.innerWidth > 768) {
  document.addEventListener('mousemove', (e) => {
    cursorDiv.style.left = e.clientX - 16 + 'px';
    cursorDiv.style.top = e.clientY - 16 + 'px';
  });
  document.addEventListener('mouseleave', () => {
    cursorDiv.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursorDiv.style.opacity = '0.65';
  });
}

// ========== ACTIVE NAV HIGHLIGHT ==========
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
  let current = '';
  const scrollPosition = window.scrollY + 150;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href')?.substring(1);
    if (href === current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, null, `#${targetId}`);
      setActiveLink();
      // Close mobile menu if open
      const nav = document.getElementById('mainNav');
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
      }
    }
  });
});

// ========== MOBILE MENU TOGGLE ==========
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const mainNav = document.getElementById('mainNav');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.add('open');
  });
}

if (closeMenuBtn) {
  closeMenuBtn.addEventListener('click', () => {
    mainNav.classList.remove('open');
  });
}

// Close menu when clicking outside on mobile
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 768 && mainNav && mainNav.classList.contains('open')) {
    if (!mainNav.contains(e.target) && e.target !== mobileMenuBtn && !mobileMenuBtn.contains(e.target)) {
      mainNav.classList.remove('open');
    }
  }
});

// ========== SCROLL REVEAL ANIMATION ==========
const revealElements = document.querySelectorAll('.glass-card, .ministry-card, .sport-card, .funfact-card, .project-item');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0px)';
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(25px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.4s ease';
  revealObserver.observe(el);
});

// ========== INITIAL TRIGGER FOR VISIBLE ELEMENTS ==========
setTimeout(() => {
  setActiveLink();
}, 100);
