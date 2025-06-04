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

    // --- Orbital Animation Functions ---
    function calculateOptimalRadius(imageContainer) {
        const imageCenter = getImageContainerCenter(imageContainer);
            const containerWidth = imageCenter.width;
            const containerHeight = imageCenter.height;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            // Get container's smaller dimension for proportional scaling
            const containerMinDimension = Math.min(containerWidth, containerHeight);
            
            // Base radius calculations with enhanced scaling factors
            let baseRadius;
            let scaleFactor;
            
            if (viewportWidth <= 480) {
                // Very small screens - more conservative radius
                scaleFactor = 0.20; // 20% of container's smaller dimension
                baseRadius = containerMinDimension * scaleFactor;
                baseRadius = Math.max(50, Math.min(baseRadius, 90)); // Clamp between 50-90px
            } else if (viewportWidth <= 902) {
                // Mobile/tablet - balanced radius
                scaleFactor = 0.25; // 25% of container's smaller dimension
                baseRadius = containerMinDimension * scaleFactor;
                baseRadius = Math.max(70, Math.min(baseRadius, 120)); // Clamp between 70-120px
            } else {
                // Desktop - larger radius for better visual impact
                scaleFactor = 0.30; // 30% of container's smaller dimension
                baseRadius = containerMinDimension * scaleFactor;
                baseRadius = Math.max(90, Math.min(baseRadius, 150)); // Clamp between 90-150px
            }
            
            // Additional scaling based on container aspect ratio
            const aspectRatio = containerWidth / containerHeight;
            if (aspectRatio > 1.5) {
                // Wide container - slightly reduce radius
                baseRadius *= 0.9;
            } else if (aspectRatio < 0.7) {
                // Tall container - slightly increase radius
                baseRadius *= 1.1;
            }
            
            // Ensure radius doesn't cause icons to go outside viewport bounds
            const centerX = imageCenter.x;
            const centerY = imageCenter.y;
            
            // Calculate maximum safe radius based on distance to viewport edges
            const maxRadiusLeft = centerX - 60; // 60px margin from left edge
            const maxRadiusRight = viewportWidth - centerX - 60; // 60px margin from right edge
            const maxRadiusTop = centerY - 60; // 60px margin from top edge
            const maxRadiusBottom = viewportHeight - centerY - 60; // 60px margin from bottom edge
            
            const maxSafeRadius = Math.min(maxRadiusLeft, maxRadiusRight, maxRadiusTop, maxRadiusBottom);
            
            // Return the smaller of the calculated radius or maximum safe radius
        return Math.min(baseRadius, Math.max(maxSafeRadius, 40)); // Minimum 40px radius
    }

    function getImageContainerCenter(imageContainer) {
            if (!imageContainer) {
                console.warn('Image container not found');
                return { x: window.innerWidth / 2, y: window.innerHeight / 2, width: 0, height: 0 };
            }
            
            // Get the container's position and dimensions
            const containerRect = imageContainer.getBoundingClientRect();
            
            // Get padding values to find the actual content area
        const computedStyle = window.getComputedStyle(imageContainer);
            const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
            const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
            const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;
            const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
            
        // Calculate the content area
            const contentLeft = containerRect.left + paddingLeft;
            const contentTop = containerRect.top + paddingTop;
            const contentWidth = containerRect.width - paddingLeft - paddingRight;
            const contentHeight = containerRect.height - paddingTop - paddingBottom;
            
            // Calculate the basic content center
            let centerX = contentLeft + (contentWidth / 2);
            let centerY = contentTop + (contentHeight / 2);
            
        // On desktop (>902px), subtract sidebar width for better visual balance
            if (window.innerWidth > 902) {
                const sidebarWidth = window.innerWidth * 0.15; // 15vw sidebar width
                centerX = centerX - sidebarWidth;
                
                console.log(`🎯 Desktop sidebar adjustment:
                    • Screen width: ${window.innerWidth}px
                    • Sidebar width: ${sidebarWidth}px (15vw)
                    • Original center X: ${contentLeft + (contentWidth / 2)}px
                    • Adjusted center X: ${centerX}px
                    • Adjustment: -${sidebarWidth}px`);
            }
            
            return {
                x: centerX,
                y: centerY,
                    width: contentWidth,
                    height: contentHeight
        };
    }

    function updateOrbitalPositions(time, imageContainer, floatingTags, orbitRadius) {
        const imageCenter = getImageContainerCenter(imageContainer);
        const languages = ['html', 'css', 'javascript', 'php', 'csharp', 'laravel'];
        const angleStep = (2 * Math.PI) / languages.length;
        
        floatingTags.forEach((tag, index) => {
                const langClass = Array.from(tag.classList).find(cls => languages.includes(cls));
            if (!langClass) return;
            
            // Calculate angle for this tag
            const baseAngle = index * angleStep;
            const currentAngle = baseAngle + (time * 0.0005);
            
            // Calculate orbital position
            const x = imageCenter.x + Math.cos(currentAngle) * orbitRadius;
            const y = imageCenter.y + Math.sin(currentAngle) * orbitRadius;
            
            // Apply position
            tag.style.position = 'fixed';
                tag.style.top = `${y}px`;
                tag.style.left = `${x}px`;
            tag.style.transform = `translate(-50%, -50%) rotate(${currentAngle * 180 / Math.PI}deg)`;
            tag.style.zIndex = '100';
        });
    }

    // Wait for all scripts to load before initializing orbital animation
    window.addEventListener('load', function() {
        const imageContainer = document.querySelector('.image-container');
        const floatingTags = document.querySelectorAll('.floating-tag');
        
        if (imageContainer && floatingTags.length > 0) {
            const isMobile = window.innerWidth <= 902;
            let animationId;
            let orbitRadius;
            let isAligned = false;
            
            // Initialize all tags with orbital animation class
            floatingTags.forEach(tag => {
                tag.classList.add('orbital-animation');
                
                // Add click handlers for each floating tag
                tag.addEventListener('click', function() {
                    const language = Array.from(tag.classList)
                        .find(cls => ['html', 'css', 'javascript', 'php', 'csharp', 'laravel'].includes(cls));
                    
                    if (language) {
                        navigateToCodeSnippet(language);
                    }
                });
            });

            // Function to align tags horizontally at bottom
            function alignTagsHorizontally() {
                const containerRect = imageContainer.getBoundingClientRect();
                const tagWidth = floatingTags[0].offsetWidth;
                
                // Calculate total width needed for all icons with minimal spacing
                const minSpacing = 10; // Minimum pixels between icons
                const totalTags = floatingTags.length;
                const totalWidth = (tagWidth * totalTags) + (minSpacing * (totalTags - 1));
                
                // Calculate scale if needed to fit within container
                let scale = 1;
                if (totalWidth > containerRect.width) {
                    scale = (containerRect.width - minSpacing) / totalWidth;
                    scale = Math.max(0.5, scale); // Don't scale smaller than 50%
                }
                
                // Calculate spacing between icons to fill container width
                const scaledTagWidth = tagWidth * scale;
                const spacing = minSpacing;
                
                floatingTags.forEach((tag, index) => {
                    tag.classList.remove('orbital-animation');
                    tag.classList.add('transition-state');
                    
                    // Position from left edge of container
                    const xPosition = containerRect.left + (index * (scaledTagWidth + spacing));
                    
                    // Ensure y position stays within container bounds
                    const yPosition = Math.min(
                        containerRect.bottom - 40, // Default position (40px from bottom)
                        window.innerHeight - (scaledTagWidth / 2) - 20 // Ensure visibility
                    );
                    
                    tag.style.position = 'fixed';
                    tag.style.left = `${xPosition}px`;
                    tag.style.top = `${yPosition}px`;
                    tag.style.transform = `translate(0, -50%) scale(${scale})`; // Remove horizontal centering
                    tag.style.width = `${tagWidth}px`; // Maintain original width
                    tag.style.height = `${tagWidth}px`; // Keep aspect ratio
                });
            }

            // Handle scroll events
            let lastScrollY = window.scrollY;
            const scrollThreshold = 50; // Amount of scroll before triggering alignment

            window.addEventListener('scroll', () => {
                const containerRect = imageContainer.getBoundingClientRect();
                const scrollY = window.scrollY;
                const isScrollingDown = scrollY > lastScrollY;
                
                // Check if container is visible and if we're at the top of the page
                const isContainerVisible = containerRect.bottom > 0 && containerRect.top < window.innerHeight;
                const isAtTop = scrollY === 0;
                
                if (isContainerVisible) {
                    if (!isAtTop && !isAligned) {
                        // Any scroll position except top - align horizontally
                        if (animationId) {
                            cancelAnimationFrame(animationId);
                            animationId = null;
                        }
                        isAligned = true;
                        alignTagsHorizontally();
                    } else if (isAtTop && isAligned) {
                        // At top of page - return to orbital
                        isAligned = false;
                        floatingTags.forEach(tag => {
                            tag.classList.remove('transition-state');
                            tag.classList.add('orbital-animation');
                            tag.style.transform = 'translate(-50%, -50%)'; // Reset transform to center-based
                            tag.style.opacity = '1';
                        });
                        
                        // Restart orbital animation
                        orbitRadius = calculateOptimalRadius(imageContainer);
                        function animate(time) {
                            updateOrbitalPositions(time, imageContainer, floatingTags, orbitRadius);
                            animationId = requestAnimationFrame(animate);
                        }
                        animate(Date.now());
                    }
                } else if (isAligned) {
                    // If container is not visible and icons are aligned, hide them
                    floatingTags.forEach(tag => {
                        tag.style.opacity = '0';
                    });
                }
                
                lastScrollY = scrollY;
            });
            
            // Start orbital animation immediately if not mobile
            if (!isMobile) {
                // Initial desktop setup
                orbitRadius = calculateOptimalRadius(imageContainer);
                
                // Animation loop
                function animate(time) {
                    updateOrbitalPositions(time, imageContainer, floatingTags, orbitRadius);
                    animationId = requestAnimationFrame(animate);
                }
                
                // Start animation immediately
                animate(Date.now());
                
                // Handle window resize
                window.addEventListener('resize', function() {
                    if (isAligned) {
                        alignTagsHorizontally();
                    } else {
                        orbitRadius = calculateOptimalRadius(imageContainer);
                    }
                });
                
                // Cleanup on page unload
                window.addEventListener('unload', function() {
                    if (animationId) {
                        cancelAnimationFrame(animationId);
                    }
                });
            }
        }
    });

    // --- Function to navigate to specific code snippet ---
    function navigateToCodeSnippet(language) {
        const codeSnippetsHeading = document.querySelector('h2#code-snippets');
        const snippetsContainer = document.querySelector('.snippets-container');
        
        if (!codeSnippetsHeading || !snippetsContainer) return;
        
        // Always open the container when navigating from floating icons
        snippetsContainer.classList.remove('hidden');
        snippetsContainer.classList.add('visible');
        codeSnippetsHeading.classList.add('active');
        isContainerOpen = true;
        
        // Find the specific snippet card for this language
        const targetSnippet = document.querySelector(`.snippet-card[data-language="${language}"]`);
        
        // Smooth scroll to code snippets section
        setTimeout(() => {
            codeSnippetsHeading.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            
            // Highlight the specific snippet after scrolling
            if (targetSnippet) {
                setTimeout(() => {
                    highlightSnippet(targetSnippet, language);
                }, 800); // Wait for scroll to complete
            }
        }, 100);
        
        // Update hash
        if (window.location.hash !== '#code-snippets') {
            history.pushState(null, null, '#code-snippets');
        }
    }
    
    // --- Function to highlight specific snippet ---
    function highlightSnippet(snippetCard, language) {
        // Remove any existing highlights
        document.querySelectorAll('.snippet-card').forEach(card => {
            card.classList.remove('highlighted');
        });
        
        // Add highlight to target snippet
        snippetCard.classList.add('highlighted');
        
        // Create a subtle pulse effect
        snippetCard.style.animation = 'snippetPulse 2s ease-in-out';
        
        // Show language-specific message
        showLanguageMessage(language);
        
        // Remove highlight after a few seconds
        setTimeout(() => {
            snippetCard.classList.remove('highlighted');
            snippetCard.style.animation = '';
        }, 3000);
    }
    
    // --- Function to show language-specific message ---
    function showLanguageMessage(language) {
        const languageNames = {
            html: 'HTML5',
            css: 'CSS3',
            javascript: 'JavaScript',
            php: 'PHP',
            csharp: 'C# / .NET',
            laravel: 'Laravel'
        };
        
        const languageName = languageNames[language] || language.toUpperCase();
        
        // Create message element
        const message = document.createElement('div');
        message.className = 'language-notification';
        message.innerHTML = `
            <i class="fas fa-arrow-down"></i>
            <span>Showing ${languageName} examples</span>
        `;
        
        // Add to page
        document.body.appendChild(message);
        
        // Animate in
        setTimeout(() => message.classList.add('show'), 100);
        
        // Remove after delay
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => {
                if (message.parentNode) message.remove();
            }, 300);
        }, 2500);
    }
}); 