document.getElementById('mdOpen17').addEventListener('click', function () {
  document.getElementById('mdBackdrop17').hidden = false;
  document.getElementById('mdPage17').classList.add('blurred');
});
document.getElementById('mdClose17').addEventListener('click', function () {
  document.getElementById('mdBackdrop17').hidden = true;
  document.getElementById('mdPage17').classList.remove('blurred');
});
