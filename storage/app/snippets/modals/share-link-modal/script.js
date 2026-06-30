document.getElementById('mdOpen15').addEventListener('click', () => document.getElementById('mdBackdrop15').hidden = false);
document.getElementById('mdClose15').addEventListener('click', () => document.getElementById('mdBackdrop15').hidden = true);
document.getElementById('shareCopyBtn').addEventListener('click', function () {
  document.getElementById('shareLinkInput').select();
  this.textContent = 'Copied!';
  setTimeout(() => this.textContent = 'Copy', 1500);
});
