document.getElementById('codeExpandBtn').addEventListener('click', function () {
  const block = document.getElementById('codeBlock');
  block.classList.toggle('expanded');
  this.textContent = block.classList.contains('expanded') ? 'Show less' : 'Show more';
});
