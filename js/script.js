document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const designerSide = document.querySelector('.designer-side');
    const coderSide = document.querySelector('.coder-side');
    
    container.addEventListener('mousemove', function(e) {
        // Get the mouse position as a percentage of the screen width
        const x = e.clientX / window.innerWidth;
        
        // Update the clip paths based on mouse position
        designerSide.style.clipPath = `polygon(0 0, ${x * 100}% 0, ${x * 100}% 100%, 0 100%)`;
        coderSide.style.clipPath = `polygon(${x * 100}% 0, 100% 0, 100% 100%, ${x * 100}% 100%)`;
    });
});