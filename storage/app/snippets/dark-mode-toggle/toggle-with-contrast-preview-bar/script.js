document.getElementById('contrastToggle').addEventListener('change', function () {
  document.body.classList.toggle('dark', this.checked);
  document.getElementById('contrastBar').classList.toggle('dark-bar', this.checked);
});
