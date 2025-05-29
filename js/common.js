document.addEventListener('DOMContentLoaded', function() {
  // Modal elements
  const modal = document.getElementById('project-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalCodeDesc = document.getElementById('modal-code-desc');
  const modalCodeContainer = document.getElementById('modal-code-container');
  const modalClose = document.querySelector('.modal-close');

  // Code snippets accordion
  const snippetsHeading = document.querySelector('.code-snippets h2');
  const snippetsContainer = document.querySelector('.snippets-container');
  const sidebarCodeLink = document.querySelector('.nav-tab a[href="#code-snippets"]');
  
  function toggleSnippets(shouldOpen = true) {
    if (snippetsContainer) {
      snippetsContainer.style.display = shouldOpen ? 'flex' : 'none';
      if (snippetsHeading) {
        snippetsHeading.classList.toggle('active', shouldOpen);
      }
    }
  }
  
  if (snippetsHeading && snippetsContainer) {
    snippetsContainer.style.display = 'none';
    snippetsHeading.style.cursor = 'pointer';
    
    snippetsHeading.addEventListener('click', () => toggleSnippets(snippetsContainer.style.display !== 'flex'));
  }

  // Handle sidebar menu click
  if (sidebarCodeLink) {
    sidebarCodeLink.addEventListener('click', function(e) {
      e.preventDefault();
      const codeSection = document.querySelector('.code-snippets');
      if (codeSection) {
        codeSection.scrollIntoView({ behavior: 'smooth' });
        // Open the accordion after scrolling
        setTimeout(() => toggleSnippets(true), 500);
      }
    });
  }

  // Add a container for the modal link if it doesn't exist
  let modalLink = document.getElementById('modal-link');
  if (!modalLink) {
    modalLink = document.createElement('a');
    modalLink.id = 'modal-link';
    modalLink.className = 'btn';
    modalLink.style.display = 'none';
    modalLink.style.marginTop = '1rem';
    modalDesc.parentNode.appendChild(modalLink);
  }

  // Function to handle card clicks
  function handleCardClick(card) {
    // Get info from card
    const img = card.querySelector('img');
    const title = card.querySelector('h3');
    const desc = card.getAttribute('data-full-desc') || (card.querySelector('p') ? card.querySelector('p').textContent : '');
    const btn = card.querySelector('.btn');

    // Populate modal
    if (img) {
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modalImg.style.display = 'block';
    } else {
      modalImg.style.display = 'none';
    }
    
    modalTitle.textContent = title ? title.textContent : '';
    
    // Handle code snippets differently
    if (card.classList.contains('snippet-card')) {
      modalCodeContainer.style.display = 'block';
      modalDesc.textContent = desc;
      modalCodeDesc.textContent = card.querySelector('p').textContent;
      modalCodeDesc.style.display = 'block';
      
      // Ensure code container is visible and scrollable
      modalCodeContainer.style.maxHeight = '60vh';
      modalCodeContainer.style.overflowY = 'auto';
    } else {
      modalCodeContainer.style.display = 'none';
      modalDesc.textContent = desc;
      modalCodeDesc.style.display = 'none';
    }

    // Show link if present (only for project cards)
    if (btn) {
      modalLink.href = btn.href;
      modalLink.textContent = btn.textContent;
      modalLink.target = btn.target || '_blank';
      modalLink.style.display = 'inline-block';
    } else {
      modalLink.style.display = 'none';
    }

    // Show modal
    modal.style.display = 'flex';
  }

  // Add click listeners to all project cards
  document.querySelectorAll('.project-card, .snippet-card').forEach(card => {
    card.addEventListener('click', function() {
      handleCardClick(this);
    });
  });

  // Close modal on X click or background click
  if (modalClose) {
    modalClose.addEventListener('click', () => modal.style.display = 'none');
  }
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.style.display === 'flex') modal.style.display = 'none';
  });
}); 