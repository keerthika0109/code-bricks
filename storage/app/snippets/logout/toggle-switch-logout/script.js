document.getElementById('tsCheck').addEventListener('change', function (e) {
  document.getElementById('tsStatus').textContent = e.target.checked ? 'Logging out...' : 'Slide to confirm';
});
