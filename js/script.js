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

    // --- Scroll-Controlled Floating Languages Animation ---
    const imageContainer = document.querySelector('.image-container');
    const floatingTags = document.querySelectorAll('.floating-tag');
    
    if (imageContainer && floatingTags.length > 0) {
        const isMobile = window.innerWidth <= 902;
        let animationId;
        
        // Orbital parameters - adjust radius based on viewport size
        let orbitRadius;
        if (window.innerWidth <= 480) {
            orbitRadius = 80; // Very small screens
        } else if (window.innerWidth <= 902) {
            orbitRadius = 100; // Mobile/tablet
        } else {
            orbitRadius = 140; // Desktop (reduced from 160 to ensure visibility)
        }
        
        // Assign each language an angle position on the circle (evenly spaced)
        const languages = ['html', 'css', 'javascript', 'php', 'csharp', 'laravel'];
        const angleStep = (2 * Math.PI) / languages.length; // 60 degrees apart
        
        const orbitalData = {};
        languages.forEach((lang, index) => {
            orbitalData[lang] = {
                baseAngle: index * angleStep, // Starting angle
                currentAngle: index * angleStep
            };
        });

        // Function to update circular orbit positions (when not scrolled)
        function updateOrbitalPositions(time) {
            // Calculate center considering sidebar width
            let viewportCenterX, viewportCenterY;
            
            if (window.innerWidth > 902) {
                // Desktop: Account for 15vw sidebar width
                const sidebarWidth = window.innerWidth * 0.15; // 15vw
                const contentAreaWidth = window.innerWidth - sidebarWidth;
                viewportCenterX = sidebarWidth + (contentAreaWidth * 0.5); // Center of content area
                viewportCenterY = window.innerHeight * 0.5;
            } else {
                // Mobile: Sidebar is hidden, use full viewport center
                viewportCenterX = window.innerWidth * 0.5;
                viewportCenterY = window.innerHeight * 0.5;
            }
            
            floatingTags.forEach(tag => {
                const langClass = Array.from(tag.classList).find(cls => languages.includes(cls));
                if (!langClass || !orbitalData[langClass]) return;
                
                // Update angle for continuous rotation (slow orbit)
                orbitalData[langClass].currentAngle = orbitalData[langClass].baseAngle + (time * 0.0005);
                
                // Calculate orbital position around adjusted center
                const angle = orbitalData[langClass].currentAngle;
                const x = viewportCenterX + Math.cos(angle) * orbitRadius;
                const y = viewportCenterY + Math.sin(angle) * orbitRadius;
                
                // Convert to absolute positioning
                tag.style.position = 'fixed';
                tag.style.top = `${y}px`;
                tag.style.left = `${x}px`;
                tag.style.transform = `translate(-50%, -50%) rotate(${angle * 180 / Math.PI}deg)`;
                tag.style.opacity = 0.8;
                tag.style.zIndex = '100'; // Ensure they appear above other content
            });
        }

        // Function to update language positions based on scroll progress
        function updateLanguagePositions() {
            const scrollY = window.scrollY;
            const imageContainerHeight = imageContainer.offsetHeight;
            const imageContainerWidth = imageContainer.offsetWidth;
            
            // Calculate scroll progress (0 to 1)
            const maxScroll = imageContainerHeight * 0.05; // Complete alignment at 60% scroll
            const scrollProgress = Math.min(scrollY / maxScroll, 1);
            
            // Easing function for smooth transition
            const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
            const easedProgress = easeOutCubic(scrollProgress);

            if (scrollProgress === 0) {
                // No scroll - continue orbital motion
                return; // Let orbital animation handle this
            }

            // Target horizontal positions when aligned (side by side)
            const spacing = isMobile ? 80 : 120; // Reduced spacing for smaller viewports
            const targetPositions = {
                html: -2.5 * spacing,
                css: -1.5 * spacing,
                javascript: -0.5 * spacing,
                php: 0.5 * spacing,
                csharp: 1.5 * spacing,
                laravel: 2.5 * spacing
            };

            // Target Y position for horizontal alignment (bottom 20% area of image container)
            const containerRect = imageContainer.getBoundingClientRect();
            const targetTop = containerRect.top + imageContainerHeight * 0.85;
            const centerLeft = containerRect.left + imageContainerWidth / 2;

            // Calculate initial positions and store them for collision detection
            const iconData = [];
            const iconSize = isMobile ? 60 : 80; // Approximate icon size including padding
            const minSpacing = iconSize + 10; // Minimum spacing between icons

            floatingTags.forEach(tag => {
                const langClass = Array.from(tag.classList).find(cls => targetPositions.hasOwnProperty(cls));
                if (!langClass || !orbitalData[langClass]) return;
                
                // Get current orbital position in viewport coordinates (starting point)
                let viewportCenterX, viewportCenterY;
                
                if (window.innerWidth > 902) {
                    // Desktop: Account for sidebar
                    const sidebarWidth = window.innerWidth * 0.15;
                    const contentAreaWidth = window.innerWidth - sidebarWidth;
                    viewportCenterX = sidebarWidth + (contentAreaWidth * 0.5);
                    viewportCenterY = window.innerHeight * 0.5;
                } else {
                    // Mobile: Full viewport
                    viewportCenterX = window.innerWidth * 0.5;
                    viewportCenterY = window.innerHeight * 0.5;
                }
                
                const currentAngle = orbitalData[langClass].currentAngle;
                const initialX = viewportCenterX + Math.cos(currentAngle) * orbitRadius;
                const initialY = viewportCenterY + Math.sin(currentAngle) * orbitRadius;
                
                // Calculate target aligned position (in viewport coordinates)
                const finalTop = targetTop;
                const finalLeft = centerLeft + targetPositions[langClass];
                
                // Ensure icons stay within viewport bounds on smaller screens
                const clampedFinalLeft = Math.max(iconSize / 2 + 25, Math.min(window.innerWidth - iconSize / 2 - 25, finalLeft));
                
                // Store icon data for collision detection
                iconData.push({
                    tag,
                    langClass,
                    initialX,
                    initialY,
                    finalTop,
                    finalLeft: clampedFinalLeft,
                    targetOrder: Object.keys(targetPositions).indexOf(langClass) // Maintain order
                });
            });

            // Sort icons by their target order to maintain consistent spacing
            iconData.sort((a, b) => a.targetOrder - b.targetOrder);

            // Calculate transition positions with collision prevention
            const processedPositions = [];

            iconData.forEach((iconInfo, index) => {
                // Basic interpolation between orbital and target position
                let currentTop = iconInfo.initialY + (iconInfo.finalTop - iconInfo.initialY) * easedProgress;
                let currentLeft = iconInfo.initialX + (iconInfo.finalLeft - iconInfo.initialX) * easedProgress;

                // Collision detection and prevention during transition
                if (easedProgress > 0.1) { // Start collision prevention after initial movement
                    // Check against previously processed icons
                    for (let i = 0; i < processedPositions.length; i++) {
                        const otherPos = processedPositions[i];
                        const distance = Math.abs(currentLeft - otherPos.left);
                        
                        if (distance < minSpacing) {
                            // Collision detected - adjust position
                            if (index < processedPositions.length) {
                                // This icon should be to the left
                                currentLeft = otherPos.left - minSpacing;
                            } else {
                                // This icon should be to the right
                                currentLeft = otherPos.left + minSpacing;
                            }
                            
                            // Ensure we don't go outside viewport bounds
                            currentLeft = Math.max(iconSize / 2 + 25, Math.min(window.innerWidth - iconSize / 2 - 25, currentLeft));
                        }
                    }
                }

                // Store processed position
                processedPositions.push({
                    left: currentLeft,
                    top: currentTop,
                    langClass: iconInfo.langClass
                });

                // Apply the calculated position to the tag
                iconInfo.tag.style.position = 'fixed';
                iconInfo.tag.style.top = `${currentTop}px`;
                iconInfo.tag.style.left = `${currentLeft}px`;
                
                // Animation effects - rotation aligns with scroll
                const currentAngle = orbitalData[iconInfo.langClass].currentAngle;
                const orbitalRotation = currentAngle * 180 / Math.PI;
                const alignedRotation = 0; // No rotation when aligned
                const currentRotation = orbitalRotation + (alignedRotation - orbitalRotation) * easedProgress;
                
                const scale = 0.8 + (easedProgress * 0.4); // Scale up when aligning
                iconInfo.tag.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg) scale(${scale})`;
                iconInfo.tag.style.opacity = 0.8 + (easedProgress * 0.2); // Slightly more opaque when aligned
                iconInfo.tag.style.zIndex = '100';
            });
        }

        // Animation loop for orbital motion
        function animate(time) {
            const scrollY = window.scrollY;
            const maxScroll = imageContainer.offsetHeight * 0.05;
            const scrollProgress = Math.min(scrollY / maxScroll, 1);
            
            if (scrollProgress === 0) {
                // Only do orbital animation when not scrolled
                updateOrbitalPositions(time);
            } else {
                // Handle scroll-based alignment
                updateLanguagePositions();
            }
            
            animationId = requestAnimationFrame(animate);
        }
        
        // Start the animation loop
        animationId = requestAnimationFrame(animate);

        // Enhanced hover effects for individual tags
        floatingTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform += ' scale(1.2)';
                this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.4)';
                this.style.zIndex = '10';
                this.style.filter = 'brightness(1.1)';
            });

            tag.addEventListener('mouseleave', function() {
                // Reset to scroll-controlled state
                updateLanguagePositions();
                this.style.boxShadow = '';
                this.style.zIndex = '';
                this.style.filter = '';
            });

            // Click effect with navigation to code snippets
            tag.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the language from the tag's class
                const langClass = Array.from(this.classList).find(cls => 
                    ['html', 'css', 'javascript', 'php', 'csharp', 'laravel'].includes(cls)
                );
                
                if (langClass) {
                    // Navigate to code snippets section
                    navigateToCodeSnippet(langClass);
                }
                
                // Create enhanced ripple effect
                const ripple = document.createElement('div');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 70%, transparent 100%);
                    transform: scale(0);
                    animation: scrollRipple 0.8s ease-out;
                    left: ${e.offsetX - size/2}px;
                    top: ${e.offsetY - size/2}px;
                    width: ${size}px;
                    height: ${size}px;
                    pointer-events: none;
                    z-index: 1;
                `;
                
                this.appendChild(ripple);
                
                // Add a brief shake effect
                this.style.animation = 'shake 0.5s ease-in-out';
                
                setTimeout(() => {
                    if (ripple.parentNode) ripple.remove();
                    this.style.animation = '';
                }, 800);
            });
        });

        // Scroll event listener (simplified since animation loop handles most of it)
        let ticking = false;
        function handleScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // The animation loop now handles position updates
                    ticking = false;
                });
                ticking = true;
            }
        }

        // Window resize handler
        function handleResize() {
            // Recalculate orbital radius based on new viewport size
            if (window.innerWidth <= 480) {
                orbitRadius = 80;
            } else if (window.innerWidth <= 902) {
                orbitRadius = 100;
            } else {
                orbitRadius = 140;
            }
            
            // Cancel and restart animation with new dimensions
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            
            // Restart animation (viewport center will be recalculated automatically)
            setTimeout(() => {
                animationId = requestAnimationFrame(animate);
            }, 100);
        }

        // Event listeners
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        
        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        });

        // Initial position update
        updateLanguagePositions();

        // Add enhanced CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes scrollRipple {
                to {
                    transform: scale(2.5);
                    opacity: 0;
                }
            }
            @keyframes shake {
                0%, 100% { transform: translate(-50%, -50%) translateX(0); }
                25% { transform: translate(-50%, -50%) translateX(-5px); }
                75% { transform: translate(-50%, -50%) translateX(5px); }
            }
            .floating-tag {
                position: absolute;
                overflow: visible;
                transition: filter 0.3s ease, box-shadow 0.3s ease;
                will-change: transform, opacity;
            }
            
            /* Smooth scrolling for the entire page */
            html {
                scroll-behavior: smooth;
            }
        `;
        document.head.appendChild(style);
    }

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