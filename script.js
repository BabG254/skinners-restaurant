/**
 * SKINNER'S RESTAURANT - LUXURY WEBSITE INTERACTIONS
 * Minimal, Modular, Performance-Optimized JavaScript
 * No Dependencies - Pure Vanilla JS
 */

class SkinnersRestaurant {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setupComponents();
      });
    } else {
      this.setupComponents();
    }
  }

  setupComponents() {
    this.setupNavigation();
    this.setupHeroSlider();
    this.setupMenuTabs();
    this.setupGalleryLightbox();
    this.setupScrollAnimations();
    this.setupReservationForm();
    this.setupMeatBoxCalculator();
    this.setupScrollIndicator();
    this.setupPerformanceOptimizations();
  }

  /**
   * Navigation System - Mobile-First Approach
   */
  setupNavigation() {
    const nav = document.querySelector('.main-nav');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Scroll effect for navigation - optimized for mobile
    let lastScrollTop = 0;
    let ticking = false;
    let scrollTimeout = null;

    const updateNav = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollDelta = Math.abs(scrollTop - lastScrollTop);
      
      // Only trigger effects if scroll is significant (reduces mobile jank)
      if (scrollDelta > 5) {
        // Add/remove scrolled class with mobile-friendly threshold
        if (scrollTop > 50) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }

        // Auto-hide navigation on scroll down (mobile UX improvement)
        if (window.innerWidth <= 768) {
          if (scrollTop > lastScrollTop && scrollTop > 200) {
            nav.classList.add('nav-hidden');
          } else {
            nav.classList.remove('nav-hidden');
          }
        }
      }

      lastScrollTop = scrollTop;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateNav);
        ticking = true;
      }
    };

    // Throttled scroll listener for better mobile performance
    window.addEventListener('scroll', () => {
      requestTick();
      
      // Clear any existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Show nav after scroll ends (mobile UX)
      scrollTimeout = setTimeout(() => {
        nav.classList.remove('nav-hidden');
      }, 150);
    }, { passive: true });

    // Enhanced mobile hamburger menu
    if (hamburger && navMenu) {
      // Touch-friendly click handler
      const toggleMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = hamburger.classList.contains('active');
        
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', !isOpen);

        // Enhanced mobile menu behavior
        if (!isOpen) {
          document.body.style.overflow = 'hidden';
          document.body.style.position = 'fixed';
          document.body.style.width = '100%';
          navMenu.style.paddingTop = nav.offsetHeight + 'px';
        } else {
          document.body.style.overflow = '';
          document.body.style.position = '';
          document.body.style.width = '';
        }
      };

      hamburger.addEventListener('click', toggleMenu);
      hamburger.addEventListener('touchend', toggleMenu);
      
      // Keyboard accessibility
      hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleMenu(e);
        }
      });
    }

    // Enhanced smooth scroll for navigation links (mobile-optimized)
    navLinks.forEach(link => {
      const handleNavClick = (e) => {
        const href = link.getAttribute('href');
        
        if (href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            const navHeight = nav.offsetHeight;
            // Mobile-specific offset adjustment
            const mobileOffset = window.innerWidth <= 768 ? 10 : 20;
            const targetPosition = targetElement.offsetTop - navHeight - mobileOffset;
            
            window.scrollTo({
              top: Math.max(0, targetPosition),
              behavior: 'smooth'
            });

            // Close mobile menu with enhanced animation
            if (hamburger && navMenu) {
              hamburger.classList.remove('active');
              navMenu.classList.remove('active');
              hamburger.setAttribute('aria-expanded', 'false');
              document.body.style.overflow = '';
              document.body.style.position = '';
              document.body.style.width = '';
            }
          }
        }
      };

      link.addEventListener('click', handleNavClick);
      link.addEventListener('touchend', (e) => {
        // Prevent double-tap zoom on mobile
        e.preventDefault();
        handleNavClick(e);
      });
    });

    // Enhanced click-outside behavior for mobile
    const closeMenuOnOutsideClick = (e) => {
      if (navMenu?.classList.contains('active') && 
          !navMenu.contains(e.target) && 
          !hamburger?.contains(e.target)) {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
        hamburger?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
      }
    };

    document.addEventListener('click', closeMenuOnOutsideClick);
    document.addEventListener('touchend', closeMenuOnOutsideClick);

    // Handle orientation change (mobile)
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        // Close menu on orientation change
        if (hamburger && navMenu) {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
          document.body.style.position = '';
          document.body.style.width = '';
        }
      }, 100);
    });
  }

  /**
   * Hero Slider with Touch Support
   */
  setupHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    if (!slides.length) return;

    let currentSlide = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let isTransitioning = false;

    const showSlide = (index) => {
      if (isTransitioning) return;
      isTransitioning = true;

      slides.forEach((slide, i) => {
        slide.style.opacity = i === index ? '1' : '0';
        slide.style.zIndex = i === index ? '1' : '0';
      });

      setTimeout(() => {
        isTransitioning = false;
      }, 600);
    };

    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    };

    const prevSlide = () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    };

    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);

    // Touch support for mobile swiping
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
      heroBackground.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
      }, { passive: true });

      heroBackground.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
      }, { passive: true });

      const handleSwipe = () => {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
          if (diff > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
      };
    }

    // Initialize first slide
    showSlide(0);
  }

  /**
   * Menu Tab System
   */
  setupMenuTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (!tabButtons.length || !tabPanels.length) return;

    const showTab = (targetId) => {
      // Hide all panels
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
        panel.setAttribute('aria-hidden', 'true');
      });

      // Deactivate all buttons
      tabButtons.forEach(button => {
        button.classList.remove('active');
        button.setAttribute('aria-selected', 'false');
      });

      // Show target panel
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
        targetPanel.setAttribute('aria-hidden', 'false');
      }

      // Activate target button
      const targetButton = document.querySelector(`[aria-controls="${targetId}"]`);
      if (targetButton) {
        targetButton.classList.add('active');
        targetButton.setAttribute('aria-selected', 'true');
      }
    };

    // Add click listeners to tab buttons
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetId = button.getAttribute('aria-controls');
        showTab(targetId);
      });

      // Keyboard navigation
      button.addEventListener('keydown', (e) => {
        let nextButton = null;
        
        if (e.key === 'ArrowRight') {
          nextButton = button.nextElementSibling || tabButtons[0];
        } else if (e.key === 'ArrowLeft') {
          nextButton = button.previousElementSibling || tabButtons[tabButtons.length - 1];
        }

        if (nextButton) {
          e.preventDefault();
          nextButton.focus();
          nextButton.click();
        }
      });
    });
  }

  /**
   * Gallery Lightbox System - Enhanced for Mobile
   */
  setupGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    if (!galleryItems.length || !lightbox) return;

    let currentImageIndex = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    
    const images = Array.from(galleryItems).map(item => {
      const img = item.querySelector('img');
      return {
        src: img.src,
        alt: img.alt
      };
    });

    const openLightbox = (index) => {
      currentImageIndex = index;
      const image = images[index];
      
      lightboxImg.src = image.src;
      lightboxImg.alt = image.alt;
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      
      // Focus management
      closeBtn?.focus();
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      
      // Preload adjacent images for smooth navigation
      this.preloadAdjacentImages(index);
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      
      // Return focus to the clicked gallery item
      galleryItems[currentImageIndex]?.focus();
    };

    const showNextImage = () => {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      const image = images[currentImageIndex];
      lightboxImg.style.opacity = '0';
      setTimeout(() => {
        lightboxImg.src = image.src;
        lightboxImg.alt = image.alt;
        lightboxImg.style.opacity = '1';
      }, 150);
      this.preloadAdjacentImages(currentImageIndex);
    };

    const showPrevImage = () => {
      currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
      const image = images[currentImageIndex];
      lightboxImg.style.opacity = '0';
      setTimeout(() => {
        lightboxImg.src = image.src;
        lightboxImg.alt = image.alt;
        lightboxImg.style.opacity = '1';
      }, 150);
      this.preloadAdjacentImages(currentImageIndex);
    };

    // Add click listeners to gallery items
    galleryItems.forEach((item, index) => {
      const clickHandler = () => openLightbox(index);
      
      item.addEventListener('click', clickHandler);
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          clickHandler();
        }
      });
    });

    // Touch support for mobile swiping in lightbox
    if (lightbox) {
      lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }, { passive: true });

      lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;
        handleLightboxSwipe();
      }, { passive: true });

      const handleLightboxSwipe = () => {
        const swipeThreshold = 50;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        // Only handle horizontal swipes (ignore vertical scrolls)
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
          if (diffX > 0) {
            showNextImage();
          } else {
            showPrevImage();
          }
        } else if (Math.abs(diffY) > swipeThreshold && diffY > 0) {
          // Swipe up to close
          closeLightbox();
        }
      };
    }

    // Lightbox controls
    closeBtn?.addEventListener('click', closeLightbox);
    prevBtn?.addEventListener('click', showPrevImage);
    nextBtn?.addEventListener('click', showNextImage);

    // Close lightbox when clicking background
    lightbox?.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Enhanced keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox?.classList.contains('active')) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowRight':
          e.preventDefault();
          showNextImage();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          showPrevImage();
          break;
      }
    });

    // Add smooth image transition
    if (lightboxImg) {
      lightboxImg.style.transition = 'opacity 0.15s ease-in-out';
    }
  }

  preloadAdjacentImages(currentIndex) {
    const images = document.querySelectorAll('.gallery-item img');
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    const nextIndex = (currentIndex + 1) % images.length;
    
    [prevIndex, nextIndex].forEach(index => {
      const img = new Image();
      img.src = images[index].src;
    });
  }

  /**
   * Scroll Animations using Intersection Observer
   */
  setupScrollAnimations() {
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll(`
      .about-content > *,
      .menu-section .section-title,
      .gallery-section .section-title,
      .reservations-section .section-title,
      .location-info > *
    `);

    // Intersection Observer for performance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    });

    // Add animation classes and observe elements
    animatedElements.forEach((el, index) => {
      // Alternate animation types for visual interest
      if (index % 3 === 0) {
        el.classList.add('fade-in');
      } else if (index % 3 === 1) {
        el.classList.add('slide-in-left');
      } else {
        el.classList.add('slide-in-right');
      }
      
      observer.observe(el);
    });
  }

  /**
   * Reservation Form Handler
   */
  setupReservationForm() {
    const form = document.getElementById('reservationForm');
    const reserveBtn = document.getElementById('reserveBtn');

    if (!form) return;

    // Set minimum date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }

    // Form validation and submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Basic validation
      const requiredFields = ['name', 'phone', 'date', 'time', 'guests'];
      const missingFields = requiredFields.filter(field => !data[field]);

      if (missingFields.length > 0) {
        this.showNotification('Please fill in all required fields.', 'error');
        return;
      }

      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Confirming...';
      submitBtn.disabled = true;

      try {
        // Simulate API call (replace with actual endpoint)
        await this.simulateApiCall(data);
        
        // Success feedback
        this.showNotification('Reservation confirmed! We\'ll call you shortly.', 'success');
        form.reset();
        
        // Update date minimum again after reset
        if (dateInput) {
          const today = new Date().toISOString().split('T')[0];
          dateInput.setAttribute('min', today);
        }

      } catch (error) {
        this.showNotification('Unable to process reservation. Please call us directly.', 'error');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });

    // Hero CTA button scroll to reservations
    reserveBtn?.addEventListener('click', () => {
      const reservationsSection = document.getElementById('reservations');
      if (reservationsSection) {
        const navHeight = document.querySelector('.main-nav').offsetHeight;
        const targetPosition = reservationsSection.offsetTop - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }

  /**
   * Meat Box Calculator
   */
  setupMeatBoxCalculator() {
    const form = document.getElementById('meatBoxForm');
    const totalAmount = document.getElementById('totalAmount');
    const orderBtn = document.getElementById('orderBoxBtn');

    if (!form || !totalAmount) return;

    const calculateTotal = () => {
      const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
      const deliveryOption = form.querySelector('input[name="delivery"]:checked');
      
      let total = 0;
      
      // Add up selected cuts (assuming 1kg each for simplicity)
      checkboxes.forEach(checkbox => {
        const price = parseInt(checkbox.dataset.price) * 10; // Convert to actual price
        total += price;
      });

      // Add delivery cost
      if (deliveryOption?.value === 'delivery') {
        total += 200;
      }

      totalAmount.textContent = total.toLocaleString();
    };

    // Listen for changes in form inputs
    form.addEventListener('change', calculateTotal);

    // Initial calculation
    calculateTotal();

    // Order button handler
    orderBtn?.addEventListener('click', () => {
      const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
      
      if (checkboxes.length === 0) {
        this.showNotification('Please select at least one cut of meat.', 'error');
        return;
      }

      const total = totalAmount.textContent;
      const message = `I'd like to order a meat box for KES ${total}. Please contact me for details.`;
      const whatsappUrl = `https://wa.me/254724168413?text=${encodeURIComponent(message)}`;
      
      window.open(whatsappUrl, '_blank');
    });
  }

  /**
   * Scroll Indicator Animation
   */
  setupScrollIndicator() {
    const indicator = document.querySelector('.scroll-indicator');
    
    if (!indicator) return;

    const hideIndicator = () => {
      if (window.scrollY > 100) {
        indicator.style.opacity = '0';
        indicator.style.pointerEvents = 'none';
      } else {
        indicator.style.opacity = '1';
        indicator.style.pointerEvents = 'auto';
      }
    };

    window.addEventListener('scroll', hideIndicator, { passive: true });

    // Click handler for scroll indicator
    indicator.addEventListener('click', () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const navHeight = document.querySelector('.main-nav').offsetHeight;
        const targetPosition = aboutSection.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }

  /**
   * Performance Optimizations
   */
  setupPerformanceOptimizations() {
    // Lazy load images that aren't already lazy loaded
    this.setupLazyLoading();
    
    // Preload critical images
    this.preloadCriticalImages();
    
    // Setup service worker if available
    this.setupServiceWorker();
  }

  setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    // Fallback for browsers that don't support loading="lazy"
    if ('loading' in HTMLImageElement.prototype) {
      return; // Native lazy loading is supported
    }

    // Intersection Observer fallback
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => {
      imageObserver.observe(img);
    });
  }

  preloadCriticalImages() {
    const criticalImages = [
      'assets/images/hero-mobile.webp',
      'assets/images/hero-tablet.webp',
      'assets/images/hero-desktop.webp',
      'assets/images/skinners-logo.svg'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }

  /**
   * Utility Functions
   */
  async simulateApiCall(data) {
    // Simulate network delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 90% success rate
        if (Math.random() > 0.1) {
          resolve({ success: true, data });
        } else {
          reject(new Error('API Error'));
        }
      }, 1500);
    });
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Styles for notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '16px 24px',
      backgroundColor: type === 'error' ? '#dc3545' : type === 'success' ? '#28a745' : '#007bff',
      color: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      zIndex: '10000',
      maxWidth: '300px',
      fontSize: '14px',
      lineHeight: '1.4',
      transform: 'translateX(400px)',
      transition: 'transform 0.3s ease',
    });

    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
      notification.style.transform = 'translateX(0)';
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 5000);

    // Click to dismiss
    notification.addEventListener('click', () => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    });
  }

  // Debug helper
  debug(message, data = null) {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log(`[Skinner's Debug] ${message}`, data);
    }
  }
}

