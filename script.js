// BoringBI Enhanced JavaScript - Fixed and Improved

// Typewriter Effect for Hero Section
class TypewriterEffect {
    constructor(element, words, speed = 100, deleteSpeed = 50, pauseTime = 2000) {
        this.element = element;
        this.words = words;
        this.speed = speed;
        this.deleteSpeed = deleteSpeed;
        this.pauseTime = pauseTime;
        this.currentWordIndex = 0;
        this.currentText = '';
        this.isDeleting = false;
        this.start();
    }
    
    start() {
        this.type();
    }
    
    type() {
        const currentWord = this.words[this.currentWordIndex];
        
        if (this.isDeleting) {
            this.currentText = currentWord.substring(0, this.currentText.length - 1);
        } else {
            this.currentText = currentWord.substring(0, this.currentText.length + 1);
        }
        
        this.element.textContent = this.currentText;
        
        let timeout = this.isDeleting ? this.deleteSpeed : this.speed;
        
        if (!this.isDeleting && this.currentText === currentWord) {
            timeout = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentText === '') {
            this.isDeleting = false;
            this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
            timeout = 500;
        }
        
        setTimeout(() => this.type(), timeout);
    }
}

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

// Fixed Mobile Carousel - Consistent Sizing
function scrollToSlide(index) {
    const carousel = document.getElementById('carousel');
    if (!carousel) return;
    
    const slideWidth = 280; // Consistent with CSS
    carousel.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth'
    });
    
    updateActiveDot(index);
}

// Enhanced Active Dot Update
function updateActiveDot(forceIndex = null) {
    const carousel = document.getElementById('carousel');
    if (!carousel) return;
    
    const slideWidth = 280; // Consistent with CSS
    const currentSlide = forceIndex !== null ? forceIndex : Math.round(carousel.scrollLeft / slideWidth);
    
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
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

// Enhanced Page Load Initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('BoringBI site loading...');
    
    // Initialize typewriter effect
    const rotatingTextElement = document.querySelector('.rotating-text');
    if (rotatingTextElement) {
        const words = [
            'Spreadsheet Chaos',
            'Data Mess',
            'Manual Reports',
            'Excel Hell',
            'Broken Dashboards'
        ];
        new TypewriterEffect(rotatingTextElement, words);
    }
    
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
    
    // Initialize mobile carousel
    const carousel = document.getElementById('carousel');
    if (carousel) {
        carousel.addEventListener('scroll', () => updateActiveDot());
        
        // Set first dot as active
        const firstDot = document.querySelector('.carousel-dot');
        if (firstDot) {
            firstDot.classList.add('active');
        }
    }
    
    // Initialize other features
    initSmoothScroll();
    handleFormSubmission();
    initScrollAnimations();
    
    console.log('BoringBI site fully loaded!');
});

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

// Apply debouncing to carousel scroll
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    if (carousel) {
        const debouncedUpdate = debounce(updateActiveDot, 100);
        carousel.addEventListener('scroll', debouncedUpdate);
    }
});

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