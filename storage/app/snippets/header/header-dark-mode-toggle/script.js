document.getElementById('hdDmToggle10').addEventListener('click', function () {
  document.getElementById('hdDmWrap10').classList.toggle('dark');
  this.textContent = document.getElementById('hdDmWrap10').classList.contains('dark') ? '☀️' : '🌙';
});
