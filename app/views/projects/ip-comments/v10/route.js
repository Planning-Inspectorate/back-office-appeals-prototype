document.addEventListener('DOMContentLoaded', function () {
  const hiddenDocs = document.querySelectorAll('.app-doc--hidden');
  const readMoreBtn = document.getElementById('read-more-btn');

  // Hide items 6+ immediately on page load
  hiddenDocs.forEach(function (doc) {
    doc.style.display = 'none';
  });

  // Reveal items on button click
  if (readMoreBtn) {
    readMoreBtn.addEventListener('click', function (e) {
      e.preventDefault();

      hiddenDocs.forEach(function (doc) {
        doc.style.display = 'list-item';
      });

      // Hide the button permanently
      readMoreBtn.style.display = 'none';
    });
  }
});