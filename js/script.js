document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const designerSide = document.querySelector('.designer-side');
    const coderSide = document.querySelector('.coder-side');
    const designerPortrait = document.querySelector('.designer-portrait');
    const coderPortrait = document.querySelector('.coder-portrait');
    
    // Set the same background style for both sides
    designerSide.style.background = '#f8f8f8';
    coderSide.style.background = '#f8f8f8';
    
    // Use RAF for smoother animation
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
    
    container.addEventListener('mousemove', function(e) {
        lastX = e.clientX / window.innerWidth;
        
        if (!ticking) {
            requestAnimationFrame(() => {
                updateClipPaths(lastX);
            });
            ticking = true;
        }
    });
    
    // Add touch support for mobile devices with improved performance
    container.addEventListener('touchmove', function(e) {
        e.preventDefault();
        lastX = e.touches[0].clientX / window.innerWidth;
        
        if (!ticking) {
            requestAnimationFrame(() => {
                updateClipPaths(lastX);
            });
            ticking = true;
        }
    });
    
    // Set initial state (center split)
    updateClipPaths(0.5);
    
    // Add hardware acceleration hint
    designerSide.style.willChange = 'clip-path';
    coderSide.style.willChange = 'clip-path';
    if (designerPortrait) designerPortrait.style.willChange = 'clip-path';
    if (coderPortrait) coderPortrait.style.willChange = 'clip-path';
});