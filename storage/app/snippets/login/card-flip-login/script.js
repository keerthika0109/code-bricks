document.getElementById('toSignup').addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('flipCard').classList.add('flipped');
});
document.getElementById('toLogin').addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('flipCard').classList.remove('flipped');
});
