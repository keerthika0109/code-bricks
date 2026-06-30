document.getElementById('eclipseToggle').addEventListener('click', function () {
  this.classList.toggle('active');
  document.body.classList.toggle('dark', this.classList.contains('active'));
});
