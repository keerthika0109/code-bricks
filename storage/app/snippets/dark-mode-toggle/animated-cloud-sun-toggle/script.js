document.getElementById('sceneToggle').addEventListener('click', function () {
  this.classList.toggle('night');
  document.body.classList.toggle('dark', this.classList.contains('night'));
});
