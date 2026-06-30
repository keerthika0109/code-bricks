document.getElementById('ntBtn30').addEventListener('click', function () {
  const t = document.getElementById('ntMinimalToast30');
  t.hidden = false;
  setTimeout(() => t.hidden = true, 1800);
});
