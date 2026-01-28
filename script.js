// Navigation Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section[id]');

function setActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Counter Animation for Stats
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };

    updateCounter();
}

// Intersection Observer for Stats Animation
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Fade In Animation on Scroll
const fadeElements = document.querySelectorAll('.service-card, .leader-card, .gallery-item, .partner-logo');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// Scroll animation for sections - handles all animation classes
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            sectionObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Observe all elements with animation classes
document.querySelectorAll('.scroll-animate-section, .scroll-animate, .fade-in-left, .fade-in-right, .fade-in-up, .fade-in-down, .scale-in, .rotate-in').forEach(element => {
    sectionObserver.observe(element);
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// Dropdown Menu Animation Enhancement
document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('mouseenter', () => {
        const menu = dropdown.querySelector('.dropdown-menu');
        if (menu) {
            menu.style.display = 'block';
        }
    });

    dropdown.addEventListener('mouseleave', () => {
        const menu = dropdown.querySelector('.dropdown-menu');
        if (menu) {
            setTimeout(() => {
                if (!dropdown.matches(':hover')) {
                    menu.style.display = '';
                }
            }, 200);
        }
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Service Card Hover Effect Enhancement
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Leader Card Animation
document.querySelectorAll('.leader-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const image = this.querySelector('.leader-image');
        if (image) {
            image.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });

    card.addEventListener('mouseleave', function() {
        const image = this.querySelector('.leader-image');
        if (image) {
            image.style.transform = 'scale(1) rotate(0)';
        }
    });
});

// Add cursor trail effect for hero section
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const rect = hero.getBoundingClientRect();
        if (mouseY >= rect.top && mouseY <= rect.bottom) {
            const cursor = document.querySelector('.cursor-trail');
            if (!cursor) {
                const trail = document.createElement('div');
                trail.className = 'cursor-trail';
                trail.style.cssText = `
                    position: fixed;
                    width: 20px;
                    height: 20px;
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    transition: transform 0.1s ease-out;
                    border: 1px solid rgba(0, 0, 0, 0.3);
                `;
                document.body.appendChild(trail);
            }
            const trailElement = document.querySelector('.cursor-trail');
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            trailElement.style.left = cursorX + 'px';
            trailElement.style.top = cursorY + 'px';
        }
    }
    requestAnimationFrame(animateCursor);
}

// Smooth scroll reveal animations
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

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Parallax scroll effect
let ticking = false;
function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroShapes = hero.querySelectorAll('.shape');
        heroShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.05;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect and animations
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    @keyframes statFloat {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-8px);
        }
    }
`;
document.head.appendChild(style);

// Scroll-triggered animations for About Us page (inspired by koderspedia)
function initScrollAnimations() {
    const scrollAnimateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Animate timeline items with stagger
                if (entry.target.querySelector('.timeline-item')) {
                    const timelineItems = entry.target.querySelectorAll('.timeline-item');
                    timelineItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animated');
                        }, index * 150);
                    });
                }
                
                // Animate value items with stagger
                if (entry.target.querySelector('.value-item')) {
                    const valueItems = entry.target.querySelectorAll('.value-item');
                    valueItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animated');
                        }, index * 100);
                    });
                }
                
                scrollAnimateObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.scroll-animate').forEach(element => {
        scrollAnimateObserver.observe(element);
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav link
    setActiveNavLink();

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Start cursor trail animation
    animateCursor();

    // Add stagger animation to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add stagger animation to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.animationDelay = `${1.3 + index * 0.2}s`;
    });
    
    // Initialize scroll animations for About Us page
    initScrollAnimations();

    // Add parallax effect to hero content on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const heroStats = document.querySelector('.hero-stats');
        
        if (heroContent && currentScroll < window.innerHeight) {
            const scrollRatio = currentScroll / window.innerHeight;
            heroContent.style.transform = `translateY(${scrollRatio * 50}px)`;
            heroContent.style.opacity = 1 - scrollRatio * 0.5;
            
            if (heroStats) {
                heroStats.style.transform = `translateY(${scrollRatio * 30}px)`;
            }
        }
        
        lastScroll = currentScroll;
    });

    // Hero background slider
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length > 1) {
        let currentSlide = 0;
        const slideInterval = 5000; // 5 seconds

        setInterval(() => {
            heroSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % heroSlides.length;
            heroSlides[currentSlide].classList.add('active');
        }, slideInterval);
    }

    // Partners auto slider
    const partnersTrack = document.querySelector('.partners-track');
    if (partnersTrack) {
        const partnerSlides = partnersTrack.querySelectorAll('.partner-logo');
        if (partnerSlides.length > 1) {
            let currentPartnerIndex = 0;
            const partnerInterval = 3000; // 3 seconds

            function updatePartnerSlider() {
                const slideWidth = partnerSlides[0].offsetWidth + 40; // include gap
                currentPartnerIndex = (currentPartnerIndex + 1) % partnerSlides.length;
                partnersTrack.style.transform = `translateX(${-currentPartnerIndex * slideWidth}px)`;
            }

            window.addEventListener('resize', () => {
                partnersTrack.style.transform = 'translateX(0)';
                currentPartnerIndex = 0;
            });

            setInterval(updatePartnerSlider, partnerInterval);
        }
    }
});