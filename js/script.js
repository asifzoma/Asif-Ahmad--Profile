document.addEventListener('DOMContentLoaded', function() {
    // Always hide modals on page load (safety)
    const existingProjectModal = document.querySelector('.project-modal');
    if (existingProjectModal) {
        existingProjectModal.style.display = 'none';
        existingProjectModal.classList.remove('active');
    }
    const existingCodeModal = document.querySelector('.code-modal');
    if (existingCodeModal) {
        existingCodeModal.style.display = 'none';
        existingCodeModal.classList.remove('active');
    }

    // Create project modal structure once
    const projectModal = document.createElement('div');
    projectModal.className = 'project-modal';
    projectModal.style.display = 'none';
    
    const projectModalContent = document.createElement('div');
    projectModalContent.className = 'modal-content';
    
    const projectCloseBtn = document.createElement('button');
    projectCloseBtn.className = 'modal-close';
    projectCloseBtn.innerHTML = '&times;';
    
    projectModalContent.appendChild(projectCloseBtn);
    projectModal.appendChild(projectModalContent);
    document.body.appendChild(projectModal);

    // Create code snippet modal structure once
    const codeModal = document.createElement('div');
    codeModal.className = 'code-modal';
    codeModal.style.display = 'none';
    
    const codeModalContent = document.createElement('div');
    codeModalContent.className = 'modal-content';
    
    const codeCloseBtn = document.createElement('button');
    codeCloseBtn.className = 'modal-close';
    codeCloseBtn.innerHTML = '&times;';
    
    codeModalContent.appendChild(codeCloseBtn);
    codeModal.appendChild(codeModalContent);
    document.body.appendChild(codeModal);

    // Portfolio card expansion functionality
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent expansion if clicking on the "View Live Site" link
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            const fullDesc = this.getAttribute('data-full-desc');
            const title = this.querySelector('h3').textContent;
            const image = this.querySelector('img').src;
            const liveSiteUrl = this.querySelector('.btn')?.href;
            
            // Update project modal content
            projectModalContent.innerHTML = `
                <button class="modal-close">&times;</button>
                <img src="${image}" alt="${title}">
                <h3>${title}</h3>
                <p>${fullDesc}</p>
                ${liveSiteUrl ? `<a href="${liveSiteUrl}" class="btn" target="_blank">View Live Site</a>` : ''}
            `;
            
            // Show project modal with animation
            projectModal.style.display = 'flex';
            setTimeout(() => {
                projectModal.classList.add('active');
                projectModalContent.classList.add('active');
            }, 10);
            
            document.body.style.overflow = 'hidden';
        });
    });

    // Code snippet expansion functionality
    const snippetCards = document.querySelectorAll('.snippet-card');
    
    snippetCards.forEach(card => {
        // Remove click event from the card itself
        card.style.cursor = 'default';
        
        // Add click event to the View Code button
        const viewCodeBtn = card.querySelector('.view-code-btn');
        if (viewCodeBtn) {
            viewCodeBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card click event
                
                const fullDesc = card.getAttribute('data-full-desc');
                const title = card.querySelector('h3').textContent;
                const description = card.querySelector('p').textContent;
                
                // Get the detailed explanation from the data attribute
                const detailedExplanation = card.getAttribute('data-detailed-explanation') || 
                    `This code snippet demonstrates ${description.toLowerCase()}. The implementation includes proper error handling, security measures, and follows best practices for maintainable and scalable code.`;
                
                // Update code modal content
                codeModalContent.innerHTML = `
                    <button class="modal-close">&times;</button>
                    <h3>${title}</h3>
                    <p class="code-description">${description}</p>
                    <pre><code>${fullDesc}</code></pre>
                    <div class="code-explanation">
                        <h4>Code Explanation</h4>
                        <p>${detailedExplanation}</p>
                    </div>
                `;
                
                // Show code modal with animation
                codeModal.style.display = 'flex';
                setTimeout(() => {
                    codeModal.classList.add('active');
                    codeModalContent.classList.add('active');
                }, 10);
                
                document.body.style.overflow = 'hidden';
            });
        }
    });

    // Close project modal
    projectModal.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-close') || e.target === projectModal) {
            console.log('Closing project modal'); // Debug log
            projectModal.classList.remove('active');
            projectModalContent.classList.remove('active');
            setTimeout(() => {
                projectModal.style.display = 'none';
                document.body.style.overflow = '';
                // Extra safety: remove any lingering active class
                projectModal.classList.remove('active');
                projectModalContent.classList.remove('active');
            }, 350);
        }
    });

    // Close code modal
    codeModal.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-close') || e.target === codeModal) {
            codeModal.classList.remove('active');
            codeModalContent.classList.remove('active');
            
            setTimeout(() => {
                codeModal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }
    });

    // Close modals on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (projectModal.style.display === 'flex') {
                projectModal.classList.remove('active');
                projectModalContent.classList.remove('active');
                setTimeout(() => {
                    projectModal.style.display = 'none';
                    document.body.style.overflow = '';
                }, 300);
            }
            if (codeModal.style.display === 'flex') {
                codeModal.classList.remove('active');
                codeModalContent.classList.remove('active');
                setTimeout(() => {
                    codeModal.style.display = 'none';
                    document.body.style.overflow = '';
                }, 300);
            }
        }
    });

    // Prevent portfolio expansion when clicking sidebar navigation
    const portfolioNavLink = document.querySelector('a[href="index.html#portfolio"]');
    if (portfolioNavLink) {
        portfolioNavLink.addEventListener('click', function() {
            projectModal.classList.remove('active');
            projectModalContent.classList.remove('active');
            codeModal.classList.remove('active');
            codeModalContent.classList.remove('active');
            
            setTimeout(() => {
                projectModal.style.display = 'none';
                codeModal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        });
    }

    // Accordion functionality
    const accordionBtn = document.querySelector('.accordion-btn');
    const accordionContent = document.querySelector('.accordion-content');

    if (accordionBtn && accordionContent) {
        // Function to open accordion
        function openAccordion() {
            accordionBtn.classList.add('active');
            accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
        }

        // Function to close accordion
        function closeAccordion() {
            accordionBtn.classList.remove('active');
            accordionContent.style.maxHeight = "0";
        }

        // Toggle accordion on click
        accordionBtn.addEventListener('click', function() {
            if (this.classList.contains('active')) {
                closeAccordion();
            } else {
                openAccordion();
            }
        });

        // Sidebar About Me and AZA buttons always open accordion and scroll
        document.querySelectorAll('a[href="#about-accordion"]').forEach(function(link) {
            link.addEventListener('click', function(e) {
                setTimeout(function() {
                    openAccordion();
                    document.getElementById('about-accordion').scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 10);
            });
        });

        // Open accordion on initial load if hash is present
        if (window.location.hash === '#about-accordion') {
            openAccordion();
        }
    }
}); 