// ================================================
// HIMAPROM - Main Script
// ================================================

// Navbar scroll behavior
const navbar = document.querySelector('.navbar');
function handleNavbarScroll() {
  if (!navbar) return;
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    navbar.classList.remove('dark-hero');
  } else {
    navbar.classList.remove('scrolled');
    if (document.querySelector('.hero')) {
      navbar.classList.add('dark-hero');
    }
  }
}
window.addEventListener('scroll', handleNavbarScroll);
handleNavbarScroll();

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileOverlay = document.querySelector('.mobile-overlay');

function toggleMobileMenu() {
  mobileMenu?.classList.toggle('open');
  mobileOverlay?.classList.toggle('open');
  document.body.style.overflow = mobileMenu?.classList.contains('open') ? 'hidden' : '';
}

hamburger?.addEventListener('click', toggleMobileMenu);
mobileOverlay?.addEventListener('click', toggleMobileMenu);

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (mobileMenu?.classList.contains('open')) toggleMobileMenu();
  });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// Accordion / Program Kerja
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const isActive = header.classList.contains('active');
      // Close all
      document.querySelectorAll('.accordion-header').forEach(h => h.classList.remove('active'));
      document.querySelectorAll('.accordion-body').forEach(b => b.classList.remove('open'));
      // Open clicked (if wasn't active)
      if (!isActive) {
        header.classList.add('active');
        header.nextElementSibling?.classList.add('open');
      }
    });
  });
}
initAccordions();

// Gallery lightbox
function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxClose = document.querySelector('.lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      if (lightbox) {
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  function closeLightbox() {
    lightbox?.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}
initGallery();

// Load Program Kerja from JSON
async function loadProgramKerja() {
  const container = document.getElementById('program-accordion');
  if (!container) return;
  
  try {
    // Determine path based on current page
    const isRoot = window.location.pathname.endsWith('program.html') || window.location.pathname.endsWith('/pages/program.html');
    const dataPath = window.location.pathname.includes('/pages/') ? '../data/program-kerja.json' : 'data/program-kerja.json';
    
    const response = await fetch(dataPath);
    const data = await response.json();
    
    container.innerHTML = data.map((divisi, index) => `
      <div class="accordion-item reveal reveal-delay-${(index % 4) + 1}">
        <div class="accordion-header ${index === 0 ? 'active' : ''}">
          <div class="accordion-title">
            <span class="acc-icon">${divisi.icon}</span>
            <span>${divisi.divisi}</span>
          </div>
          <span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body ${index === 0 ? 'open' : ''}">
          <div class="program-list">
            ${divisi.programs.map(p => `
              <div class="program-item">
                <div class="program-bullet"></div>
                <div>
                  <div class="program-item-name">${p.nama}</div>
                  <div class="program-item-desc">${p.desc}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('');
    
    // Re-init accordions after loading
    initAccordions();
    // Re-init reveal
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
  } catch (e) {
    console.log('Program data will load when served from a server.');
  }
}
loadProgramKerja();

// Load Angkatan from JSON
async function loadAngkatan() {
  const container = document.getElementById('angkatan-grid');
  if (!container) return;
  
  try {
    const dataPath = window.location.pathname.includes('/pages/') ? '../data/angkatan.json' : 'data/angkatan.json';
    const response = await fetch(dataPath);
    const data = await response.json();
    
    container.innerHTML = data.reverse().map((ang, i) => `
      <div class="angkatan-card reveal reveal-delay-${(i % 3) + 1}">
        <div class="angkatan-photo">
          <span>${ang.tahun}</span>
          <span class="angkatan-year-badge">Angkatan ${ang.tahun}</span>
        </div>
        <div class="angkatan-info">
          <div class="angkatan-year">Angkatan ${ang.tahun}</div>
          <div class="angkatan-meta">
            <span>👤 Ketua: <strong>${ang.ketua}</strong></span>
            <span>👥 Anggota: <strong>${ang.jumlah_anggota} Orang</strong></span>
          </div>
          ${ang.deskripsi ? `<p class="angkatan-desc">${ang.deskripsi}</p>` : ''}
        </div>
      </div>
    `).join('');
    
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
  } catch (e) {
    console.log('Angkatan data will load when served from a server.');
  }
}
loadAngkatan();

// Load Ketua Riwayat
async function loadKetuaRiwayat() {
  const container = document.getElementById('ketua-timeline');
  if (!container) return;
  
  try {
    const dataPath = window.location.pathname.includes('/pages/') ? '../data/ketua-himpunan.json' : 'data/ketua-himpunan.json';
    const response = await fetch(dataPath);
    const data = await response.json();
    
    container.innerHTML = data.map(item => `
      <div class="timeline-item reveal">
        <div class="timeline-period">PERIODE ${item.periode}</div>
        <div class="timeline-name">${item.nama}</div>
      </div>
    `).join('');
    
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
  } catch (e) {
    console.log('Ketua data will load when served from a server.');
  }
}
loadKetuaRiwayat();

// Active nav link based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href') || '';
  if (href.includes(currentPage) || (currentPage === 'index.html' && href === 'index.html') || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Smooth animated counter
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              counter.textContent = target + (counter.dataset.suffix || '');
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current) + (counter.dataset.suffix || '');
            }
          }, 16);
          observer.unobserve(counter);
        }
      });
    });
    
    observer.observe(counter);
  });
}
animateCounters();

// Contact form
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('.btn-primary');
  btn.textContent = '✓ Pesan Terkirim!';
  btn.style.background = 'linear-gradient(135deg, #2d9a4e, #1a7a38)';
  setTimeout(() => {
    btn.textContent = 'Kirim Pesan';
    btn.style.background = '';
    contactForm.reset();
  }, 3000);
});
