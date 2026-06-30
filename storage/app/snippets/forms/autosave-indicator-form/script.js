let timeout;
document.getElementById('autosaveText').addEventListener('input', function () {
  document.getElementById('autosaveStatus').textContent = 'Saving...';
  clearTimeout(timeout);
  timeout = setTimeout(() => { document.getElementById('autosaveStatus').textContent = 'Saved'; }, 1000);
});
