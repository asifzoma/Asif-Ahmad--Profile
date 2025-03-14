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
        
        // Function to adjust positions based on viewport
        function adjustPositions() {
            const isMobile = window.innerWidth <= 768;
            console.log("Adjusting positions, isMobile:", isMobile);
            
            // Get all points
            const point1 = document.getElementById('point1');
            const point2 = document.getElementById('point2');
            const point3 = document.getElementById('point3');
            const point4 = document.getElementById('point4');
            
            if (isMobile) {
                // Mobile positions with !important to override any conflicting styles
                if (point1) { 
                    point1.style.cssText = "top: 89% !important; left: 25% !important;"; 
                }
                if (point2) { 
                    point2.style.cssText = "top: 80% !important; left: 35% !important;"; 
                }
                if (point3) { 
                    point3.style.cssText = "top: 58% !important; left: 45% !important;"; 
                }
                if (point4) { 
                    point4.style.cssText = "top: 80% !important; left: 55% !important;"; 
                }
            } else {
                // Desktop positions with !important to override any conflicting styles
                if (point1) { 
                    point1.style.cssText = "top: 47% !important; left: 79% !important;"; 
                }
                if (point2) { 
                    point2.style.cssText = "top: 53% !important; left: 78% !important;"; 
                }
                if (point3) { 
                    point3.style.cssText = "top: 59% !important; left: 77% !important;"; 
                }
                if (point4) { 
                    point4.style.cssText = "top: 65% !important; left: 65% !important;"; 
                }
            }
        }
        
        // Run position adjustment immediately
        adjustPositions();
        
        // Also run when window resizes
        window.addEventListener('resize', adjustPositions);
    }
} 