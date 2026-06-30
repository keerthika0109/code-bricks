document.getElementById('timeToggle').addEventListener('change', function () {
  document.body.classList.toggle('dark', this.checked);
  document.getElementById('timeLabel').textContent = this.checked ? '🌙 10:00 PM' : '☀️ 2:00 PM';
});
