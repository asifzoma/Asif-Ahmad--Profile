document.addEventListener('DOMContentLoaded', function() {
    // Remove any existing modals on page load
    const existingModal = document.querySelector('.project-modal');
    if (existingModal) {
        document.body.removeChild(existingModal);
    }

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
            
            // Create modal container
            const modal = document.createElement('div');
            modal.className = 'project-modal';
            
            // Create modal content
            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';
            
            // Create close button
            const closeBtn = document.createElement('button');
            closeBtn.className = 'modal-close';
            closeBtn.innerHTML = '&times;';
            closeBtn.onclick = function() {
                document.body.removeChild(modal);
            };
            
            // Create modal content structure
            modalContent.innerHTML = `
                <img src="${image}" alt="${title}">
                <h3>${title}</h3>
                <p>${fullDesc}</p>
                ${liveSiteUrl ? `<a href="${liveSiteUrl}" class="btn" target="_blank">View Live Site</a>` : ''}
            `;
            
            // Add close button to modal content
            modalContent.appendChild(closeBtn);
            
            // Add modal content to modal container
            modal.appendChild(modalContent);
            
            // Add modal to body
            document.body.appendChild(modal);
            
            // Add click event to close modal when clicking outside
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });
    });

    // Prevent portfolio expansion when clicking sidebar navigation
    const portfolioNavLink = document.querySelector('a[href="index.html#portfolio"]');
    if (portfolioNavLink) {
        portfolioNavLink.addEventListener('click', function(e) {
            // Remove any existing modals
            const existingModal = document.querySelector('.project-modal');
            if (existingModal) {
                document.body.removeChild(existingModal);
            }
        });
    }
}); 