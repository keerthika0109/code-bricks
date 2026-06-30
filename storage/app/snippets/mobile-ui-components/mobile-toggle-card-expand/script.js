document.querySelector('.mec-header').addEventListener('click', function () {
  const body = this.nextElementSibling;
  body.hidden = !body.hidden;
});
