// Common functionality for all pages
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Add pulse points
        addPulsePoints();
    } catch (e) {
        console.error("Common functionality error:", e);
    }
});

// Function to add pulse points to the page
function addPulsePoints() {
    // Find the image container
    const container = document.querySelector('.image-container');
    
    if (container) {
        // Create the pulse points HTML
        const pulsePointsHTML = `
            <!-- Pulse Points -->
            <div class="pulse-point" id="point1" data-tooltip="HTML5 & CSS3"></div>
            <div class="pulse-point" id="point2" data-tooltip="JavaScript"></div>
            <div class="pulse-point" id="point3" data-tooltip="PHP and Laravel"></div>
            <div class="pulse-point" id="point4" data-tooltip="C++ and Java Script"></div>
        `;
        
        // Add the pulse points to the container
        container.insertAdjacentHTML('beforeend', pulsePointsHTML);
    }
} 