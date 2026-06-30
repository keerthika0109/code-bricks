function openCmd() { document.getElementById('cmdBackdrop').hidden = false; }
document.getElementById('cmdTrigger').addEventListener('click', openCmd);
document.addEventListener('keydown', function (e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openCmd(); }
  if (e.key === 'Escape') { document.getElementById('cmdBackdrop').hidden = true; }
});