// Initialize the application
const app = new SkinnersRestaurant();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SkinnersRestaurant;
}

/**
 * Additional Micro-Interactions & Polish
 */

// Sound effect helper (optional)
class SoundManager {
  constructor() {
    this.context = null;
    this.enabled = false;
    this.init();
  }

  init() {
    // Only initialize if user interacts with the page
    document.addEventListener('click', () => {
      this.setup();
    }, { once: true });
  }

  setup() {
    try {
      this.context = new (window.AudioContext || window.webkitAudioContext)();
      this.enabled = true;
    } catch (error) {
      console.log('Audio not supported');
    }
  }

  playHoverSound() {
    if (!this.enabled || !this.context) return;

    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.context.destination);

    oscillator.frequency.value = 800;
    gainNode.gain.setValueAtTime(0.1, this.context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.1);

    oscillator.start(this.context.currentTime);
    oscillator.stop(this.context.currentTime + 0.1);
  }
}

// Optional sound effects for premium experience
const soundManager = new SoundManager();

// Add subtle hover sounds to CTA buttons
document.addEventListener('DOMContentLoaded', () => {
  const ctaButtons = document.querySelectorAll('.cta');
  ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      // Only play if user has interacted with audio
      if (soundManager.enabled) {
        soundManager.playHoverSound();
      }
    });
  });
});

