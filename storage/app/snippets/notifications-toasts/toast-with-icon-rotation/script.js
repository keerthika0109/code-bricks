document.getElementById('ntBtn15').addEventListener('click', function () {
  const t = document.getElementById('ntRotToast15');
  t.hidden = false;
  setTimeout(() => t.hidden = true, 2500);
});
