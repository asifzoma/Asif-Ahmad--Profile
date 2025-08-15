document.addEventListener('DOMContentLoaded', function() {
    // === NOTE: Sidebar underline animations are now handled purely by CSS/SCSS ===
    // No JavaScript needed for visual effects - all hover/active states are CSS-based
    // This improves performance and ensures consistent behavior across all nav elements
    
    // === NOTE: Hamburger menu functionality is handled by home.js ===
    // No need to duplicate the functionality here to avoid conflicts
    
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
        
        // Function to decode HTML entities
        function decodeHtmlEntities(text) {
            const textArea = document.createElement('textarea');
            textArea.innerHTML = text;
            return textArea.value;
        }
        
        // Function to escape HTML for display as text
        function escapeHtmlForDisplay(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
        
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
                        // First decode HTML entities, then escape for display as text
                        const decodedCode = decodeHtmlEntities(codeContent);
                        const escapedCode = escapeHtmlForDisplay(decodedCode);
                        
                        codeModalContent.innerHTML = `
                            <button class="modal-close">&times;</button>
                            <div class="modal-header">
                                <h3>${title}</h3>
                            </div>
                            <div class="modal-body">
                                <div class="code-section">
                                    <h4>Code:</h4>
                                    <pre><code>${escapedCode}</code></pre>
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
        document.querySelectorAll('a[href="#about-accordion"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openAboutAccordion();
                setTimeout(() => {
                    if (aboutAccordion) {
                        aboutAccordion.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 50);
            });
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
                
                // Special handling for code snippets and about accordion
                if (href === '#code-snippets' || href === '#about-accordion') {
                    // Let their specific handlers take care of these
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

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Custom smooth scroll function with cubic-bezier
    function smoothScrollToTop(duration = 1000) {
        const startPosition = window.pageYOffset;
        const startTime = performance.now();
        
        function easeInOutCubic(t) {
            return t < 0.5 
                ? 4 * t * t * t 
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }
        
        function scrollAnimation(currentTime) {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            const easeProgress = easeInOutCubic(progress);
            const scrollPosition = startPosition * (1 - easeProgress);
            
            window.scrollTo(0, scrollPosition);
            
            if (progress < 1) {
                requestAnimationFrame(scrollAnimation);
            }
        }
        
        requestAnimationFrame(scrollAnimation);
    }

    // Add click handler for AZA logo
    document.addEventListener('DOMContentLoaded', () => {
        const azaLogo = document.querySelector('.sidebar-header h3 a');
        if (azaLogo) {
            azaLogo.addEventListener('click', (e) => {
                e.preventDefault();
                smoothScrollToTop();
                
                // Update URL without triggering scroll
                if (history.pushState) {
                    history.pushState(null, null, azaLogo.getAttribute('href'));
                }
            });
        }
    });

    // --- Floating Languages X-Axis Shift on Scroll ---
    window.addEventListener('scroll', function() {
        const floatingLanguages = document.querySelector('.floating-languages');
        const floatingTags = document.querySelectorAll('.floating-tag');
        if (floatingLanguages && floatingTags.length > 0) {
            const tagWidth = floatingTags[0].offsetWidth;
            const xOffset = 3 * tagWidth;
            if (window.scrollY > 0) {
                floatingLanguages.style.left = `calc(50% + ${xOffset}px)`;
                // floatingLanguages.style.transform = 'translateX(-50%)';
            } else {
                floatingLanguages.style.left = '50%';
                // floatingLanguages.style.transform = 'translateX(-50%)';
            }
        }
    });

    // --- About Me Read More (Mobile Accordion) ---
    var aboutContent = document.querySelector('.about-me-content');
    var readMoreBtn = document.querySelector('.read-more-btn');
    var aboutSection = document.getElementById('about-me');
    if (aboutContent && readMoreBtn) {
        // Only show button if content is overflowing (on mobile)
        function checkOverflow() {
            if (window.innerWidth <= 600 && aboutContent.scrollHeight > aboutContent.clientHeight + 10) {
                readMoreBtn.style.display = 'block';
            } else {
                readMoreBtn.style.display = 'none';
                aboutContent.classList.remove('expanded');
                readMoreBtn.textContent = 'Read More';
            }
        }
        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        readMoreBtn.addEventListener('click', function() {
            if (aboutContent.classList.contains('expanded')) {
                aboutContent.classList.remove('expanded');
                readMoreBtn.textContent = 'Read More';
                // Scroll back to About Me section
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else {
                aboutContent.classList.add('expanded');
                readMoreBtn.textContent = 'Show Less';
            }
        });
    }

    // --- Coming Soon Accordion ---
    // Make toggleComingSoon function globally available
    window.toggleComingSoon = function() {
        const accordionBtn = document.querySelector('.coming-soon-accordion .accordion-btn');
        const accordionContent = document.getElementById('coming-soon-content');
        
        console.log('toggleComingSoon called'); // Debug log
        console.log('Accordion button found:', !!accordionBtn); // Debug log
        console.log('Accordion content found:', !!accordionContent); // Debug log
        
        if (accordionBtn && accordionContent) {
            console.log('Elements found, toggling...'); // Debug log
            accordionBtn.classList.toggle('active');
            accordionContent.classList.toggle('active');
            
            // Update max-height for smooth animation
            if (accordionContent.classList.contains('active')) {
                const contentHeight = accordionContent.scrollHeight;
                accordionContent.style.maxHeight = contentHeight + 'px';
                console.log('Opening accordion, height:', contentHeight); // Debug log
            } else {
                accordionContent.style.maxHeight = '0px';
                console.log('Closing accordion'); // Debug log
            }
        } else {
            console.log('Elements not found:', { accordionBtn, accordionContent }); // Debug log
        }
    };

    // Also add event listener as backup
    const accordionBtn = document.querySelector('.coming-soon-accordion .accordion-btn');
    if (accordionBtn) {
        accordionBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Accordion button clicked via event listener'); // Debug log
            window.toggleComingSoon();
        });
        console.log('Event listener added to accordion button'); // Debug log
    } else {
        console.log('Accordion button not found for event listener'); // Debug log
    }

    // Initialize accordion state
    const accordionContent = document.getElementById('coming-soon-content');
    if (accordionContent) {
        accordionContent.style.maxHeight = '0px';
        console.log('Accordion initialized'); // Debug log
    } else {
        console.log('Accordion content not found for initialization'); // Debug log
    }
}); 