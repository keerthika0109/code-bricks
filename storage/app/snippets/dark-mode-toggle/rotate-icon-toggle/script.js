document.getElementById('rotateIconBtn').addEventListener('click', function () {
  this.classList.toggle('spun');
  document.body.classList.toggle('dark');
  document.getElementById('rotateIconInner').textContent = document.body.classList.contains('dark') ? '🌙' : '☀️';
});
