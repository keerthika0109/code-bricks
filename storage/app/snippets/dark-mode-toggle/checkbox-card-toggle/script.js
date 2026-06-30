document.getElementById('lightCard').addEventListener('click', function () {
  document.body.classList.remove('dark');
  this.classList.add('active');
  document.getElementById('darkCard').classList.remove('active');
});
document.getElementById('darkCard').addEventListener('click', function () {
  document.body.classList.add('dark');
  this.classList.add('active');
  document.getElementById('lightCard').classList.remove('active');
});
