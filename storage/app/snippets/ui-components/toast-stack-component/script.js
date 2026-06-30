document.getElementById('addToastBtn').addEventListener('click', function () {
  const toast = document.createElement('div');
  toast.className = 'stack-toast';
  toast.textContent = '✓ Action completed';
  document.getElementById('toastStack').appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
});
