document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const designerSide = document.querySelector('.designer-side');
    const coderSide = document.querySelector('.coder-side');
    const designerPortrait = document.querySelector('.designer-portrait');
    const coderPortrait = document.querySelector('.coder-portrait');
    
    // Set the same background style for both sides
    designerSide.style.background = '#f8f8f8';
    coderSide.style.background = '#f8f8f8';
    
    // Enhanced header effects with scroll highlighting
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    // Handle scroll events for header appearance and section highlighting
    window.addEventListener('scroll', function() {
        // Header transparency effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Highlight current section in navigation
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll to sections when clicking navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Use RAF for smoother animation (for the hero section split effect)
    let ticking = false;
    let lastX = 0.5;
    
    // Create a single function to update all clip paths to ensure consistency
    function updateClipPaths(x) {
        const easedX = Math.max(0, Math.min(1, x)); // Ensure value is between 0 and 1
        
        // Use transform property instead of clip-path for better performance
        const clipValue = `${easedX * 100}%`;
        
        // Ensure the clip paths meet exactly at the same point
        designerSide.style.clipPath = `polygon(0 0, ${clipValue} 0, ${clipValue} 100%, 0 100%)`;
        coderSide.style.clipPath = `polygon(${clipValue} 0, 100% 0, 100% 100%, ${clipValue} 100%)`;
        
        // Update portrait clip paths to match exactly
        if (designerPortrait && coderPortrait) {
            designerPortrait.style.clipPath = `polygon(0 0, ${clipValue} 0, ${clipValue} 100%, 0 100%)`;
            coderPortrait.style.clipPath = `polygon(${clipValue} 0, 100% 0, 100% 100%, ${clipValue} 100%)`;
        }
        
        ticking = false;
    }
    
    // Only apply the mouse move effect when in the hero section
    container.addEventListener('mousemove', function(e) {
        // Only apply effect if we're near the top of the page (hero section)
        if (window.scrollY < window.innerHeight) {
            lastX = e.clientX / window.innerWidth;
            
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateClipPaths(lastX);
                });
                ticking = true;
            }
        }
    });
    
    // Add touch support for mobile devices with improved performance
    container.addEventListener('touchmove', function(e) {
        // Only apply effect if we're near the top of the page (hero section)
        if (window.scrollY < window.innerHeight) {
            e.preventDefault();
            lastX = e.touches[0].clientX / window.innerWidth;
            
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateClipPaths(lastX);
                });
                ticking = true;
            }
        }
    });
    
    // Set initial state (center split)
    updateClipPaths(0.5);
    
    // Add hardware acceleration hint
    designerSide.style.willChange = 'clip-path';
    coderSide.style.willChange = 'clip-path';
    if (designerPortrait) designerPortrait.style.willChange = 'clip-path';
    if (coderPortrait) coderPortrait.style.willChange = 'clip-path';
    
    // Add scroll reveal animations for sections
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Check on initial load
});