// Uchinaguchi Project - Enhanced Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    console.log('Uchinaguchi Project JavaScript loaded! 🌺');

    // Enhanced smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Handle special navigation cases
            if (href === '#dictionary') {
                e.preventDefault();
                navigateToPage('dictionary');
                return;
            }
            
            if (href === '#home') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                updateActiveNavLink(this);
                return;
            }
            
            // Handle normal anchor links
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
                updateActiveNavLink(this);
                
                // Update URL without page reload
                history.pushState(null, '', href);
            }
        });
    });

    // Video card interactions with enhanced functionality
    const videoCards = document.querySelectorAll('.video-card');
    const videoData = {
        'Uchinaguchi Study Group': {
            url: 'https://www.youtube.com/results?search_query=uchinaguchi+study+group+lessons',
            description: 'Weekly lessons for beginners learning Okinawan language',
            searchTerms: 'uchinaguchi study group beginner lessons okinawan'
        },
        'Okinawan vs Tokyo Dialect': {
            url: 'https://www.youtube.com/results?search_query=okinawan+vs+tokyo+dialect+differences',
            description: 'Understanding the differences between Uchinaguchi and Japanese',
            searchTerms: 'okinawan tokyo dialect differences japanese uchinaguchi comparison'
        },
        'Cultural Context Lessons': {
            url: 'https://www.youtube.com/results?search_query=okinawan+culture+language+traditions',
            description: 'Learn Uchinaguchi through Okinawan culture and traditions',
            searchTerms: 'okinawan culture traditions language context customs'
        }
    };

    // Make video cards interactive
    videoCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.setAttribute('tabindex', '0'); // Make keyboard accessible
        
        // Click handler
        const handleVideoClick = function() {
            const title = this.querySelector('h3').textContent;
            const videoInfo = videoData[title];
            
            if (videoInfo) {
                showVideoModal(title, videoInfo);
            } else {
                // Fallback: redirect to videos page
                navigateToPage('videos');
            }
        };

        card.addEventListener('click', handleVideoClick);
        
        // Keyboard accessibility
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleVideoClick.call(this);
            }
        });

        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });

    // Enhanced play button interactions
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click
            
            // Animate play button
            this.style.transform = 'scale(0.8)';
            this.style.transition = 'transform 0.15s ease';
            
            setTimeout(() => {
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }, 150);
            
            // Trigger parent video card click after animation
            const videoCard = this.closest('.video-card');
            if (videoCard) {
                setTimeout(() => {
                    videoCard.click();
                }, 300);
            }
        });

        // Add hover effect to play buttons
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.opacity = '1';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.opacity = '0.9';
        });
    });

    // Resource link interactions
    const resourceLinks = document.querySelectorAll('.resource-link');
    resourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click if inside card
            const href = this.getAttribute('href');
            
            if (href && href.includes('.html')) {
                e.preventDefault();
                const pageName = href.replace('.html', '');
                navigateToPage(pageName);
            }
        });
    });

    // Button interactions with enhanced feedback
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Handle specific page navigation
            if (href && href.includes('.html')) {
                e.preventDefault();
                const pageName = href.replace('.html', '');
                navigateToPage(pageName);
            }
            
            // Add click feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });

        // Enhanced hover effects for buttons
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });

    // Enhanced header scroll effect
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const currentScrollY = window.scrollY;
        
        // Update header background
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }

        // Hide/show header on scroll (optional)
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        header.style.transition = 'all 0.3s ease';
        lastScrollY = currentScrollY;

        // Update active navigation based on scroll position
        updateActiveNavOnScroll();
    });

    // Initialize mobile menu
    createMobileMenu();

    // Add loading states for interactive elements
    addLoadingStates();
});

// Video modal functionality
function showVideoModal(title, videoInfo) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('video-modal');
    if (!modal) {
        modal = createVideoModal();
    }

    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('.modal-description');
    const searchButton = modal.querySelector('.search-button');
    const videosPageButton = modal.querySelector('.videos-page-button');

    // Update modal content
    modalTitle.textContent = title;
    modalDescription.textContent = videoInfo.description;
    
    // Set up buttons
    searchButton.onclick = () => {
        window.open(videoInfo.url, '_blank');
        closeVideoModal();
    };

    videosPageButton.onclick = () => {
        closeVideoModal();
        navigateToPage('videos');
    };

    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Focus trap for accessibility
    modal.querySelector('.search-button').focus();
}

