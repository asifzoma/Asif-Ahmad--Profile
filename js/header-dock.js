class HeaderDock {
    constructor() {
        this.headerDock = document.getElementById('headerDock');
        this.heroText = document.getElementById('heroText');
        this.imageContainer = document.querySelector('.image-container');
        this.floatingTags = document.querySelectorAll('.floating-tag');
        this.clockTime = document.getElementById('clockTime');
        this.clockDate = document.getElementById('clockDate');
        
        this.lastScrollY = 0;
        this.scrollThreshold = 100;
        this.isDockActive = false;
        this.animationId = null;
        this.orbitRadius = 0;
        
        this.init();
    }
    
    init() {
        this.updateClock();
        this.setupEventListeners();
        this.startClockInterval();
        this.initializeOrbitalAnimation();
    }
    
    setupEventListeners() {
        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
        window.addEventListener('resize', this.handleResize.bind(this), { passive: true });
        
        // Add click handlers for each floating tag
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
    
    initializeOrbitalAnimation() {
        const isMobile = window.innerWidth <= 902;
        if (!isMobile) {
            this.orbitRadius = this.calculateOptimalRadius();
            this.startOrbitalAnimation();
        }
    }
    
    calculateOptimalRadius() {
        const containerRect = this.imageContainer.getBoundingClientRect();
        const minDimension = Math.min(containerRect.width, containerRect.height);
        return minDimension * 0.3; // 30% of the container's smallest dimension
    }
    
    getImageContainerCenter() {
        const rect = this.imageContainer.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
    }
    
    updateOrbitalPositions(time) {
        const imageCenter = this.getImageContainerCenter();
        const languages = ['html', 'css', 'javascript', 'php', 'csharp', 'laravel'];
        const angleStep = (2 * Math.PI) / languages.length;
        
        this.floatingTags.forEach((tag, index) => {
            const langClass = Array.from(tag.classList).find(cls => languages.includes(cls));
            if (!langClass) return;
            
            // Calculate angle for this tag
            const baseAngle = index * angleStep;
            const currentAngle = baseAngle + (time * 0.0005);
            
            // Calculate orbital position
            const x = imageCenter.x + Math.cos(currentAngle) * this.orbitRadius;
            const y = imageCenter.y + Math.sin(currentAngle) * this.orbitRadius;
            
            // Only apply orbital animation if dock is not active
            if (!this.isDockActive) {
                tag.style.position = 'fixed';
                tag.style.top = `${y}px`;
                tag.style.left = `${x}px`;
                tag.style.transform = `translate(-50%, -50%) rotate(${currentAngle * 180 / Math.PI}deg)`;
                tag.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
    }
    
    startOrbitalAnimation() {
        const animate = (time) => {
            if (!this.isDockActive) {
                this.updateOrbitalPositions(time);
            }
            this.animationId = requestAnimationFrame(animate);
        };
        animate(Date.now());
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        const isScrollingDown = scrollY > this.lastScrollY;
        
        // Check if we should activate dock
        if (scrollY > this.scrollThreshold && !this.isDockActive) {
            this.activateDock();
        } else if (scrollY <= this.scrollThreshold && this.isDockActive) {
            this.deactivateDock();
        }
        
        // Update floating tag backgrounds based on scroll direction
        if (scrollY > this.scrollThreshold) {
            this.floatingTags.forEach(tag => {
                if (isScrollingDown) {
                    tag.classList.add('scrolled');
                } else {
                    tag.classList.remove('scrolled');
                }
            });
        }
        
        this.lastScrollY = scrollY;
    }
    
    activateDock() {
        this.isDockActive = true;
        this.headerDock.classList.add('active');
        this.heroText.classList.add('fade-out');
        this.imageContainer.classList.add('scrolled');
        
        // Remove orbital animation and inline styles, let flexbox handle layout
        this.floatingTags.forEach(tag => {
            tag.classList.remove('orbital-animation');
            tag.style.position = '';
            tag.style.top = '';
            tag.style.left = '';
            tag.style.transform = '';
            tag.style.transition = '';
        });
    }
    
    deactivateDock() {
        this.isDockActive = false;
        this.headerDock.classList.remove('active');
        this.heroText.classList.remove('fade-out');
        this.imageContainer.classList.remove('scrolled');
        
        // Add orbital animation class back
        this.floatingTags.forEach(tag => {
            tag.classList.add('orbital-animation');
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
        this.orbitRadius = this.calculateOptimalRadius();
        // No need to update dock layout, flexbox handles it
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