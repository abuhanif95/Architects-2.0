// ===== script.js – Complete Functionality with Login/Logout =====

document.addEventListener('DOMContentLoaded', function() {
  // ===== DOM Elements =====
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const darkModeToggle = document.getElementById('darkModeToggle');
  const backToTop = document.getElementById('backToTop');
  const body = document.body;
  const searchBtn = document.querySelector('.search-btn');
  const authBtn = document.getElementById('authBtn');
  const authText = document.getElementById('authText');
  const loginModal = document.getElementById('loginModal');
  const closeModal = document.querySelector('.close-modal');
  const loginForm = document.getElementById('loginForm');
  const contactForm = document.getElementById('contactForm');
  const newsletterForm = document.querySelector('.newsletter-form');

  // ===== Check Login Status =====
  let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // Update auth button based on login status
  function updateAuthButton() {
    if (authBtn && authText) {
      if (isLoggedIn) {
        authBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> <span id="authText">Logout</span>';
        authBtn.classList.add('logged-in');
      } else {
        authBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> <span id="authText">Login</span>';
        authBtn.classList.remove('logged-in');
      }
    }
  }
  updateAuthButton();

  // ===== Sticky Navbar =====
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ===== Mobile Menu Toggle =====
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      
      const icon = hamburgerBtn.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        body.style.overflow = 'hidden';
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        body.style.overflow = 'auto';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navMenu.contains(event.target) && !hamburgerBtn.contains(event.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = hamburgerBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        body.style.overflow = 'auto';
      }
    });

    // Close menu on window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = hamburgerBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        body.style.overflow = 'auto';
      }
    });
  }

  // ===== Smooth Scroll for Navigation =====
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          const icon = hamburgerBtn.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
          body.style.overflow = 'auto';
        }
        
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update active link
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  // ===== Update Active Link on Scroll =====
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY + navbar.offsetHeight + 100;
    
    document.querySelectorAll('section[id]').forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // ===== Dark Mode Toggle =====
  if (darkModeToggle) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark-mode');
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    darkModeToggle.addEventListener('click', function() {
      body.classList.toggle('dark-mode');
      
      if (body.classList.contains('dark-mode')) {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
      } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
      }
      
      darkModeToggle.style.transform = 'rotate(180deg)';
      setTimeout(() => {
        darkModeToggle.style.transform = 'rotate(0)';
      }, 300);
    });
  }

  // ===== Back to Top Button =====
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
    
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===== Auth Button (Login/Logout) =====
  if (authBtn) {
    authBtn.addEventListener('click', function() {
      if (isLoggedIn) {
        // Logout
        isLoggedIn = false;
        localStorage.setItem('isLoggedIn', 'false');
        updateAuthButton();
        
        // Show logout message
        alert('You have been logged out successfully.');
        
        // Close modal if open
        if (loginModal.classList.contains('show')) {
          loginModal.classList.remove('show');
        }
      } else {
        // Show login modal
        loginModal.classList.add('show');
      }
    });
  }

  // ===== Close Modal =====
  if (closeModal) {
    closeModal.addEventListener('click', function() {
      loginModal.classList.remove('show');
    });
  }

  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === loginModal) {
      loginModal.classList.remove('show');
    }
  });

  // ===== Login Form Submission =====
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const username = document.getElementById('loginUsername').value;
      const password = document.getElementById('loginPassword').value;
      
      // Simple demo authentication
      if (username === 'demo' && password === 'demo123') {
        isLoggedIn = true;
        localStorage.setItem('isLoggedIn', 'true');
        updateAuthButton();
        
        loginModal.classList.remove('show');
        loginForm.reset();
        
        // Show success message
        alert('Login successful! Welcome back.');
      } else {
        alert('Invalid credentials. Try demo/demo123');
      }
    });
  }

  // ===== Contact Form Submission =====
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (!isLoggedIn) {
        alert('Please login first to send a message.');
        loginModal.classList.add('show');
        return;
      }
      
      // Simulate form submission
      const name = document.getElementById('name').value;
      alert(`Thank you ${name}! Your message has been sent successfully.`);
      contactForm.reset();
    });
  }

  // ===== Newsletter Form Submission =====
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      alert(`Thank you for subscribing with ${email}!`);
      this.reset();
    });
  }

  // ===== Search Button =====
  if (searchBtn) {
    searchBtn.addEventListener('click', function() {
      alert('Search feature coming soon!');
    });
  }

  // ===== 3D Card Effect (Enhanced) =====
  const cards = document.querySelectorAll('.feature-card-3d, .fact-card-3d, .contact-info-3d, .contact-form-3d');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      
      // Glow effect
      const glow = `radial-gradient(circle at ${x}px ${y}px, rgba(199,154,75,0.15), transparent 70%)`;
      card.style.backgroundImage = glow;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.backgroundImage = '';
    });
  });

  // ===== Intersection Observer for Animations =====
  const animatedElements = document.querySelectorAll('.feature-card-3d, .fact-card-3d, .team-images, .team-content, .features-right, .contact-info-3d, .contact-form-3d');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
  
  // Add animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);

  // ===== Responsive Adjustments =====
  function handleResize() {
    const expBadge = document.querySelector('.experience-badge');
    if (expBadge) {
      if (window.innerWidth <= 768) {
        expBadge.style.position = 'static';
        expBadge.style.marginTop = '20px';
      } else {
        expBadge.style.position = 'absolute';
        expBadge.style.marginTop = '0';
      }
    }
    
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
      if (window.innerWidth <= 480) {
        heroBadge.style.position = 'static';
        heroBadge.style.marginTop = '20px';
      } else {
        heroBadge.style.position = 'absolute';
        heroBadge.style.marginTop = '0';
      }
    }
  }
  
  window.addEventListener('resize', handleResize);
  handleResize();

  // ===== Prevent Default for Empty Links =====
  document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => e.preventDefault());
  });

  console.log('Website loaded with 3D cards and login functionality!');
});