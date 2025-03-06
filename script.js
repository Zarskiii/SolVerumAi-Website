/*
   SolVerum AI Website JavaScript
   Interactive functionality for the website with professional enhancements
   Theme: Dark Grey, Deep Yellow, and White Highlights
*/

// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Fade in hero section text on page load
    fadeInHeroText();
    
    // Initialize mobile menu toggle
    initMobileMenu();
    
    // Initialize contact form submission
    initContactForm();
    
    // Initialize back to top button
    initBackToTopButton();
    
    // Initialize service card animations
    initServiceCardAnimations();
});

// Hide loading screen when page is fully loaded
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

/**
 * Fade in the hero section text on page load
 */
function fadeInHeroText() {
    const heroContent = document.querySelector('.hero .container');
    
    // Set initial opacity to 0
    if (heroContent) {
        heroContent.style.opacity = '0';
        
        // Fade in over 1 second
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease';
            heroContent.style.opacity = '1';
        }, 100);
        
        // Add a subtle bounce animation to the CTA button
        const ctaButton = document.querySelector('.hero-cta');
        if (ctaButton) {
            setTimeout(() => {
                ctaButton.style.animation = 'bounce 0.5s ease';
            }, 1200);
        }
    }
}

// Add bounce animation keyframes to the document
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);

/**
 * Initialize service card animations
 */
function initServiceCardAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Add animation to service cards when they come into view
    if (serviceCards.length > 0) {
        // Create an intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a class to trigger animation
                    entry.target.classList.add('animate');
                    // Stop observing once animation is triggered
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 }); // Trigger when 20% of the element is visible
        
        // Observe each service card
        serviceCards.forEach((card, index) => {
            // Add a slight delay for each card
            card.style.transitionDelay = `${index * 0.2}s`;
            observer.observe(card);
        });
    }
    
    // Add hover effect to service icons
    const serviceIcons = document.querySelectorAll('.service-icon');
    serviceIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

/**
 * Initialize mobile menu toggle functionality
 */
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            // Toggle active class on nav
            nav.classList.toggle('active');
            
            // Toggle active class on mobile menu toggle for animation
            this.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    nav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            });
        });
    }
}

/**
 * Initialize contact form submission handling
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Prevent default form submission
            event.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Log form data to console
            console.log('Form Submission:');
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Message:', message);
            
            // Display success message
            alert('Thanks for your message! We\'ll get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
}

/**
 * Initialize back to top button functionality
 */
function initBackToTopButton() {
    // Create back to top button element
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTopBtn';
    backToTopBtn.innerHTML = '&uarr;';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.setAttribute('title', 'Back to top');
    
    // Add button to the DOM
    document.body.appendChild(backToTopBtn);
    
    // Add CSS styles for the button
    const style = document.createElement('style');
    style.textContent = `
        #backToTopBtn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: var(--darker-bg);
            border: none;
            font-size: 24px;
            cursor: pointer;
            display: none;
            opacity: 0;
            transition: opacity 0.3s, transform 0.3s;
            z-index: 999;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        }
        
        #backToTopBtn:hover {
            background-color: var(--primary-dark);
            transform: translateY(-3px);
        }
    `;
    document.head.appendChild(style);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 200) {
            backToTopBtn.style.display = 'block';
            // Small delay to ensure display is set before changing opacity
            setTimeout(() => {
                backToTopBtn.style.opacity = '1';
            }, 10);
        } else {
            backToTopBtn.style.opacity = '0';
            // Wait for fade out before hiding
            setTimeout(() => {
                if (window.pageYOffset <= 200) {
                    backToTopBtn.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Helper function to check if an element is in viewport
 * @param {HTMLElement} element - The element to check
 * @returns {boolean} - Whether the element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
} 