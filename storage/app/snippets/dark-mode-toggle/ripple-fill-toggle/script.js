let dark = false;
document.getElementById('rippleThemeBtn').addEventListener('click', function () {
  dark = !dark;
  const overlay = document.getElementById('rippleFillOverlay');
  overlay.classList.toggle('active', dark);
  setTimeout(() => document.body.classList.toggle('dark', dark), 300);
  this.textContent = dark ? '☀️' : '🌙';
});
