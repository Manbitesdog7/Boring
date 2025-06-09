// BoringBI Enhanced JavaScript - Complete Updated Version

// Enhanced Service Tabs Function - Fixed
function showService(serviceId) {
    // Hide all service details
    document.querySelectorAll('.service-detail').forEach(detail => {
        detail.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.service-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected service detail
    const targetService = document.getElementById(serviceId);
    if (targetService) {
        targetService.classList.add('active');
    }
    
    // Add active class to clicked tab - Fixed event handling
    const clickedTab = document.querySelector(`[onclick="showService('${serviceId}')"]`);
    if (clickedTab) {
        clickedTab.classList.add('active');
    }
}

// Enhanced Feature Tabs with Better Animation
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

// Document Stack Animation Toggle - CLICK TO SCATTER/CLOSE
function initDocumentStackToggle() {
    const documentStack = document.querySelector('.document-stack');
    if (documentStack) {
        documentStack.addEventListener('click', function() {
            this.classList.toggle('scattered');
        });
    }
}

// Mobile Horizontal Scroll Cards (Browserbase Style) - NEW
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

// Mobile Single Tab Animation on Scroll (Legacy - for fallback)
function initMobileTabAnimation() {
    if (window.innerWidth <= 768) {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, observerOptions);
        
        // Observe all mobile tab containers (if they exist)
        document.querySelectorAll('.mobile-tab-container').forEach(tab => {
            observer.observe(tab);
        });
    }
}

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form Handling (if you have contact forms)
function handleFormSubmission() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = form.querySelector('button[type="submit"]');
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
        });
    });
}

// Intersection Observer for Animations
function initScrollAnimations() {
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
    document.querySelectorAll('.service-card, .demo-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Performance: Debounce scroll events
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

// Utility: Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add keyboard navigation for accessibility
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
});

// MAIN INITIALIZATION - COMBINED ALL FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function() {
    console.log('BoringBI site loading...');
    
    // Initialize document stack click toggle
    initDocumentStackToggle();
    
    // Initialize mobile horizontal scroll (NEW BROWSERBASE STYLE)
    initMobileHorizontalScroll();
    
    // Initialize legacy mobile tab animation (fallback)
    initMobileTabAnimation();
    
    // Set first service tab as active
    const firstServiceTab = document.querySelector('.service-tab');
    const firstServiceDetail = document.querySelector('.service-detail');
    if (firstServiceTab && firstServiceDetail) {
        firstServiceTab.classList.add('active');
        firstServiceDetail.classList.add('active');
    }
    
    // Set first feature tab as active
    const firstFeatureTab = document.querySelector('.feature-tab');
    if (firstFeatureTab) {
        firstFeatureTab.classList.add('active');
    }
    
    // Re-initialize mobile functions on window resize
    window.addEventListener('resize', debounce(function() {
        initMobileHorizontalScroll();
        initMobileTabAnimation();
    }, 250));
    
    // Initialize other features
    initSmoothScroll();
    handleFormSubmission();
    initScrollAnimations();
    
    console.log('BoringBI site fully loaded!');
});