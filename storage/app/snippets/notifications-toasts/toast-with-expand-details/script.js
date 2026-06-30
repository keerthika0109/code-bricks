document.getElementById('ntBtn26').addEventListener('click', () => document.getElementById('ntExpandToast26').hidden = false);
document.querySelector('.nt-expand-header').addEventListener('click', function () {
  const body = this.nextElementSibling;
  body.hidden = !body.hidden;
});
