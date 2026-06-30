document.getElementById('confirmToggle').addEventListener('change', function () {
  document.body.classList.toggle('dark', this.checked);
  const toast = document.getElementById('confirmToast');
  toast.textContent = this.checked ? 'Dark mode enabled' : 'Light mode enabled';
  toast.hidden = false;
  setTimeout(() => toast.hidden = true, 1500);
});
