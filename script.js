// ========== TYPING ANIMATION ==========
const typedSpan = document.querySelector('.typed-text');
if (typedSpan) {
  const words = ['a developer 👨‍💻', 'a cybersecurity analyst 🔒', 'an iOS engineer 📱', 'a ministry leader 🙏', 'an athlete ⚾🏀'];
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
const counters = document.querySelectorAll('.stat-number');
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
        counter.innerText = isFloat ? current.toFixed(2) : Math.floor(current);
        setTimeout(updateCount, 25);
      } else {
        counter.innerText = isFloat ? target.toFixed(2) : target;
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

if (document.querySelector('.hero-stats')) {
  statsObserver.observe(document.querySelector('.hero-stats'));
}

// ========== CUSTOM CURSOR (desktop only) ==========
const cursorDiv = document.querySelector('.cursor-glow');
if (cursorDiv && window.innerWidth > 768) {
  document.addEventListener('mousemove', (e) => {
    cursorDiv.style.left = e.clientX - 15 + 'px';
    cursorDiv.style.top = e.clientY - 15 + 'px';
  });
  document.addEventListener('mouseleave', () => {
    cursorDiv.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursorDiv.style.opacity = '0.5';
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
      const sidebar = document.getElementById('mainSidebar');
      if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        document.getElementById('sidebarOverlay')?.classList.remove('active');
      }
    }
  });
});

// ========== MOBILE MENU TOGGLE ==========
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');
const mainSidebar = document.getElementById('mainSidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mainSidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
  });
}

if (closeSidebarBtn) {
  closeSidebarBtn.addEventListener('click', () => {
    mainSidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
  });
}

if (sidebarOverlay) {
  sidebarOverlay.addEventListener('click', () => {
    mainSidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
  });
}

// ========== SCROLL REVEAL ANIMATION ==========
const revealElements = document.querySelectorAll('.about-card, .edu-card, .exp-card, .project-card, .ministry-card, .sport-card, .funfact');
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

// ========== INITIAL TRIGGER ==========
setTimeout(() => {
  setActiveLink();
}, 100);
