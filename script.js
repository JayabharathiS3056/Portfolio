// ===========================
//  NAVBAR SCROLL & ACTIVE LINK
// ===========================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled class for navbar shadow
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link based on scroll position
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ===========================
//  HAMBURGER MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinksMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinksMenu.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close menu when a nav link is clicked
navLinksMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinksMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ===========================
//  TYPED TEXT EFFECT
// ===========================
const typedEl = document.getElementById('typed');
const phrases = [
  'Aspiring Web Developer',
  'MERN Stack Learner',
  'Frontend Enthusiast',
  'React Developer'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    typingSpeed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 400;
  }

  setTimeout(typeEffect, typingSpeed);
}

// Start typing after hero text appears
setTimeout(typeEffect, 1000);

// ===========================
//  SCROLL REVEAL ANIMATION
// ===========================
const revealElements = document.querySelectorAll(
  '.about-card, .skill-card, .service-card, .project-card, .contact-card, .about-grid, .about-photo, .about-bio, .about-cards, .skill-tags'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * i);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ===========================
//  SKILL BAR ANIMATION
// ===========================
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-fill');
      fills.forEach(fill => {
        const targetWidth = fill.getAttribute('data-width');
        fill.style.width = targetWidth + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(card => {
  skillObserver.observe(card);
});

// ===========================
//  SMOOTH SCROLL FOR ANCHOR LINKS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
