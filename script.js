// Performance optimization: throttle scroll events
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Enhanced Intersection Observer for animations and underline drawing
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Animate section header underlines
      if (entry.target.tagName === 'H2') {
        entry.target.classList.add('animate-underline');
        // Don't unobserve h2 elements so animation can retrigger if needed
      } else {
        // Unobserve other elements after animation to improve performance
        observer.unobserve(entry.target);
      }
      
      // Add parallax effect to images with parallax class
      if (entry.target.classList.contains('parallax')) {
        entry.target.classList.add('visible');
      }
    }
  });
}, observerOptions);

// Observe all elements with fade-in class, section headers, and parallax images
document.querySelectorAll('.fade-in, section h2, .parallax').forEach(el => {
  observer.observe(el);
});

// Enhanced Mobile Navigation with Improved Focus Trapping
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
let isMenuOpen = false;
let focusableElements = [];
let firstFocusableElement = null;
let lastFocusableElement = null;

// Get all focusable elements in the nav menu
function updateFocusableElements() {
  focusableElements = Array.from(navMenu.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])'));
  firstFocusableElement = focusableElements[0];
  lastFocusableElement = focusableElements[focusableElements.length - 1];
}

function trapFocus(e) {
  if (!isMenuOpen) return;
  
  if (e.key === 'Tab') {
    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        e.preventDefault();
        lastFocusableElement.focus();
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        e.preventDefault();
        firstFocusableElement.focus();
      }
    }
  }
  
  if (e.key === 'Escape') {
    closeMenu();
  }
}

function openMenu() {
  isMenuOpen = true;
  hamburger.classList.add('active');
  navMenu.classList.add('active');
  hamburger.setAttribute('aria-expanded', 'true');
  
  // Update focusable elements and focus first one
  updateFocusableElements();
  if (firstFocusableElement) {
    firstFocusableElement.focus();
  }
  
  // Add focus trap and prevent body scroll
  document.addEventListener('keydown', trapFocus);
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  isMenuOpen = false;
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  
  // Remove focus trap and restore body scroll
  document.removeEventListener('keydown', trapFocus);
  document.body.style.overflow = '';
  
  // Return focus to hamburger button
  hamburger.focus();
}

hamburger.addEventListener('click', () => {
  if (isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (isMenuOpen) {
      closeMenu();
    }
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (isMenuOpen && !document.querySelector('.navbar').contains(e.target)) {
    closeMenu();
  }
});

// Navbar scroll effect with performance optimization
const navbar = document.getElementById('navbar');

const handleNavbarScroll = throttle(() => {
  if (window.scrollY > 100) {
    navbar.classList.remove('transparent');
    navbar.classList.add('solid');
  } else {
    navbar.classList.remove('solid');
    navbar.classList.add('transparent');
  }
}, 16); // ~60fps

window.addEventListener('scroll', handleNavbarScroll);

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Dynamic Projects Data (ready for JSON feed)
const projectsData = [
  {
    id: 1,
    title: "Strategic Cost Optimization Initiative",
    description: "Led a comprehensive analysis that identified $2M in cost savings through process automation and vendor consolidation across multiple business units.",
    image: "images/project1.jpg",
    details: "Implemented data-driven methodologies to analyze operational inefficiencies, resulting in 35% improvement in process efficiency and significant cost reduction.",
    impact: "$2M cost savings, 35% efficiency improvement",
    tags: ["Strategy", "Cost Reduction", "Process Optimization"]
  },
  {
    id: 2,
    title: "Digital Transformation & Analytics",
    description: "Spearheaded the implementation of advanced analytics platforms that enhanced decision-making capabilities and operational visibility.",
    image: "images/project2.jpg",
    details: "Designed and deployed KPI frameworks and dashboards that provided real-time insights into business performance metrics.",
    impact: "40% improvement in data-driven decision making",
    tags: ["Analytics", "Digital Transformation", "KPIs"]
  },
  {
    id: 3,
    title: "Product Strategy & User Experience",
    description: "Developed customer-centric product features that significantly improved user engagement and satisfaction metrics.",
    image: "images/project3.jpg",
    details: "Conducted comprehensive market research and user analysis to inform strategic product decisions and feature prioritization.",
    impact: "40% increase in user engagement",
    tags: ["Product Management", "UX", "Market Research"]
  },
  {
    id: 4,
    title: "Cross-Functional Leadership",
    description: "Led diverse teams across multiple departments to deliver complex projects ahead of schedule and under budget.",
    image: "images/project4.jpg",
    details: "Facilitated stakeholder alignment sessions and implemented agile methodologies to accelerate project delivery timelines.",
    impact: "25% faster project delivery",
    tags: ["Leadership", "Agile", "Project Management"]
  },
  {
    id: 5,
    title: "Innovation & Process Design",
    description: "Designed and implemented innovative solutions that streamlined operations and enhanced organizational capabilities.",
    image: "images/project5.jpg",
    details: "Applied design thinking principles to reimagine business processes and create scalable solutions for operational challenges.",
    impact: "30% reduction in process complexity",
    tags: ["Innovation", "Process Design", "Design Thinking"]
  },
  {
    id: 6,
    title: "Strategic Planning & Execution",
    description: "Developed comprehensive strategic plans that aligned organizational objectives with market opportunities and competitive advantages.",
    image: "images/project6.jpg",
    details: "Created detailed roadmaps and execution frameworks that guided successful implementation of strategic initiatives.",
    impact: "100% strategic objective achievement",
    tags: ["Strategic Planning", "Execution", "Roadmapping"]
  }
];

// Enhanced project loading with shimmer states
function loadProjects() {
  const projectsGrid = document.getElementById('projects-grid');
  
  // Check if element exists before proceeding
  if (!projectsGrid) {
    console.log('projects-grid element not found, skipping loadProjects');
    return;
  }
  
  // Clear existing content
  projectsGrid.innerHTML = '';
  
  projectsData.forEach((project, index) => {
    const projectCard = document.createElement('div');
    projectCard.className = `project-card fade-in stagger-${(index % 6) + 1}`;
    projectCard.setAttribute('tabindex', '0');
    projectCard.setAttribute('role', 'button');
    projectCard.setAttribute('aria-label', `View details for ${project.title}`);
    
    projectCard.innerHTML = `
      <img 
        src="${project.image}" 
        alt="${project.title}" 
        class="project-image loading" 
        loading="lazy"
        onerror="this.src='https://via.placeholder.com/350x240/6366f1/ffffff?text=${encodeURIComponent(project.title)}'"
      >
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-impact">
          ${project.impact}
        </div>
      </div>
    `;
    
    // Enhanced image loading
    const img = projectCard.querySelector('.project-image');
    img.addEventListener('load', () => {
      img.classList.remove('loading');
    });
    
    // Add click and keyboard event handlers
    const handleProjectOpen = () => showProjectModal(project);
    
    projectCard.addEventListener('click', handleProjectOpen);
    projectCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleProjectOpen();
      }
    });
    
    projectsGrid.appendChild(projectCard);
    observer.observe(projectCard);
  });
}

