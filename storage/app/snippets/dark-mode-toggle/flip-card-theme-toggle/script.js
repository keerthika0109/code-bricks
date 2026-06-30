document.getElementById('flipThemeCard').addEventListener('click', function () {
  this.classList.toggle('flipped');
  document.body.classList.toggle('dark', this.classList.contains('flipped'));
});
