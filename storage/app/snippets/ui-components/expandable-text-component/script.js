document.getElementById('readmoreBtn').addEventListener('click', function () {
  const text = document.getElementById('readmoreText');
  text.classList.toggle('expanded');
  this.textContent = text.classList.contains('expanded') ? 'Read less' : 'Read more';
});
