document.getElementById('eyeToggle').addEventListener('click', function () {
  this.classList.toggle('closed');
  document.body.classList.toggle('dark', this.classList.contains('closed'));
});
