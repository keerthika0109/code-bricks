document.getElementById('previewToggle').addEventListener('change', function () {
  document.body.classList.toggle('dark', this.checked);
  document.getElementById('previewSwatch').classList.toggle('is-dark', this.checked);
});
