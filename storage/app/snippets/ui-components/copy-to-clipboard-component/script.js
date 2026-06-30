document.getElementById('copyFieldBtn').addEventListener('click', function () {
  document.getElementById('copyFieldInput').select();
  this.textContent = 'Copied!';
  setTimeout(() => this.textContent = 'Copy', 1500);
});
