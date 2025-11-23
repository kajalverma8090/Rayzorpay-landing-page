 // Main JavaScript for Razorpay Landing Page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initLoadingScreen();
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initAnimations();
    initCounters();
    initNewsletter();
    initModals();
    initFeatureHover();
    initMobileFixes();
    initNavbarFix();
    initTypewriter();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 300);
        }, 800);
    }
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeSwitch = document.getElementById('themeSwitch');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (themeSwitch) {
        themeSwitch.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            document.body.classList.add('theme-transition');
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 300);
        });
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const hamburger = document.querySelector('.hamburger');
                const navMenu = document.querySelector('.nav-menu');
                if (hamburger && navMenu && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
}

// Typewriter Effect - FIXED
function initTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    if (!typewriterElement) return;

    const originalText = "Smart Payments";
    typewriterElement.textContent = '';
    typewriterElement.style.borderRight = '3px solid var(--primary-color)';
    
    let i = 0;
    const typing = setInterval(() => {
        if (i < originalText.length) {
            typewriterElement.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typing);
            // Keep cursor blinking after typing completes
            setInterval(() => {
                typewriterElement.style.borderRightColor = 
                    typewriterElement.style.borderRightColor === 'transparent' 
                    ? 'var(--primary-color)' 
                    : 'transparent';
            }, 500);
        }
    }, 100);
}

// Modal Functionality
function initModals() {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const heroSignupBtn = document.getElementById('heroSignupBtn');
    const ctaSignupBtn = document.getElementById('ctaSignupBtn');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const closeButtons = document.querySelectorAll('.close-modal');
    const loginLink = document.querySelector('.login-link');
    const signupLink = document.querySelector('.signup-link');

    // Open Login Modal
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Open Signup Modal
    const openSignupModal = () => {
        signupModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    if (signupBtn) signupBtn.addEventListener('click', openSignupModal);
    if (heroSignupBtn) heroSignupBtn.addEventListener('click', openSignupModal);
    if (ctaSignupBtn) ctaSignupBtn.addEventListener('click', openSignupModal);

    // Close Modals
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            loginModal.classList.remove('active');
            signupModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Switch between modals
    if (loginLink) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            signupModal.classList.remove('active');
            loginModal.classList.add('active');
        });
    }

    if (signupLink) {
        signupLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.remove('active');
            signupModal.classList.add('active');
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        if (e.target === signupModal) {
            signupModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            loginModal.classList.remove('active');
            signupModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle form submissions
    const forms = document.querySelectorAll('.modal-form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate form submission
            const submitBtn = form.querySelector('.btn-primary');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
                submitBtn.style.background = 'var(--secondary-color)';
                
                setTimeout(() => {
                    form.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    
                    // Close modal after success
                    loginModal.classList.remove('active');
                    signupModal.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    showNotification('Form submitted successfully!', 'success');
                }, 1500);
            }, 2000);
        });
    });
}

// Feature Card Hover Effects
function initFeatureHover() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        // Add touch support for mobile
        card.addEventListener('touchstart', function() {
            if (window.innerWidth <= 768) {
                this.classList.toggle('active');
            }
        });
        
        // Keyboard navigation
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('active');
            }
        });
    });
}

// Scroll Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card, .method-card, .solution-card, .developer-card, .resource-card, .pricing-card, .section-header, .company-item').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const scrollY = window.scrollY;
        
        if (navbar) {
            if (scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.8)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = 'none';
            }
            
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                if (scrollY > 100) {
                    navbar.style.background = 'rgba(45, 55, 72, 0.95)';
                } else {
                    navbar.style.background = 'rgba(45, 55, 72, 0.8)';
                }
            }
        }
    });
}

// Animated Counters
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        if (counter) observer.observe(counter);
    });
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : 
                              element.textContent.includes('M+') ? 'M+' : 
                              element.textContent.includes('+') ? '+' : '');
        }, 16);
    }
}

// Newsletter Form
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (validateEmail(email)) {
            const submitBtn = this.querySelector('.btn-subscribe');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                submitBtn.style.background = 'var(--secondary-color)';
                emailInput.value = '';
                showNotification('Successfully subscribed to newsletter!', 'success');
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2000);
            }, 1500);
        } else {
            showNotification('Please enter a valid email address', 'error');
            emailInput.focus();
        }
    });
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// Mobile Fixes
function initMobileFixes() {
    // Prevent zoom on double tap (iOS)
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Fix for iOS viewport height
    function setVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', setVH);
}

// Navbar Fix
function initNavbarFix() {
    const navbar = document.querySelector('.navbar');
    const navContainer = document.querySelector('.nav-container');
    
    function handleResize() {
        if (window.innerWidth <= 768) {
            navContainer.style.minWidth = '100%';
            navContainer.style.flexWrap = 'nowrap';
        } else {
            navContainer.style.minWidth = '';
            navContainer.style.flexWrap = '';
        }
    }
    
    handleResize();
    window.addEventListener('resize', handleResize);
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="close-notification">&times;</button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ef4444' : '#10b981'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Close button event
    notification.querySelector('.close-notification').addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .theme-transition {
        transition: all 0.3s ease !important;
    }
    
    .notification button {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .method-card:focus,
    .feature-card:focus,
    .solution-card:focus,
    .developer-card:focus,
    .resource-card:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
    
    button:focus,
    .nav-link:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
    
    .loading-screen.fade-out {
        opacity: 0;
        pointer-events: none;
    }
    
    .typewriter {
        border-right: 3px solid var(--primary-color);
        animation: blink-caret 0.75s step-end infinite;
    }
    
    @keyframes blink-caret {
        from, to { border-color: transparent; }
        50% { border-color: var(--primary-color); }
    }

    .feature-card.active .feature-hover {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Performance optimization: Debounce scroll events
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

// Optimized scroll listener
window.addEventListener('scroll', debounce(function() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll:not(.animate-in)');
    animatedElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            el.classList.add('animate-in');
        }
    });
}, 10));

// Handle resize events
window.addEventListener('resize', debounce(function() {
    if (window.innerWidth > 768) {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}, 250));

// Emergency loading screen fix
window.addEventListener('load', function() {
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen && loadingScreen.style.display !== 'none') {
            loadingScreen.style.display = 'none';
        }
    }, 3000);
});

// Final safety net
setTimeout(() => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
}, 5000);

// Add interactive button effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-signup, .pay-now-btn, .btn-subscribe');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Don't create ripple for modal close buttons
            if (this.classList.contains('close-modal') || this.classList.contains('close-notification')) return;
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                top: ${y}px;
                left: ${x}px;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: translate(-50%, -50%);
                animation: ripple 0.6s ease-out;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);