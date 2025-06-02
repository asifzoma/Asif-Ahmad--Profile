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
            
            // Sidebar link handling
            const sidebarLink = document.querySelector('a[href="#code-snippets"]');
            if (sidebarLink) {
                sidebarLink.addEventListener('click', (e) => {
                    this.openContainer();
                    this.scrollToSection();
                });
            }
        }
        
        openContainer() {
            this.snippetsContainer.classList.remove('hidden');
            this.snippetsContainer.classList.add('visible');
            this.snippetsHeading.classList.add('active');
            this.isContainerOpen = true;
        }
        
        closeContainer() {
            this.snippetsContainer.classList.remove('visible');
            this.snippetsContainer.classList.add('hidden');
            this.snippetsHeading.classList.remove('active');
            this.isContainerOpen = false;
            
            // Close all open panels when closing container
            this.closeAllPanels();
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
                panel.classList.add('active');
                button.textContent = 'Hide Code';
                
                // Scroll to the card
                setTimeout(() => {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
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
                    
                    // Open target panel
                    panel.classList.add('active');
                    viewCodeBtn.textContent = 'Hide Code';
                    
                    // Scroll to the card
                    setTimeout(() => {
                        targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 100);
                }
            }
        }
        
        handleInitialHash() {
            const hash = window.location.hash.substring(1);
            if (hash === 'code-snippets' || hash === 'code-snippets-section') {
                this.openContainer();
                this.scrollToSection();
            } else if (hash.startsWith('snippet-')) {
                this.openSnippetById(hash);
            }
        }
        
        handleHashChange() {
            const hash = window.location.hash.substring(1);
            if (hash === 'code-snippets' || hash === 'code-snippets-section') {
                this.openContainer();
                this.scrollToSection();
            } else if (hash.startsWith('snippet-')) {
                this.openSnippetById(hash);
            }
        }
        
        scrollToSection() {
            if (this.snippetsSection) {
                setTimeout(() => {
                    this.snippetsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }
    
    // Initialize the accordion
    const codeSnippetsAccordion = new CodeSnippetsAccordion();

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