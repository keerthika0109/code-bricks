document.getElementById('mpcHeart').addEventListener('click', function () {
  this.classList.toggle('liked');
  this.textContent = this.classList.contains('liked') ? '♥' : '♡';
});
