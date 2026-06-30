const details = document.getElementById('expDetails');
const btn = document.getElementById('expToggle');
btn.addEventListener('click', function () {
  if (details.style.maxHeight) { details.style.maxHeight = null; btn.textContent = 'Show Details'; }
  else { details.style.maxHeight = details.scrollHeight + 'px'; btn.textContent = 'Hide Details'; }
});
