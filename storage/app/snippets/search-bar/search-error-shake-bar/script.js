document.querySelector('.shake-search-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const input = document.getElementById('shakeSearchInput');
  if (!input.value.trim()) {
    input.classList.remove('shake-error'); void input.offsetWidth; input.classList.add('shake-error');
  }
});