// Enhanced project modal functionality with better accessibility
function showProjectModal(project) {
  // Create modal if it doesn't exist
  let modal = document.getElementById('project-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'project-modal';
    modal.className = 'modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'modal-title');
    modal.setAttribute('aria-describedby', 'modal-description');
    modal.innerHTML = `
      <div class="modal-content">
        <button class="close" aria-label="Close modal">&times;</button>
        <div class="modal-body">
          <img id="modal-image" src="" alt="" class="modal-image">
          <div class="modal-text">
            <h2 id="modal-title"></h2>
            <p id="modal-description"></p>
            <div id="modal-details"></div>
            <div id="modal-impact"></div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Add enhanced modal styles
    const modalStyles = `
      .modal {
        display: none;
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.8);
        backdrop-filter: blur(10px);
        animation: fadeIn 0.3s ease-out;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      .modal-content {
        background-color: var(--bg-light);
        margin: 3% auto;
        padding: 0;
        border-radius: var(--border-radius-large);
        width: 90%;
        max-width: 900px;
        position: relative;
        overflow: hidden;
        box-shadow: 0 20px 60px var(--shadow-heavy);
        animation: slideUp 0.3s ease-out;
      }
      
      @keyframes slideUp {
        from { transform: translateY(50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      
      .close {
        position: absolute;
        right: 20px;
        top: 20px;
        font-size: 24px;
        font-weight: bold;
        color: white;
        cursor: pointer;
        z-index: 2001;
        background: rgba(0,0,0,0.6);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color var(--transition-medium);
      }
      
      .close:hover,
      .close:focus {
        background: rgba(0,0,0,0.8);
        outline: 2px solid var(--primary);
        outline-offset: 2px;
      }
      
      .modal-body {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0;
        min-height: 400px;
      }
      
      .modal-image {
        width: 100%;
        height: 400px;
        object-fit: cover;
      }
      
      .modal-text {
        padding: 3rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      
      .modal-text h2 {
        margin-bottom: 1.5rem;
        color: var(--text-primary);
        font-size: 1.5rem;
        line-height: 1.3;
      }
      
      .modal-text p {
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 1.5rem;
      }
      
      #modal-details {
        background: var(--bg-dark);
        padding: 1.5rem;
        border-radius: 12px;
        margin: 1.5rem 0;
        color: var(--text-secondary);
        line-height: 1.6;
      }
      
      #modal-impact {
        background: rgba(0, 122, 255, 0.1);
        color: var(--primary);
        padding: 1rem 1.5rem;
        border-radius: 12px;
        font-weight: 600;
        text-align: center;
      }
      
      @media (max-width: 768px) {
        .modal-content {
          margin: 10% auto;
          width: 95%;
        }
        
        .modal-body {
          grid-template-columns: 1fr;
        }
        
        .modal-image {
          height: 250px;
        }
        
        .modal-text {
          padding: 2rem;
        }
      }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);
    
    // Enhanced modal close functionality
    const closeBtn = modal.querySelector('.close');
    
    function closeModal() {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      // Return focus to the project card that opened the modal
      const activeCard = document.querySelector('.project-card:focus');
      if (activeCard) {
        activeCard.focus();
      }
    }
    
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
    
    // Enhanced keyboard support
    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  }
  
  // Update modal content
  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-description').textContent = project.description;
  document.getElementById('modal-details').textContent = project.details;
  document.getElementById('modal-impact').textContent = `Impact: ${project.impact}`;
  
  const modalImage = document.getElementById('modal-image');
  modalImage.src = project.image;
  modalImage.alt = project.title;
  modalImage.onerror = function() {
    this.src = `https://via.placeholder.com/450x400/007AFF/ffffff?text=${encodeURIComponent(project.title)}`;
  };
  
  // Show modal with focus management
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  
  // Focus the close button for accessibility
  setTimeout(() => {
    modal.querySelector('.close').focus();
  }, 100);
}

// Enhanced contact form handling with better validation
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const name = formData.get('name').trim();
      const email = formData.get('email').trim();
      const subject = formData.get('subject').trim();
      const message = formData.get('message').trim();
      
      // Enhanced form validation
      const errors = [];
      
      if (!name) errors.push('Name is required');
      if (!email) errors.push('Email is required');
      else if (!isValidEmail(email)) errors.push('Please enter a valid email address');
      if (!subject) errors.push('Subject is required');
      if (!message) errors.push('Message is required');
      
      if (errors.length > 0) {
        showNotification(errors.join('. '), 'error');
        return;
      }
      
      // Simulate form submission with better UX
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      
      setTimeout(() => {
        showNotification('Thank you for your message! I\'ll get back to you within 24 hours.', 'success');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }, 2000);
    });
  }
});

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Enhanced notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.setAttribute('role', 'alert');
  notification.setAttribute('aria-live', 'polite');
  
  // Add notification styles if not already present
  if (!document.getElementById('notification-styles')) {
    const notificationStyles = `
      .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        color: white;
        font-weight: 500;
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
        box-shadow: 0 8px 30px var(--shadow-heavy);
      }
      
      .notification.success {
        background-color: #10B981;
      }
      
      .notification.error {
        background-color: #EF4444;
      }
      
      .notification.info {
        background-color: var(--primary);
      }
      
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      
      @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.id = 'notification-styles';
    styleSheet.textContent = notificationStyles;
    document.head.appendChild(styleSheet);
  }
  
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// Active navigation link highlighting
const handleNavHighlight = throttle(() => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}, 100);

window.addEventListener('scroll', handleNavHighlight);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize projects (with error handling)
  try {
    loadProjects();
  } catch (error) {
    console.error('Error loading projects:', error);
  }
  
  // Initialize project tabs (with error handling)
  try {
    initProjectTabs();
  } catch (error) {
    console.error('Error initializing project tabs:', error);
  }
  
  // Add loading animation to images with lazy loading support
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', () => {
      img.classList.remove('loading');
    });
    
    if (!img.complete && !img.hasAttribute('loading')) {
      img.classList.add('loading');
    }
  });
  
  // Initialize fade-in animations for elements already in view
  setTimeout(() => {
    const elementsInView = document.querySelectorAll('.fade-in');
    elementsInView.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
      }
    });
  }, 100);
  
  // Add reduced motion support
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Disable parallax for users who prefer reduced motion
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(el => {
      el.style.backgroundAttachment = 'scroll';
    });
  }
});

// Fade‑in‑up on scroll
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
  });
});

// Handle window resize for responsive adjustments
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && isMenuOpen) {
      closeMenu();
    }
  }, 250);
});

// ===================================================================
// ===================================================================
// Elegant Project Tabs Functionality
// ===================================================================
function initProjectTabs() {
  const tabsContainer = document.getElementById('project-tabs');
  if (!tabsContainer) return;

  const tabs = tabsContainer.querySelectorAll('.tab-pill');
  const panes = document.querySelectorAll('.project-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const project = tab.dataset.project;

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Show the corresponding pane
      panes.forEach(pane => {
        if (pane.dataset.project === project) {
          pane.classList.add('visible');
          pane.style.display = 'block';
        } else {
          pane.classList.remove('visible');
          pane.style.display = 'none';
        }
      });
    });
  });
}


// Calendly widget loader handling
document.addEventListener('DOMContentLoaded', function() {
  // Hide the loader after Calendly widget has had time to load
  setTimeout(function() {
    const loader = document.getElementById('calendly-loader');
    if (loader) {
      loader.style.display = 'none';
    }
  }, 2000); // 2 seconds should be enough for most connections
  
  // Also hide loader when Calendly widget becomes visible (backup method)
  const calendlyWidget = document.querySelector('.calendly-inline-widget');
  if (calendlyWidget) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.target.children.length > 0) {
          const loader = document.getElementById('calendly-loader');
          if (loader) {
            loader.style.display = 'none';
          }
          observer.disconnect(); // Stop observing once loaded
        }
      });
    });
    
    observer.observe(calendlyWidget, { childList: true, subtree: true });
  }
});
