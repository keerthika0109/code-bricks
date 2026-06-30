document.getElementById('ftAccHeader12').addEventListener('click', function () {
  const body = this.nextElementSibling;
  body.hidden = !body.hidden;
  this.querySelector('span').textContent = body.hidden ? '+' : '−';
});
