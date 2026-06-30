document.getElementById('statusToggle').addEventListener('change', function () {
  document.body.classList.toggle('dark', this.checked);
  document.getElementById('statusDot').classList.toggle('dark-status', this.checked);
});
