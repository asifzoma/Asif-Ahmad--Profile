// Sidebar and navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Sidebar functionality
        const btn = document.querySelector('.hamburger-menu');
        const sidebar = document.querySelector('.sidebar-container');
        
        // Check if overlay exists, create it if not
        let overlay = document.querySelector('.overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'overlay';
            document.querySelector('.page-wrapper').prepend(overlay);
        }
        
        // Hamburger menu click handler
        if (btn) {
            btn.addEventListener('click', function() {
                sidebar.classList.toggle('active');
                btn.classList.toggle('active');
                overlay.classList.toggle('active');
                
                if (sidebar.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
        }
        
        // Overlay click handler
        if (overlay) {
            overlay.addEventListener('click', function() {
                sidebar.classList.remove('active');
                btn.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Get all navigation items
        const navItems = document.querySelectorAll('.sidebar-menu li');
        
        // Function to find which menu item matches the current URL
        function highlightActiveNavItem() {
            // Get current URL information
            const currentPath = window.location.pathname;
            const currentPage = currentPath.split('/').pop() || 'index.html';
            const currentHash = window.location.hash;
            
            console.log("Current page:", currentPage, "Current hash:", currentHash);
            
            // First remove all active classes
            navItems.forEach(item => item.classList.remove('active'));
            
            // Find and highlight the matching menu item
            navItems.forEach(item => {
                const link = item.querySelector('a');
                if (!link) return;
                
                const href = link.getAttribute('href');
                console.log("Checking link:", href);
                
                // Case 1: Hash-only links (#contact, #portfolio)
                if (href.startsWith('#')) {
                    // On index.html with matching hash
                    if (currentPage === 'index.html' && currentHash === href) {
                        console.log("Hash match found:", href);
                        item.classList.add('active');
                    }
                }
                // Case 2: Page links with hash (about-me.html#section)
                else if (href.includes('#')) {
                    const [hrefPage, hrefHash] = href.split('#');
                    // Check if both page and hash match
                    if (hrefPage === currentPage && currentHash === '#' + hrefHash) {
                        console.log("Page+hash match found:", href);
                        item.classList.add('active');
                    }
                }
                // Case 3: Simple page links (about-me.html)
                else if (href === currentPage && !currentHash) {
                    console.log("Page match found:", href);
                    item.classList.add('active');
                }
            });
        }
        
        // Initial highlighting
        highlightActiveNavItem();
        
        // Click handler for menu items
        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                const link = this.querySelector('a');
                if (!link) return;
                
                const href = link.getAttribute('href');
                
                // If it's a hash link to the current page
                if (href.startsWith('#')) {
                    // Immediate visual feedback
                    navItems.forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                }
                
                // Close mobile menu if needed
                if (window.innerWidth <= 768) {
                    if (sidebar) sidebar.classList.remove('active');
                    if (btn) btn.classList.remove('active');
                    if (overlay) overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Update highlighting when hash changes
        window.addEventListener('hashchange', function() {
            console.log("Hash changed to:", window.location.hash);
            highlightActiveNavItem();
        });
    } catch (e) {
        console.error("Navigation error:", e);
    }
}); 