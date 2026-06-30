document.getElementById('foBtn').addEventListener('click', function () {
  const overlay = document.getElementById('foOverlay');
  overlay.classList.add('active');
  setTimeout(() => overlay.classList.remove('active'), 1600);
});
