document.getElementById('ntBtn8').addEventListener('click', function () {
  const t = document.getElementById('ntPulseToast8');
  t.hidden = false;
  setTimeout(() => t.hidden = true, 3000);
});