/**
 * Performance Monitoring
 */
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.init();
  }

  init() {
    // Core Web Vitals monitoring
    if ('PerformanceObserver' in window) {
      this.observeLCP();
      this.observeFID();
      this.observeCLS();
    }

    // Page load metrics
    window.addEventListener('load', () => {
      this.recordLoadMetrics();
    });
  }

  observeLCP() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.lcp = lastEntry.startTime;
      this.debug('LCP:', this.metrics.lcp);
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  }

  observeFID() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.metrics.fid = entry.processingStart - entry.startTime;
        this.debug('FID:', this.metrics.fid);
      }
    });

    observer.observe({ entryTypes: ['first-input'] });
  }

  observeCLS() {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      this.metrics.cls = clsValue;
      this.debug('CLS:', this.metrics.cls);
    });

    observer.observe({ entryTypes: ['layout-shift'] });
  }

  recordLoadMetrics() {
    const navigation = performance.getEntriesByType('navigation')[0];
    this.metrics.loadTime = navigation.loadEventEnd - navigation.loadEventStart;
    this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
    this.metrics.ttfb = navigation.responseStart - navigation.requestStart;

    this.debug('Performance Metrics:', this.metrics);
  }

  debug(message, data) {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log(`[Performance] ${message}`, data);
    }
  }
}

