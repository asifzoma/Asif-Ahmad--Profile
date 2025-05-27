document.addEventListener('DOMContentLoaded', function() {
  // Modal elements
  const modal = document.getElementById('project-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalClose = document.querySelector('.modal-close');

  // Add click listeners to all project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
      // Get info from card
      const img = card.querySelector('img');
      const title = card.querySelector('h3');
      const desc = card.querySelector('p');

      // Populate modal
      modalImg.src = img ? img.src : '';
      modalImg.alt = img ? img.alt : '';
      modalTitle.textContent = title ? title.textContent : '';
      modalDesc.textContent = desc ? desc.textContent : 'Short project description goes here.';

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