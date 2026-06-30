document.getElementById('skyToggle').addEventListener('change', function () {
  document.body.classList.toggle('dark', this.checked);
  this.parentElement.querySelector('.sky-knob').textContent = this.checked ? '🌙' : '☀️';
});
