document.getElementById('sunMoonToggle').addEventListener('click', function () {
  document.body.classList.toggle('dark');
  this.querySelector('.sm-icon').textContent = document.body.classList.contains('dark') ? '🌙' : '☀️';
});
