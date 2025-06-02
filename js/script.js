document.addEventListener('DOMContentLoaded', function() {
    // === NOTE: Sidebar underline animations are now handled purely by CSS/SCSS ===
    // No JavaScript needed for visual effects - all hover/active states are CSS-based
    // This improves performance and ensures consistent behavior across all nav elements
    
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

    // --- Code Snippets Modal Logic ---
    const snippetCards = document.querySelectorAll('.snippet-card');
    if (snippetCards.length > 0 && codeModal && codeModalContent) {
        snippetCards.forEach(card => {
            const viewCodeBtn = card.querySelector('.view-code-btn');
            if (viewCodeBtn) {
                viewCodeBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const codeContent = card.getAttribute('data-code');
                    const explanation = card.getAttribute('data-explanation');
                    const title = card.querySelector('h3').textContent;
                    
                    if (codeContent && explanation) {
                        codeModalContent.innerHTML = `
                            <button class="modal-close">&times;</button>
                            <div class="modal-header">
                                <h3>${title}</h3>
                            </div>
                            <div class="modal-body">
                                <div class="code-section">
                                    <h4>Code:</h4>
                                    <pre><code>${codeContent}</code></pre>
                                </div>
                                <div class="explanation-section">
                                    <h4>Explanation:</h4>
                                    <p>${explanation}</p>
                                </div>
                            </div>
                        `;
                        
                        codeModal.style.display = 'flex';
                        setTimeout(() => { 
                            codeModal.classList.add('active'); 
                            codeModalContent.classList.add('active'); 
                        }, 10);
                        if(document.body) document.body.style.overflow = 'hidden';
                    }
                });
            }
        });
    }

    // --- Code Snippets Section Navigation and Toggle ---
    const codeSnippetsHeading = document.querySelector('h2#code-snippets');
    const snippetsContainer = document.querySelector('.snippets-container');
    let isContainerOpen = false; // Start with container closed by default
    
    if (codeSnippetsHeading && snippetsContainer) {
        // Set initial state - closed by default
        snippetsContainer.classList.remove('visible');
        snippetsContainer.classList.add('hidden');
        codeSnippetsHeading.classList.remove('active');
        
        // Handle heading click to toggle container visibility
        codeSnippetsHeading.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (isContainerOpen) {
                // Close container
                snippetsContainer.classList.remove('visible');
                snippetsContainer.classList.add('hidden');
                codeSnippetsHeading.classList.remove('active');
                isContainerOpen = false;
            } else {
                // Open container
                snippetsContainer.classList.remove('hidden');
                snippetsContainer.classList.add('visible');
                codeSnippetsHeading.classList.add('active');
                isContainerOpen = true;
                
                // Scroll to section when opening
                setTimeout(() => {
                    codeSnippetsHeading.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 100);
            }
        });
        
        // Handle sidebar navigation to code snippets
        const sidebarCodeLinks = document.querySelectorAll('a[href="#code-snippets"]');
        sidebarCodeLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Always open the container when navigating from sidebar
                snippetsContainer.classList.remove('hidden');
                snippetsContainer.classList.add('visible');
                codeSnippetsHeading.classList.add('active');
                isContainerOpen = true;
                
                // Smooth scroll to code snippets section
                setTimeout(() => {
                    const codeSection = document.querySelector('#code-snippets');
                    if (codeSection) {
                        codeSection.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                    }
                }, 100);
                
                // Update hash
                if (window.location.hash !== '#code-snippets') {
                    history.pushState(null, null, '#code-snippets');
                }
            });
        });
        
        // Handle initial hash navigation - only open if specifically navigated to
        if (window.location.hash === '#code-snippets') {
            snippetsContainer.classList.remove('hidden');
            snippetsContainer.classList.add('visible');
            codeSnippetsHeading.classList.add('active');
            isContainerOpen = true;
            
            setTimeout(() => {
                codeSnippetsHeading.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 100);
        }
    }

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

    // Enhanced smooth scrolling for all internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return; // Skip empty anchors
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                // Special handling for code snippets
                if (href === '#code-snippets') {
                    // Let the code snippets accordion handle this
                    return;
                }
                
                // Smooth scroll to target section
                setTimeout(() => {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start',
                        inline: 'nearest'
                    });
                }, 50);
                
                // Update URL hash
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
                
                console.log('🎯 Smooth scrolled to:', href);
            }
        });
    });
}); 