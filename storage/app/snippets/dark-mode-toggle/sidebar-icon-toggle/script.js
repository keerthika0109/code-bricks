document.getElementById('sidebarToggleItem').addEventListener('click', function () {
  document.body.classList.toggle('dark');
  this.querySelector('.sidebar-toggle-icon').textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});