function createVideoModal() {
    const modal = document.createElement('div');
    modal.id = 'video-modal';
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title"></h3>
                <button class="modal-close" onclick="closeVideoModal()">&times;</button>
            </div>
            <div class="modal-body">
                <p class="modal-description"></p>
                <div class="modal-buttons">
                    <button class="btn btn-primary search-button">
                        🔍 Search YouTube
                    </button>
                    <button class="btn btn-secondary videos-page-button">
                        📚 Browse All Videos
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .video-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2000;
            align-items: center;
            justify-content: center;
        }
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
        }
        .modal-content {
            background: white;
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
            position: relative;
            animation: modalSlideIn 0.3s ease;
        }
        .modal-header {
            padding: 1.5rem;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .modal-title {
            margin: 0;
            font-size: 1.5rem;
            color: #1a202c;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #718096;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        .modal-close:hover {
            background: #fed7d7;
            color: #e53e3e;
        }
        .modal-body {
            padding: 1.5rem;
        }
        .modal-description {
            margin-bottom: 1.5rem;
            color: #4a5568;
            line-height: 1.6;
        }
        .modal-buttons {
            display: flex;
            gap: 1rem;
            flex-direction: column;
        }
        @keyframes modalSlideIn {
            from { opacity: 0; transform: scale(0.9) translateY(-20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @media (min-width: 768px) {
            .modal-buttons {
                flex-direction: row;
            }
        }
    `;
    document.head.appendChild(style);

    // Close modal when clicking overlay
    modal.querySelector('.modal-overlay').addEventListener('click', closeVideoModal);
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeVideoModal();
        }
    });

    document.body.appendChild(modal);
    return modal;
}

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Page navigation helper
function navigateToPage(pageName) {
    const pageExists = checkPageExists(pageName);
    
    if (pageExists) {
        window.location.href = `${pageName}.html`;
    } else {
        const confirmMessage = `The ${pageName} page is under development. Would you like to continue anyway?`;
        
        if (confirm(confirmMessage)) {
            // For dictionary, we could show a preview using the CSV data
            if (pageName === 'dictionary') {
                showDictionaryPreview();
            } else {
                window.location.href = `${pageName}.html`;
            }
        }
    }
}

// Check if page exists (basic implementation)
function checkPageExists(pageName) {
    // You can enhance this to actually check if files exist
    const existingPages = ['dictionary', 'videos']; // Add pages as you create them
    return existingPages.includes(pageName);
}

// Dictionary preview function
function showDictionaryPreview() {
    alert(`Dictionary Preview:\n\nThe dictionary contains 76+ Uchinaguchi entries.\n\nSample words:\n• Word: [Uchinaguchi word]\n• Definition: [English definition]\n• Source: onookinawa.com\n\nFull dictionary page coming soon!`);
}

// Mobile menu creation
function createMobileMenu() {
    const nav = document.querySelector('.nav');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!nav || !navMenu) return;
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.classList.add('hamburger');
    hamburger.innerHTML = '☰';
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    
    const hamburgerStyles = `
        .hamburger {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #333;
            cursor: pointer;
            padding: 10px;
            transition: opacity 0.3s ease;
        }
        .hamburger:hover { opacity: 0.7; }
        @media (max-width: 768px) {
            .hamburger { display: block; }
            .nav-menu {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(20px);
                flex-direction: column;
                padding: 20px;
                display: none;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                border-top: 1px solid #e2e8f0;
            }
            .nav-menu.active { display: flex; }
            .nav-menu li { margin: 10px 0; }
            .nav-menu a { 
                display: block;
                padding: 10px 0;
                border-bottom: 1px solid #f1f5f9;
            }
            .nav-menu a:last-child { border-bottom: none; }
        }
    `;
    
    if (!document.querySelector('#mobile-menu-styles')) {
        const style = document.createElement('style');
        style.id = 'mobile-menu-styles';
        style.textContent = hamburgerStyles;
        document.head.appendChild(style);
    }
    
    nav.querySelector('.nav-container').appendChild(hamburger);
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close menu when clicking nav links
    navMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navMenu.classList.remove('active');
            hamburger.innerHTML = '☰';
        }
    });
}

// Update active navigation link
function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Update active nav on scroll
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Add loading states
function addLoadingStates() {
    const interactiveElements = document.querySelectorAll('a, button, .video-card, .resource-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Utility functions
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize tooltips for video cards
function initTooltips() {
    videoCards.forEach(card => {
        card.setAttribute('title', 'Click to learn more about this video series');
    });
}

console.log('✅ Uchinaguchi Project enhanced JavaScript loaded successfully! 🌺');