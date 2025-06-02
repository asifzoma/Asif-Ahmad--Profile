document.addEventListener('DOMContentLoaded', function() {
    // --- Modals (Project & Code) ---
    // Ensure existing modals are hidden initially (safety measure)
    const existingProjectModal = document.querySelector('.project-modal');
    if (existingProjectModal && existingProjectModal.style.display !== 'none') {
        existingProjectModal.style.display = 'none';
        existingProjectModal.classList.remove('active');
    }
    const existingCodeModalOnLoad = document.querySelector('.code-modal');
    if (existingCodeModalOnLoad && existingCodeModalOnLoad.style.display !== 'none') {
        existingCodeModalOnLoad.style.display = 'none';
        existingCodeModalOnLoad.classList.remove('active');
    }

    // Create project modal structure once if not already in HTML
    let projectModal = document.querySelector('.project-modal');
    let projectModalContent;
    if (!projectModal) {
        projectModal = document.createElement('div');
        projectModal.className = 'project-modal';
        projectModal.style.display = 'none';
        projectModalContent = document.createElement('div');
        projectModalContent.className = 'modal-content';
        const projectCloseBtn = document.createElement('button');
        projectCloseBtn.className = 'modal-close';
        projectCloseBtn.innerHTML = '&times;';
        projectModalContent.appendChild(projectCloseBtn);
        projectModal.appendChild(projectModalContent);
        document.body.appendChild(projectModal);
    } else {
        projectModalContent = projectModal.querySelector('.modal-content');
    }

    // Create code snippet modal structure once (this is the original one, might be unused for snippets now)
    let codeModal = document.querySelector('.code-modal');
    let codeModalContent;
    if (!codeModal) {
        codeModal = document.createElement('div');
        codeModal.className = 'code-modal';
        codeModal.style.display = 'none';
        codeModalContent = document.createElement('div');
        codeModalContent.className = 'modal-content';
        const codeCloseBtn = document.createElement('button');
        codeCloseBtn.className = 'modal-close';
        codeCloseBtn.innerHTML = '&times;';
        codeModalContent.appendChild(codeCloseBtn);
        codeModal.appendChild(codeModalContent);
        document.body.appendChild(codeModal);
    } else {
        codeModalContent = codeModal.querySelector('.modal-content');
    }

    // --- Portfolio card expansion (Uses projectModal) ---
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0 && projectModal && projectModalContent) {
        projectCards.forEach(card => {
            card.addEventListener('click', function(e) {
                if (e.target.tagName === 'A' || e.target.closest('a')) return;
                const fullDesc = this.getAttribute('data-full-desc');
                const title = this.querySelector('h3').textContent;
                const image = this.querySelector('img').src;
                const liveSiteUrl = this.querySelector('.btn')?.href;
                projectModalContent.innerHTML = `
                    <button class="modal-close">&times;</button>
                    <img src="${image}" alt="${title}">
                    <h3>${title}</h3>
                    <p>${fullDesc || ''}</p>
                    ${liveSiteUrl ? `<a href="${liveSiteUrl}" class="btn" target="_blank">View Live Site</a>` : ''}
                `;
                projectModal.style.display = 'flex';
                setTimeout(() => { projectModal.classList.add('active'); projectModalContent.classList.add('active'); }, 10);
                if(document.body) document.body.style.overflow = 'hidden';
            });
        });
    }

    // --- Code Snippets Accordion Logic ---
    class CodeSnippetsAccordion {
        constructor() {
            this.snippetsSection = document.querySelector('section.code-snippets');
            this.snippetsHeading = this.snippetsSection ? this.snippetsSection.querySelector('h2#code-snippets') : null;
            this.snippetsContainer = this.snippetsSection ? this.snippetsSection.querySelector('.snippets-container') : null;
            this.snippetCards = this.snippetsSection ? this.snippetsSection.querySelectorAll('.snippet-card') : [];
            this.isContainerOpen = false;
            
            this.init();
        }
        
        init() {
            if (!this.snippetsHeading || !this.snippetsContainer) {
                console.warn('Code snippets elements not found');
                return;
            }
            
            // Set initial state
            this.closeContainer();
            
            // Handle initial hash navigation
            this.handleInitialHash();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Add loading state handler
            this.setupLoadingStates();
        }
        
        setupEventListeners() {
            // Main heading click
            this.snippetsHeading.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleContainer();
            });
            
            // Individual snippet buttons
            this.snippetCards.forEach(card => {
                const viewCodeBtn = card.querySelector('.view-code-btn');
                const panel = card.querySelector('.snippet-content-panel');
                
                if (viewCodeBtn && panel) {
                    viewCodeBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.toggleSnippetPanel(card, viewCodeBtn, panel);
                    });
                }
            });
            
            // Hash change handling
            window.addEventListener('hashchange', () => {
                this.handleHashChange();
            });
            
            // Sidebar link handling - simplified and more reliable approach
            const sidebarLinks = document.querySelectorAll('a[href="#code-snippets"]');
            
            console.log('🔗 Found sidebar links:', sidebarLinks.length);
            
            sidebarLinks.forEach((sidebarLink, index) => {
                console.log(`🔗 Setting up listener for sidebar link ${index + 1}:`, sidebarLink);
                
                sidebarLink.addEventListener('click', (e) => {
                    console.log('🚨 SIDEBAR LINK CLICKED!');
                    
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Direct DOM manipulation approach - force it open
                    const container = this.snippetsContainer;
                    const heading = this.snippetsHeading;
                    
                    // Force visible state using multiple methods
                    container.style.display = 'flex';
                    container.style.visibility = 'visible';
                    container.style.opacity = '1';
                    container.classList.remove('hidden');
                    container.classList.add('visible');
                    heading.classList.add('active');
                    
                    this.isContainerOpen = true;
                    
                    console.log('✅ Forced accordion open via direct manipulation');
                    
                    // Scroll to section
                    setTimeout(() => {
                        this.snippetsSection.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                    }, 100);
                    
                    // Update hash if needed
                    if (window.location.hash !== '#code-snippets') {
                        history.pushState(null, null, '#code-snippets');
                    }
                });
            });
        }
        
        setupLoadingStates() {
            // Add loading animation to buttons when clicked
            this.snippetCards.forEach(card => {
                const viewCodeBtn = card.querySelector('.view-code-btn');
                if (viewCodeBtn) {
                    viewCodeBtn.addEventListener('click', () => {
                        this.addLoadingState(viewCodeBtn);
                        setTimeout(() => {
                            this.removeLoadingState(viewCodeBtn);
                        }, 300);
                    });
                }
            });
        }
        
        addLoadingState(button) {
            button.classList.add('loading');
            button.style.pointerEvents = 'none';
        }
        
        removeLoadingState(button) {
            button.classList.remove('loading');
            button.style.pointerEvents = '';
        }
        
        openContainer() {
            // Force container to open regardless of current state
            this.snippetsContainer.classList.remove('hidden');
            this.snippetsContainer.classList.add('visible');
            this.snippetsHeading.classList.add('active');
            this.isContainerOpen = true;
            
            // Double-check by removing any conflicting inline styles
            this.snippetsContainer.style.display = '';
            
            console.log('✅ Code snippets container opened - State:', {
                hasVisibleClass: this.snippetsContainer.classList.contains('visible'),
                hasHiddenClass: this.snippetsContainer.classList.contains('hidden'),
                headingActive: this.snippetsHeading.classList.contains('active'),
                isContainerOpen: this.isContainerOpen
            });
        }
        
        closeContainer() {
            this.snippetsContainer.classList.remove('visible');
            this.snippetsContainer.classList.add('hidden');
            this.snippetsHeading.classList.remove('active');
            this.isContainerOpen = false;
            
            // Close all open panels when closing container
            this.closeAllPanels();
            
            console.log('❌ Code snippets container closed');
        }
        
        toggleContainer() {
            if (this.isContainerOpen) {
                this.closeContainer();
            } else {
                this.openContainer();
                this.scrollToSection();
            }
        }
        
        toggleSnippetPanel(card, button, panel) {
            // Ensure container is open when opening any panel
            if (!this.isContainerOpen) {
                this.openContainer();
            }
            
            const isCurrentlyOpen = panel.classList.contains('active');
            
            // Close all other panels first
            this.closeAllPanels();
            
            // Toggle this panel
            if (!isCurrentlyOpen) {
                // Add a slight delay for better animation
                setTimeout(() => {
                    panel.classList.add('active');
                    button.textContent = 'Hide Code';
                    console.log('📖 Code panel opened:', card.id);
                    
                    // Scroll to the card with improved timing
                    setTimeout(() => {
                        card.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'nearest',
                            inline: 'nearest'
                        });
                    }, 150);
                }, 50);
            } else {
                panel.classList.remove('active');
                button.textContent = 'View Code';
                console.log('📕 Code panel closed:', card.id);
            }
        }
        
        closeAllPanels() {
            this.snippetCards.forEach(card => {
                const panel = card.querySelector('.snippet-content-panel');
                const button = card.querySelector('.view-code-btn');
                
                if (panel && panel.classList.contains('active')) {
                    panel.classList.remove('active');
                    if (button) {
                        button.textContent = 'View Code';
                    }
                }
            });
        }
        
        openSnippetById(snippetId) {
            this.openContainer();
            
            const targetCard = document.getElementById(snippetId);
            if (targetCard) {
                const viewCodeBtn = targetCard.querySelector('.view-code-btn');
                const panel = targetCard.querySelector('.snippet-content-panel');
                
                if (viewCodeBtn && panel) {
                    // Close all panels first
                    this.closeAllPanels();
                    
                    // Open target panel with animation
                    setTimeout(() => {
                        panel.classList.add('active');
                        viewCodeBtn.textContent = 'Hide Code';
                        console.log('🎯 Opened snippet by ID:', snippetId);
                        
                        // Scroll to the card
                        setTimeout(() => {
                            targetCard.scrollIntoView({ 
                                behavior: 'smooth', 
                                block: 'center',
                                inline: 'nearest'
                            });
                        }, 200);
                    }, 100);
                }
            }
        }
        
        handleInitialHash() {
            const hash = window.location.hash.substring(1);
            console.log('🔗 Initial hash detected:', hash);
            
            if (hash === 'code-snippets' || hash === 'code-snippets-section') {
                console.log('📂 Opening container from initial hash');
                this.openContainer();
                this.scrollToSection();
            } else if (hash.startsWith('snippet-')) {
                console.log('🎯 Opening specific snippet from initial hash:', hash);
                this.openSnippetById(hash);
            }
        }
        
        handleHashChange() {
            const hash = window.location.hash.substring(1);
            console.log('🔗 Hash changed to:', hash);
            
            if (hash === 'code-snippets' || hash === 'code-snippets-section') {
                console.log('📂 Opening container from hash change');
                this.openContainer();
                this.scrollToSection();
            } else if (hash.startsWith('snippet-')) {
                console.log('🎯 Opening specific snippet from hash change:', hash);
                this.openSnippetById(hash);
            } else if (hash === '') {
                // Empty hash - don't auto-close, let user control manually
                console.log('🏠 Hash cleared - keeping current accordion state');
            }
        }
        
        scrollToSection() {
            if (this.snippetsSection) {
                setTimeout(() => {
                    this.snippetsSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start',
                        inline: 'nearest'
                    });
                }, 100);
            }
        }
        
        // Public method to open a specific snippet (can be called from outside)
        openSpecificSnippet(snippetId) {
            this.openSnippetById(snippetId);
        }
        
        // Public method to toggle container (can be called from outside)
        toggle() {
            this.toggleContainer();
        }
        
        // Sync internal state with actual DOM state
        syncState() {
            const isActuallyVisible = this.snippetsContainer.classList.contains('visible') && 
                                     !this.snippetsContainer.classList.contains('hidden');
            const computedStyle = window.getComputedStyle(this.snippetsContainer);
            const isDisplayed = computedStyle.display !== 'none';
            
            this.isContainerOpen = isActuallyVisible && isDisplayed;
            
            console.log('🔄 State synced:', {
                isContainerOpen: this.isContainerOpen,
                hasVisibleClass: this.snippetsContainer.classList.contains('visible'),
                hasHiddenClass: this.snippetsContainer.classList.contains('hidden'),
                computedDisplay: computedStyle.display
            });
            
            return this.isContainerOpen;
        }
        
        // Force open method for external use or debugging
        forceOpen() {
            console.log('🚀 Force opening accordion...');
            
            // Clear any potential inline styles that might interfere
            this.snippetsContainer.style.display = '';
            this.snippetsContainer.style.visibility = '';
            this.snippetsContainer.style.opacity = '';
            
            // Force the open state
            this.openContainer();
            this.scrollToSection();
            
            // Verify it actually opened
            setTimeout(() => {
                const isVisible = this.snippetsContainer.classList.contains('visible');
                const computedStyle = window.getComputedStyle(this.snippetsContainer);
                console.log('🔍 Force open verification:', {
                    hasVisibleClass: isVisible,
                    computedDisplay: computedStyle.display,
                    isContainerOpen: this.isContainerOpen
                });
                
                if (!isVisible || computedStyle.display === 'none') {
                    console.error('⚠️ Force open failed - trying emergency fix');
                    this.snippetsContainer.style.display = 'flex !important';
                    this.isContainerOpen = true;
                }
            }, 100);
            
            return this;
        }
        
        // Test method for manual debugging from console
        testSidebarClick() {
            console.log('🧪 Testing sidebar click simulation...');
            this.syncState();
            const currentHash = window.location.hash.substring(1);
            console.log('🧪 Before test - Hash:', currentHash, 'Container open:', this.isContainerOpen);
            this.forceOpen();
            console.log('🧪 After test - forcing accordion open');
            return this;
        }
    }
    
    // Initialize the accordion
    const codeSnippetsAccordion = new CodeSnippetsAccordion();
    
    // Make it globally accessible for debugging/external use
    window.codeSnippetsAccordion = codeSnippetsAccordion;
    
    // Add a global backup function for forcing accordion open
    window.forceOpenCodeSnippets = function() {
        console.log('🔧 Global force open called');
        const container = document.querySelector('.snippets-container');
        const heading = document.querySelector('h2#code-snippets');
        const section = document.querySelector('section.code-snippets');
        
        if (container && heading) {
            // Multiple approaches to ensure it opens
            container.style.display = 'flex';
            container.style.visibility = 'visible';
            container.style.opacity = '1';
            container.classList.remove('hidden');
            container.classList.add('visible');
            heading.classList.add('active');
            
            console.log('✅ Global force open completed');
            
            // Scroll to section
            if (section) {
                setTimeout(() => {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
            
            return true;
        } else {
            console.error('❌ Could not find accordion elements');
            return false;
        }
    };

    // --- Modal Close Handlers ---
    // Close project modal
    if (projectModal && projectModalContent) {
        projectModal.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal-close') || e.target === projectModal) {
                projectModal.classList.remove('active'); projectModalContent.classList.remove('active');
                setTimeout(() => { projectModal.style.display = 'none'; if(document.body) document.body.style.overflow = ''; }, 350);
            }
        });
    }

    // Close code modal (original one)
    if (codeModal && codeModalContent) {
        codeModal.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal-close') || e.target === codeModal) {
                codeModal.classList.remove('active'); codeModalContent.classList.remove('active');
                setTimeout(() => { codeModal.style.display = 'none'; if(document.body) document.body.style.overflow = ''; }, 300);
            }
        });
    }
    
    // Escape key for modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (projectModal && projectModal.style.display === 'flex') {
                projectModal.classList.remove('active'); if(projectModalContent) projectModalContent.classList.remove('active');
                setTimeout(() => { projectModal.style.display = 'none'; if(document.body) document.body.style.overflow = ''; }, 300);
            }
            if (codeModal && codeModal.style.display === 'flex') {
                codeModal.classList.remove('active'); if(codeModalContent) codeModalContent.classList.remove('active');
                setTimeout(() => { codeModal.style.display = 'none'; if(document.body) document.body.style.overflow = ''; }, 300);
            }
        }
    });

    // --- Generic Accordion (Placeholder) ---
    const genericAccordionBtn = document.querySelector('.accordion-btn'); 
    const genericAccordionContent = document.querySelector('.accordion-content'); 
    if (genericAccordionBtn && genericAccordionContent && !genericAccordionBtn.closest('#about-accordion') && !genericAccordionBtn.closest('.snippet-card')) {
        function openGenericAccordion() { genericAccordionBtn.classList.add('active'); genericAccordionContent.style.maxHeight = genericAccordionContent.scrollHeight + "px"; }
        function closeGenericAccordion() { genericAccordionBtn.classList.remove('active'); genericAccordionContent.style.maxHeight = "0"; }
        genericAccordionBtn.addEventListener('click', function() { if (this.classList.contains('active')) closeGenericAccordion(); else openGenericAccordion(); });
    }

    // --- Specific About Me Accordion Logic ---
    const aboutAccordion = document.getElementById('about-accordion');
    if (aboutAccordion) {
        const aboutAccordionBtn = aboutAccordion.querySelector('.about-accordion-btn');
        const aboutAccordionContent = aboutAccordion.querySelector('.about-accordion-content');
        const aboutAccordionIcon = aboutAccordionBtn ? aboutAccordionBtn.querySelector('i.fas') : null;
        function openAboutAccordion() {
            if(!aboutAccordion || !aboutAccordionContent || !aboutAccordionBtn || !aboutAccordionIcon) return; 
            aboutAccordionBtn.classList.add('active');
            aboutAccordion.classList.add('open');
            aboutAccordionContent.style.maxHeight = aboutAccordionContent.scrollHeight + "px";
            aboutAccordionIcon.classList.remove('fa-chevron-down');
            aboutAccordionIcon.classList.add('fa-chevron-up');
        }
        function closeAboutAccordion() {
            if(!aboutAccordion || !aboutAccordionContent || !aboutAccordionBtn || !aboutAccordionIcon) return; 
            aboutAccordionBtn.classList.remove('active');
            aboutAccordion.classList.remove('open');
            aboutAccordionContent.style.maxHeight = "0";
            aboutAccordionIcon.classList.remove('fa-chevron-up');
            aboutAccordionIcon.classList.add('fa-chevron-down');
        }
        if (aboutAccordionBtn && aboutAccordionContent) {
            // Initial state based on whether .about-accordion has 'open' or button has 'active'
            if (aboutAccordion.classList.contains('open') || aboutAccordionBtn.classList.contains('active')) {
                 openAboutAccordion();
            } else {
                 closeAboutAccordion();
            }
            aboutAccordionBtn.addEventListener('click', function(event) {
                event.stopImmediatePropagation();
                if (aboutAccordion.classList.contains('open') || this.classList.contains('active')) {
                    closeAboutAccordion();
                } else {
                    openAboutAccordion();
                }
            });
        }
        // Sidebar links for About Me accordion
        const sidebarLinksToAbout = [
            document.getElementById('sidebar-about-me-link'), 
            document.getElementById('profile-sidebar-about-me-link')
        ];
        sidebarLinksToAbout.forEach(link => {
            if (link) {
                link.addEventListener('click', function(e) { 
                    e.preventDefault(); 
                    openAboutAccordion();
                    setTimeout(() => { if (aboutAccordion) aboutAccordion.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50); 
                });
            }
        });
        // Hash link for About Me accordion
        if (window.location.hash === '#about-accordion') {
            openAboutAccordion();
            setTimeout(() => { if (aboutAccordion) aboutAccordion.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100); 
        }
    }
}); 