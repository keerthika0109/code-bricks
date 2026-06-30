document.getElementById('newsForm').addEventListener('submit', function (e) {
  e.preventDefault();
  document.getElementById('newsForm').hidden = true;
  document.getElementById('newsSuccess').hidden = false;
});
