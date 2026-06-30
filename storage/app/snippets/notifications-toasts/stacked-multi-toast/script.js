let count = 0;
document.getElementById('ntBtn4').addEventListener('click', function () {
  count++;
  const toast = document.createElement('div');
  toast.className = 'nt-stack-item';
  toast.textContent = `Notification #${count}`;
  document.getElementById('ntStack4').appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
});
