document.getElementById('toastTrigger').addEventListener('click', function () {
  const toast = document.getElementById('toastSlide');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
});
