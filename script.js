// Enhanced Service Tabs Function
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
    document.getElementById(serviceId).classList.add('active');
    
    // Add active class to clicked tab
    event.target.classList.add('active');
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Page loaded - no animations to initialize
    console.log('BoringBI site loaded');
});
function toggleTab(tab) {
    // Close all other tabs
    document.querySelectorAll('.feature-tab').forEach(t => {
        if (t !== tab) {
            t.classList.remove('active');
        }
    });
    
    // Toggle current tab
    tab.classList.toggle('active');
}

// Mobile carousel functionality
function scrollToSlide(index) {
    const carousel = document.getElementById('carousel');
    const slideWidth = 320; // 300px width + 20px gap
    carousel.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth'
    });
    
    // Update active dot
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Update active dot on scroll
function updateActiveDot() {
    const carousel = document.getElementById('carousel');
    const slideWidth = 320;
    const currentSlide = Math.round(carousel.scrollLeft / slideWidth);
    
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

// Set first tab as active by default
document.addEventListener('DOMContentLoaded', function() {
    const firstTab = document.querySelector('.feature-tab');
    if (firstTab) {
        firstTab.classList.add('active');
    }
    
    // Add scroll listener for mobile carousel
    const carousel = document.getElementById('carousel');
    if (carousel) {
        carousel.addEventListener('scroll', updateActiveDot);
    }
});
