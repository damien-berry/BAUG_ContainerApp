document.addEventListener('DOMContentLoaded', () => {
  const updatedDate = document.getElementById('updated-date');

  if (updatedDate) {
    updatedDate.textContent = new Date().toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
});
