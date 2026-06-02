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

// ========== INTERACTIVE COUNTER (SCROLL REVEAL) ==========
const counters = document.querySelectorAll('.stat-num');
let started = false;

function startCounters() {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      let current = +counter.innerText;
      const increment = target / 45;
      if (current < target) {
        current = Math.ceil(current + increment);
        counter.innerText = current;
        setTimeout(updateCount, 25);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight - 100 && rect.bottom > 100;
}

window.addEventListener('scroll', () => {
  if (!started && document.querySelector('.stats-mini') && isInViewport(document.querySelector('.stats-mini'))) {
    started = true;
    startCounters();
  }
});

// ========== CUSTOM CURSOR ==========
const cursor = document.querySelector('.cursor-glow');
if (cursor) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 14 + 'px';
    cursor.style.top = e.clientY - 14 + 'px';
  });
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '0.6';
  });
}

// ========== ACTIVE NAV HIGHLIGHT + SMOOTH SCROLL ==========
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

// Smooth scroll for all anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, null, `#${targetId}`);
      setActiveLink();
    }
  });
});

// ========== PARALLAX / interactive hover effects on ministry cards ==========
const tiltCards = document.querySelectorAll('.interactive-card');
tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  });
});

// ========== SCROLL REVEAL (FADE UP) ==========
const fadeElements = document.querySelectorAll('.glass-card, .ministry-card, .sport-card, .resume-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0px)';
    }
  });
}, { threshold: 0.1 });
fadeElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.5s ease';
  observer.observe(el);
});

// ========== DYNAMIC YEAR & MINOR DETAILS ==========
const footerYear = document.querySelector('.footer-distinct p:first-child');
if (footerYear && !footerYear.innerText.includes('2026')) {
  // keep original but cool
}
console.log('✨ Interactive personal site loaded | Joshua CS + Ministry + Sports');
