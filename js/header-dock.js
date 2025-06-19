class HeaderDock {
    constructor() {
        this.headerDock = document.getElementById('headerDock');
        this.heroText = document.getElementById('heroText');
        this.imageContainer = document.querySelector('.image-container');
        this.iconContainer = document.querySelector('.icon-container');
        this.floatingTags = document.querySelectorAll('.floating-tag');
        this.clockTime = document.getElementById('clockTime');
        this.clockDate = document.getElementById('clockDate');
        
        this.lastScrollY = 0;
        this.isDockActive = false;
        this.animationId = null;
        this.orbitRadius = 0;
        
        // Calculate initial scroll threshold
        this.updateScrollThreshold();
        this.init();
    }
    
    updateScrollThreshold() {
        // Set threshold to 1% of viewport height
        this.scrollThreshold = window.innerHeight * 0.01;
    }
    
    init() {
        this.updateClock();
        this.setupEventListeners();
        this.startClockInterval();
    }
    
    setupEventListeners() {
        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
        window.addEventListener('resize', this.handleResize.bind(this), { passive: true });
        
        // Add click handlers for each floating tag without animations
        this.floatingTags.forEach(tag => {
            tag.addEventListener('click', () => {
                const language = Array.from(tag.classList)
                    .find(cls => ['html', 'css', 'javascript', 'php', 'csharp', 'laravel'].includes(cls));
                
                if (language) {
                    this.navigateToCodeSnippet(language);
                }
            });
        });
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        
        // Check if we should activate dock based on scroll threshold
        if (scrollY > this.scrollThreshold && !this.isDockActive) {
            this.activateDock();
        } else if (scrollY <= this.scrollThreshold && this.isDockActive) {
            this.deactivateDock();
        }
        
        this.lastScrollY = scrollY;
    }
    
    activateDock() {
        this.isDockActive = true;
        this.headerDock.classList.add('active');
        this.heroText.classList.add('fade-out');
        this.imageContainer.classList.add('scrolled');
        
        // Smoothly transition icons into dock
        this.floatingTags.forEach(tag => {
            tag.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            tag.style.position = '';
            tag.style.top = '';
            tag.style.left = '';
            tag.style.transform = '';
        });
    }
    
    deactivateDock() {
        this.isDockActive = false;
        this.headerDock.classList.remove('active');
        this.heroText.classList.remove('fade-out');
        this.imageContainer.classList.remove('scrolled');
        
        // Smoothly transition icons back to original position
        this.floatingTags.forEach(tag => {
            tag.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            tag.style.position = '';
            tag.style.top = '';
            tag.style.left = '';
            tag.style.transform = '';
        });
    }
    
    updateClock() {
        const now = new Date();
        
        // Update time
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        // Update date
        const dateString = now.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
        
        if (this.clockTime) this.clockTime.textContent = timeString;
        if (this.clockDate) this.clockDate.textContent = dateString;
    }
    
    startClockInterval() {
        setInterval(() => {
            this.updateClock();
        }, 1000);
    }
    
    handleResize() {
        // Update scroll threshold when window is resized
        this.updateScrollThreshold();
        this.orbitRadius = this.calculateOptimalRadius();
        
        // Check current scroll position against new threshold
        const scrollY = window.scrollY;
        if (scrollY > this.scrollThreshold && !this.isDockActive) {
            this.activateDock();
        } else if (scrollY <= this.scrollThreshold && this.isDockActive) {
            this.deactivateDock();
        }
    }
    
    calculateOptimalRadius() {
        const containerRect = this.imageContainer.getBoundingClientRect();
        const minDimension = Math.min(containerRect.width, containerRect.height);
        return minDimension * 0.3; // 30% of the container's smallest dimension
    }
    
    navigateToCodeSnippet(language) {
        const codeSnippetsHeading = document.querySelector('h2#code-snippets');
        const snippetsContainer = document.querySelector('.snippets-container');
        
        if (!codeSnippetsHeading || !snippetsContainer) return;
        
        // Open the container
        snippetsContainer.classList.remove('hidden');
        snippetsContainer.classList.add('visible');
        codeSnippetsHeading.classList.add('active');
        
        // Find the specific snippet card
        const targetSnippet = document.querySelector(`.snippet-card[data-language="${language}"]`);
        
        // Smooth scroll to section
        setTimeout(() => {
            codeSnippetsHeading.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            
            // Highlight the specific snippet
            if (targetSnippet) {
                setTimeout(() => {
                    this.highlightSnippet(targetSnippet, language);
                }, 800);
            }
        }, 100);
        
        // Update URL hash
        if (window.location.hash !== '#code-snippets') {
            history.pushState(null, null, '#code-snippets');
        }
    }
    
    highlightSnippet(snippet, language) {
        // Remove highlight from all snippets
        document.querySelectorAll('.snippet-card').forEach(card => {
            card.classList.remove('highlighted');
        });
        
        // Add highlight to target snippet
        snippet.classList.add('highlighted');
        
        // Highlight corresponding floating tag
        this.floatingTags.forEach(tag => {
            if (tag.classList.contains(language)) {
                tag.classList.add('highlighted');
                setTimeout(() => {
                    tag.classList.remove('highlighted');
                }, 2000);
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeaderDock();
}); 