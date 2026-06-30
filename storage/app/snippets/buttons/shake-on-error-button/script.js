const shakeBtn = document.getElementById('shakeBtn');
shakeBtn.addEventListener('click', function () {
  shakeBtn.classList.remove('shake');
  void shakeBtn.offsetWidth;
  shakeBtn.classList.add('shake');
});
