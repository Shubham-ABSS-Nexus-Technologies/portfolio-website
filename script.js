document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. MOBILE DRAWER MENU
     ========================================== */
  const navToggle = document.querySelector('.nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMenu() {
    if (!navToggle || !mobileDrawer) return;
    navToggle.classList.toggle('open');
    mobileDrawer.classList.toggle('open');
    // Prevent body scrolling when menu is open
    document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
  }

  if (navToggle && mobileDrawer) {
    navToggle.addEventListener('click', toggleMenu);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  /* ==========================================
     2. NAVBAR SCROLL EFFECT
     ========================================== */
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ==========================================
     3. SCROLL REVEAL (INTERSECTION OBSERVER)
     ========================================== */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // If it's a skill category card, animate the progress bars inside it
        if (entry.target.classList.contains('skills-category-card')) {
          const progressBars = entry.target.querySelectorAll('.skill-progress');
          progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
              bar.style.transition = 'width 1.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
              bar.style.width = width;
            }, 100);
          });
        }
        
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  /* ==========================================
     4. ACTIVE LINK BY URL PAGE
     ========================================== */
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  function highlightActive(links) {
    links.forEach(link => {
      const href = link.getAttribute('href');
      // Normalize comparison for root folder path
      const isHome = (currentPath === 'index.html' || currentPath === '') && href === 'index.html';
      if (href === currentPath || isHome) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  highlightActive(navLinks);
  highlightActive(mobileNavLinks);

  /* ==========================================
     5. CONTACT FORM VALIDATION & HANDLING
     ========================================== */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Reset statuses
      formStatus.style.display = 'none';
      formStatus.className = 'form-status';
      
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      let isValid = true;
      
      // Name validation
      if (!nameInput.value.trim()) {
        nameInput.parentElement.classList.add('invalid');
        isValid = false;
      } else {
        nameInput.parentElement.classList.remove('invalid');
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailInput.parentElement.classList.add('invalid');
        isValid = false;
      } else {
        emailInput.parentElement.classList.remove('invalid');
      }
      
      // Message validation
      if (!messageInput.value.trim()) {
        messageInput.parentElement.classList.add('invalid');
        isValid = false;
      } else {
        messageInput.parentElement.classList.remove('invalid');
      }
      
      if (isValid) {
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.querySelector('span').textContent;
        const subject = encodeURIComponent(`Portfolio inquiry from ${nameInput.value.trim()}`);
        const body = encodeURIComponent(
          `Name: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\n${messageInput.value.trim()}`
        );
        
        // Simulate loading state
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Opening email...';
        submitBtn.style.opacity = '0.7';
        
        setTimeout(() => {
          window.location.href = `mailto:shubhamkumar.contact@gmail.com?subject=${subject}&body=${body}`;

          // Success response
          formStatus.textContent = 'Your email app is opening with the message ready to send.';
          formStatus.classList.add('success');
          formStatus.style.display = 'block';
          
          // Reset form inputs
          contactForm.reset();
          
          // Reset button state
          submitBtn.disabled = false;
          submitBtn.querySelector('span').textContent = originalText;
          submitBtn.style.opacity = '1';
          
          // Clear success message after 5 seconds
          setTimeout(() => {
            formStatus.style.display = 'none';
          }, 5000);
        }, 1500);
      }
    });

    // Clear validation class on input focus/type
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.value.trim()) {
          input.parentElement.classList.remove('invalid');
        }
      });
    });
  }
});


