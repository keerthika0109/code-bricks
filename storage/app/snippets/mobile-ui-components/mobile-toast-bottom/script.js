document.getElementById('mobToastBtn').addEventListener('click', function () {
  const toast = document.getElementById('mobToast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
});
