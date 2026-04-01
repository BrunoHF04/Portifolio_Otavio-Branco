document.addEventListener('DOMContentLoaded', () => {
  // --- SPLASH SCREEN ---
  const splash = document.getElementById('splash-screen');
  const body = document.body;
  
  setTimeout(() => {
    splash.classList.add('fade-out');
    body.classList.remove('loading');
  }, 1500); // 1.5 seconds loading feel

  // --- THEME TOGGLE LOGIC ---

  const themeToggle = document.getElementById('theme-toggle');
  const icon = themeToggle.querySelector('i');


  // Check saved theme
  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Toggle icon
    if (isDark) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  });

  // --- MOBILE MENU LOGIC ---
  const mobileMenu = document.getElementById('mobile-menu');
  const navList = document.getElementById('nav-list');
  const navLinks = document.querySelectorAll('#nav-list li a');

  mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
    const isMenuOpen = navList.classList.contains('active');
    mobileMenu.querySelector('i').classList.toggle('fa-bars');
    mobileMenu.querySelector('i').classList.toggle('fa-xmark');
  });

  // Close menu when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('active');
      mobileMenu.querySelector('i').classList.add('fa-bars');
      mobileMenu.querySelector('i').classList.remove('fa-xmark');
    });
  });

  // Smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- TILT EFFECT FOR PRODUCT CARDS ---
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // --- VCARD GENERATOR ---
  const vcardBtn = document.getElementById('download-vcard');
  if (vcardBtn) {
    vcardBtn.addEventListener('click', () => {
      const vcardData = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'FN:Otávio Branco',
        'ORG:Solo Rico',
        'TITLE:Consultor de Vendas / Revendedor Specialist',
        'TEL;TYPE=CELL;TYPE=VOICE;TYPE=pref:+5516997563538',
        'EMAIL;TYPE=INTERNET:otavio.solorico@hotmail.com',
        'URL:https://bruno-fernandes.github.io/Otavio-Branco/',
        'END:VCARD'
      ].join('\n');

      const blob = new Blob([vcardData], { type: 'text/vcard' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Otavio_Branco_SoloRico.vcf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // --- FAQ ACCORDION ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other items
      faqItems.forEach(other => other.classList.remove('active'));
      
      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // --- SCROLL REVEAL OBSERVER ---

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        const secondaryReveals = entry.target.querySelectorAll('.reveal, .cascade');
        secondaryReveals.forEach(el => el.classList.add('active'));
      }
    });
  }, observerOptions);

  const reveals = document.querySelectorAll('.reveal, .cascade');
  reveals.forEach(el => observer.observe(el));
});

