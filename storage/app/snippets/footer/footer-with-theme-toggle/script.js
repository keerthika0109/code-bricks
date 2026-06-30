document.getElementById('ftThemeBtn25').addEventListener('click', function () {
  const wrap = document.getElementById('ftThemeWrap25');
  wrap.classList.toggle('dark');
  this.textContent = wrap.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';
});
