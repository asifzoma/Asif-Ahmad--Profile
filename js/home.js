// Typed.js initialization
try {
    document.addEventListener('DOMContentLoaded', function() {
        // Only initialize Typed.js if the element exists
        const typedElement = document.getElementById('typed');
        if (typedElement) {
            var typed = new Typed('#typed', {
                strings: ['Full Stack Web Developer', 'Laravel','JavaScript', 'PHP', 'SQL', 'HTML', 'CSS'],
                typeSpeed: 50,
                backSpeed: 50,
                loop: true,
                cursorChar: '|',
                className: 'typed-text-class',
                preStringTyped: (arrayPos, self) => {
                    typedElement.style.opacity = '10';
                    typedElement.style.visibility = 'visible';
                    typedElement.style.color = '#95252f';
                }
            });
        }
    });
} catch (e) {
    console.error("Typed.js error:", e);
}

// Sidebar and navigation functionality
try {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🔍 Hamburger Debug: DOM Content Loaded');
        
        const btn = document.getElementById('navToggle');
        const sidebar = document.querySelector('.sidebar-container');
        let overlay = document.querySelector('.overlay');
        
        console.log('🔍 Hamburger Debug: Elements found:', {
            hamburger: !!btn,
            sidebar: !!sidebar,
            overlay: !!overlay
        });
        
        console.log('🔍 Hamburger Debug: Current viewport:', {
            width: window.innerWidth,
            shouldShowHamburger: window.innerWidth <= 902
        });
        
        // Create overlay if it doesn't exist
        if (!overlay) {
            console.log('🔍 Hamburger Debug: Creating overlay element');
            overlay = document.createElement('div');
            overlay.className = 'overlay';
            document.querySelector('.page-wrapper').prepend(overlay);
        }
        
        // Check if hamburger is actually visible
        if (btn) {
            const computedStyle = window.getComputedStyle(btn);
            console.log('🔍 Hamburger Debug: Computed styles:', {
                display: computedStyle.display,
                visibility: computedStyle.visibility,
                opacity: computedStyle.opacity,
                zIndex: computedStyle.zIndex,
                position: computedStyle.position,
                top: computedStyle.top,
                left: computedStyle.left,
                pointerEvents: computedStyle.pointerEvents,
                cursor: computedStyle.cursor
            });
            
            // Test initial states
            console.log('🔍 Initial States:', {
                sidebarClasses: sidebar.className,
                hamburgerClasses: btn.className,
                overlayClasses: overlay.className
            });
            
            // Add click event listener
            console.log('🔍 Hamburger Debug: Adding click event listener');
            
            btn.addEventListener('click', function(e) {
                console.log('🔍 Hamburger Debug: CLICK event triggered!');
                e.preventDefault();
                e.stopPropagation();
                
                console.log('🔍 Before toggle - Classes:', {
                    sidebar: sidebar.className,
                    hamburger: btn.className,
                    overlay: overlay.className
                });
                
                // Toggle classes
                const wasActive = sidebar.classList.contains('active');
                
                sidebar.classList.toggle('active');
                btn.classList.toggle('active');
                overlay.classList.toggle('active');
                
                console.log('🔍 After toggle - Classes:', {
                    sidebar: sidebar.className,
                    hamburger: btn.className,
                    overlay: overlay.className
                });
                
                // Force reflow to ensure CSS is applied
                sidebar.offsetHeight;
                
                // Get computed styles after toggle
                const sidebarStyle = window.getComputedStyle(sidebar);
                console.log('🔍 Sidebar computed transform after toggle:', sidebarStyle.transform);
                
                console.log('🔍 Hamburger Debug: Classes after toggle:', {
                    sidebarActive: sidebar.classList.contains('active'),
                    hamburgerActive: btn.classList.contains('active'),
                    overlayActive: overlay.classList.contains('active')
                });
                
                if (sidebar.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                    console.log('🔍 Sidebar should be visible now - Transform should be translateX(0)');
                } else {
                    document.body.style.overflow = '';
                    console.log('🔍 Sidebar should be hidden now - Transform should be translateX(-100%)');
                }
            });
            
        } else {
            console.error('🔍 Hamburger Debug: Hamburger button not found!');
        }
        
        // Overlay click handler
        if (overlay) {
            overlay.addEventListener('click', function() {
                console.log('🔍 Hamburger Debug: Overlay clicked');
                sidebar.classList.remove('active');
                btn.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Test viewport resize functionality
        window.addEventListener('resize', function() {
            const newWidth = window.innerWidth;
            console.log('🔍 Viewport resized:', {
                width: newWidth,
                shouldShowHamburger: newWidth <= 902,
                hamburgerDisplay: btn ? window.getComputedStyle(btn).display : 'N/A'
            });
        });
        
        const navItems = document.querySelectorAll('.sidebar-menu li');
        function highlightActiveNavItem() {
            const currentPath = window.location.pathname;
            const currentPage = currentPath.split('/').pop() || 'index.html';
            const currentHash = window.location.hash;
            navItems.forEach(item => item.classList.remove('active'));
            navItems.forEach(item => {
                const link = item.querySelector('a');
                if (!link) return;
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    if (currentPage === 'index.html' && currentHash === href) {
                        item.classList.add('active');
                    }
                } else if (href.includes('#')) {
                    const [hrefPage, hrefHash] = href.split('#');
                    if (hrefPage === currentPage && currentHash === '#' + hrefHash) {
                        item.classList.add('active');
                    }
                } else if (href === currentPage && !currentHash) {
                    item.classList.add('active');
                }
            });
        }
        highlightActiveNavItem();
        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                const link = this.querySelector('a');
                if (!link) return;
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    navItems.forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                }
                if (window.innerWidth <= 902) {
                    const sidebar = document.querySelector('.sidebar-container');
                    const hamburger = document.getElementById('navToggle');
                    const overlay = document.querySelector('.overlay');
                    if (sidebar) sidebar.classList.remove('active');
                    if (hamburger) hamburger.classList.remove('active');
                    if (overlay) overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        window.addEventListener('hashchange', function() {
            highlightActiveNavItem();
        });
    });
} catch (e) {
    console.error("Sidebar functionality error:", e);
} 