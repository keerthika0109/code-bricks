document.getElementById('ntBtn17').addEventListener('click', function () {
  const toast = document.getElementById('ntGroupedToast17');
  toast.textContent = '🔔 3 new notifications';
  toast.hidden = false;
  setTimeout(() => toast.hidden = true, 2500);
});
