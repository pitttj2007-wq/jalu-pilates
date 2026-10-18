// Header: fondo sólido al hacer scroll
const header = document.getElementById('siteHeader');
const onScroll = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 20);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Menú mobile
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileNavClose = document.getElementById('mobileNavClose');

function openMobileNav() {
  mobileNav.classList.add('is-open');
  navToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  mobileNav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', openMobileNav);
mobileNavClose.addEventListener('click', closeMobileNav);
mobileNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMobileNav);
});

// FAQ acordeón
document.querySelectorAll('.faq-item').forEach((item) => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  question.addEventListener('click', () => {
    const isOpen = item.getAttribute('data-open') === 'true';

    document.querySelectorAll('.faq-item').forEach((other) => {
      other.setAttribute('data-open', 'false');
      other.querySelector('.faq-answer').style.maxHeight = null;
    });

    if (!isOpen) {
      item.setAttribute('data-open', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// Reveal al hacer scroll
const revealEls = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  revealEls.forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );
  revealEls.forEach((el) => observer.observe(el));
}

// Compartir
document.getElementById('shareBtn')?.addEventListener('click', async () => {
  const shareData = {
    title: 'Jalu Pilates — Clases de pilates y stretching en Recoleta',
    text: 'Clases de pilates y stretching con Jalu: grupos reducidos, privadas, a domicilio y online.',
    url: window.location.href
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(shareData.url);
      alert('Link copiado al portapapeles');
    }
  } catch (err) {
    /* el usuario canceló o el navegador no lo soporta */
  }
});

// Analytics: contar clics en WhatsApp como conversión
document.querySelectorAll('a[href^="https://wa.me/"]').forEach((link) => {
  link.addEventListener('click', () => {
    if (typeof gtag === 'function') {
      gtag('event', 'whatsapp_click', {
        link_location: link.closest('section, header, footer, .sticky-cta, .mobile-nav')?.id || link.className
      });
    }
  });
});
