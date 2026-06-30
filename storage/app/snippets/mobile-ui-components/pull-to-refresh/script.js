document.getElementById('refreshTrigger').addEventListener('click', function () {
  const ind = document.getElementById('refreshIndicator');
  ind.classList.add('spinning');
  setTimeout(() => ind.classList.remove('spinning'), 1200);
});
