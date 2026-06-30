const themeToggle = document.getElementById('themeToggle');
const themeWrap = document.getElementById('themeWrap');
themeToggle.addEventListener('click', function () {
  themeWrap.classList.toggle('dark');
  themeToggle.textContent = themeWrap.classList.contains('dark') ? '☀️' : '🌙';
});
