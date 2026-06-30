document.getElementById('ntBtn12').addEventListener('click', function () {
  const t = document.getElementById('ntGlassToast12');
  t.hidden = false;
  setTimeout(() => t.hidden = true, 2500);
});
