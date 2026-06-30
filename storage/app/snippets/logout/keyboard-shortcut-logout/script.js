document.addEventListener('keydown', function (e) {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'q') {
    document.getElementById('kbHint').hidden = false;
  }
});
document.getElementById('kbBtn').addEventListener('click', function () {
  document.getElementById('kbHint').hidden = false;
});
