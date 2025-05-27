document.addEventListener('DOMContentLoaded', function() {
  // Modal elements
  const modal = document.getElementById('project-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalClose = document.querySelector('.modal-close');

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

  // Add click listeners to all project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
      // Get info from card
      const img = card.querySelector('img');
      const title = card.querySelector('h3');
      // Use data-full-desc if present, otherwise fallback to <p>
      const desc = card.getAttribute('data-full-desc') || (card.querySelector('p') ? card.querySelector('p').textContent : 'Short project description goes here.');
      const btn = card.querySelector('.btn');

      // Populate modal
      modalImg.src = img ? img.src : '';
      modalImg.alt = img ? img.alt : '';
      modalTitle.textContent = title ? title.textContent : '';
      modalDesc.textContent = desc;

      // Show link if present
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

  // Optional: Close modal on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.style.display === 'flex') modal.style.display = 'none';
  });
}); 