// Initialize performance monitoring
const perfMonitor = new PerformanceMonitor();

/**
 * Error Handling & Fallbacks
 */
window.addEventListener('error', (event) => {
  console.error('JavaScript error:', event.error);
  
  // Fallback for broken JavaScript
  if (event.error && event.error.message) {
    // Hide any loading states
    document.querySelectorAll('[data-loading]').forEach(el => {
      el.style.display = 'none';
    });
    
    // Ensure navigation still works
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'block' ? 'none' : 'block';
      });
    }
  }
});

// Prevent right-click on images (optional protection)
document.addEventListener('contextmenu', (e) => {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }
});

// Disable text selection on UI elements
document.addEventListener('selectstart', (e) => {
  if (e.target.closest('.nav-menu, .tab-button, .cta')) {
    e.preventDefault();
  }
});

/**
 * Final Polish & Easter Eggs
 */

// Konami code easter egg (for fun)
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.keyCode);
  
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }
  
  if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
    document.body.style.animation = 'rainbow 2s linear infinite';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
  }
});

// Rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(style);

console.log('%cSkinner\'s Restaurant - Crafted with 🔥', 'color: #E60023; font-size: 16px; font-weight: bold;');
console.log('%cThis website was built with passion, precision, and performance in mind.', 'color: #1A1A1A; font-size: 12px;');
