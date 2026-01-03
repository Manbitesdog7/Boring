/* ===================================
   BORINGBI - BROWSERBASE-INSPIRED JAVASCRIPT
   Complete Script File
   =================================== */

/* ===================================
   1. SERVICE TABS FUNCTION
   =================================== */
function showService(serviceId) {
    // Hide all service details
    document.querySelectorAll('.service-detail').forEach(detail => {
        detail.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.service-tab').forEach(tab => {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
    });
    
    // Show selected service detail
    const targetService = document.getElementById(serviceId);
    if (targetService) {
        targetService.classList.add('active');
    }
    
    // Add active class to clicked tab
    const clickedTab = document.querySelector(`[onclick="showService('${serviceId}')"]`);
    if (clickedTab) {
        clickedTab.classList.add('active');
        clickedTab.setAttribute('aria-selected', 'true');
    }
}

/* ===================================
   2. FEATURE TABS TOGGLE (Desktop Accordion)
   =================================== */
function toggleTab(tab) {
    const isCurrentlyActive = tab.classList.contains('active');
    
    // Close all tabs first
    document.querySelectorAll('.feature-tab').forEach(t => {
        t.classList.remove('active');
    });
    
    // If the clicked tab wasn't active, open it
    if (!isCurrentlyActive) {
        tab.classList.add('active');
        
        // Smooth scroll into view
        tab.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }
}

/* ===================================
   3. DOCUMENT STACK ANIMATION - CLICK TO SCATTER/CLOSE
   =================================== */
function initDocumentStackToggle() {
    const documentStack = document.querySelector('.document-stack');
    if (documentStack) {
        documentStack.addEventListener('click', function() {
            this.classList.toggle('scattered');
        });
    }
}

/* ===================================
   4. MOBILE HORIZONTAL SCROLL (BROWSERBASE STYLE)
   =================================== */
function initMobileHorizontalScroll() {
    if (window.innerWidth <= 768) {
        const carousel = document.getElementById('mobileCarousel');
        const dots = document.querySelectorAll('.mobile-dot');
        
        if (carousel && dots.length > 0) {
            // Update active dot on scroll
            carousel.addEventListener('scroll', () => {
                const cardWidth = carousel.offsetWidth;
                const scrollLeft = carousel.scrollLeft;
                const activeIndex = Math.round(scrollLeft / cardWidth);
                
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === activeIndex);
                });
            });
            
            // Click dots to scroll to card
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    const cardWidth = carousel.offsetWidth;
                    carousel.scrollTo({
                        left: index * cardWidth,
                        behavior: 'smooth'
                    });
                });
            });
        }
    }
}

/* ===================================
   5. SMOOTH SCROLL FOR NAVIGATION LINKS
   =================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for empty anchors
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                if (navLinks && navLinks.classList.contains('mobile-open')) {
                    navLinks.classList.remove('mobile-open');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    });
}

/* ===================================
   6. MOBILE MENU TOGGLE
   =================================== */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('mobile-open');
        });

        // Close menu when clicking on nav links
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('mobile-open');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('mobile-open');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

/* ===================================
   7. FORM HANDLING (IF YOU HAVE CONTACT FORMS)
   =================================== */
function handleFormSubmission() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with your actual logic)
                setTimeout(() => {
                    submitBtn.textContent = 'Message Sent!';
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        form.reset();
                    }, 2000);
                }, 1000);
            }
        });
    });
}

/* ===================================
   8. INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
   =================================== */
function initScrollAnimations() {
    // Check if browser supports IntersectionObserver
    if (!('IntersectionObserver' in window)) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate in
    const animatedElements = document.querySelectorAll('.svc-card, .service-card, .step, .testimonial-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/* ===================================
   9. DEBOUNCE UTILITY FUNCTION
   =================================== */
function debounce(func, wait) {
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

/* ===================================
   10. CHECK IF ELEMENT IS IN VIEWPORT
   =================================== */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/* ===================================
   11. KEYBOARD NAVIGATION FOR ACCESSIBILITY
   =================================== */
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Tab navigation for service tabs
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const activeTab = document.querySelector('.service-tab.active');
            if (activeTab && document.activeElement === activeTab) {
                e.preventDefault();
                const tabs = [...document.querySelectorAll('.service-tab')];
                const currentIndex = tabs.indexOf(activeTab);
                let newIndex;
                
                if (e.key === 'ArrowLeft') {
                    newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
                } else {
                    newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
                }
                
                tabs[newIndex].click();
                tabs[newIndex].focus();
            }
        }
        
        // Escape key to close mobile menu
        if (e.key === 'Escape') {
            const navLinks = document.querySelector('.nav-links');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (navLinks && navLinks.classList.contains('mobile-open')) {
                navLinks.classList.remove('mobile-open');
                if (mobileMenuBtn) {
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    mobileMenuBtn.focus();
                }
            }
        }
    });
}

/* ===================================
   12. PREVENT HORIZONTAL SCROLL ON MOBILE
   =================================== */
function preventHorizontalScroll() {
    // Ensure body doesn't scroll horizontally
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    
    // Check for elements that might cause horizontal scroll
    const checkOverflow = debounce(() => {
        const windowWidth = window.innerWidth;
        const bodyWidth = document.body.scrollWidth;
        
        if (bodyWidth > windowWidth) {
            console.warn('Horizontal overflow detected. Body width:', bodyWidth, 'Window width:', windowWidth);
        }
    }, 250);
    
    window.addEventListener('resize', checkOverflow);
    checkOverflow();
}

/* ===================================
   13. INITIALIZE ACTIVE STATES ON LOAD
   =================================== */
function initActiveStates() {
    // Set first service tab as active
    const firstServiceTab = document.querySelector('.service-tab');
    const firstServiceDetail = document.querySelector('.service-detail');
    if (firstServiceTab && firstServiceDetail) {
        firstServiceTab.classList.add('active');
        firstServiceTab.setAttribute('aria-selected', 'true');
        firstServiceDetail.classList.add('active');
    }
    
    // Set first feature tab as active (desktop)
    const firstFeatureTab = document.querySelector('.feature-tab');
    if (firstFeatureTab) {
        firstFeatureTab.classList.add('active');
    }
    
    // Set first mobile dot as active
    const firstDot = document.querySelector('.mobile-dot');
    if (firstDot) {
        firstDot.classList.add('active');
    }
}

/* ===================================
   14. HANDLE WINDOW RESIZE
   =================================== */
function handleResize() {
    const debouncedResize = debounce(() => {
        // Re-initialize mobile functions
        initMobileHorizontalScroll();
        
        // Close mobile menu on desktop
        if (window.innerWidth > 768) {
            const navLinks = document.querySelector('.nav-links');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (navLinks && navLinks.classList.contains('mobile-open')) {
                navLinks.classList.remove('mobile-open');
                if (mobileMenuBtn) {
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            }
        }
    }, 250);
    
    window.addEventListener('resize', debouncedResize);
}

/* ===================================
   15. PERFORMANCE: LAZY LOAD IMAGES (IF NEEDED)
   =================================== */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        // Observe all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/* ===================================
   16. ADD LOADING STATE TO CTA BUTTONS
   =================================== */
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-primary-big');
    ctaButtons.forEach(button => {
        if (button.getAttribute('href') && button.getAttribute('href').startsWith('mailto:')) {
            button.addEventListener('click', function() {
                // Optional: Track email clicks
                console.log('Email CTA clicked:', this.getAttribute('href'));
            });
        }
    });
}

/* ===================================
   17. MAIN INITIALIZATION - RUNS ON PAGE LOAD
   =================================== */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 BoringBI site loading...');
    
    try {
        // Core functionality
        initDocumentStackToggle();
        initMobileHorizontalScroll();
        initMobileMenu();
        initSmoothScroll();
        initActiveStates();
        
        // Enhanced functionality
        handleFormSubmission();
        initScrollAnimations();
        initKeyboardNavigation();
        initCTAButtons();
        initLazyLoading();
        
        // Window resize handler
        handleResize();
        
        // Prevent horizontal scroll
        preventHorizontalScroll();
        
        console.log('✅ BoringBI site fully loaded!');
    } catch (error) {
        console.error('❌ Error initializing site:', error);
    }
});

/* ===================================
   18. HANDLE PAGE VISIBILITY CHANGES
   =================================== */
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('👋 User switched away from tab');
    } else {
        console.log('👀 User returned to tab');
    }
});

/* ===================================
   19. EXPOSE FUNCTIONS TO GLOBAL SCOPE (FOR HTML ONCLICK)
   =================================== */
window.showService = showService;
window.toggleTab = toggleTab;

/* ===================================
   20. ERROR HANDLING
   =================================== */
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

/* ===================================
   END OF SCRIPT
   =================================== */