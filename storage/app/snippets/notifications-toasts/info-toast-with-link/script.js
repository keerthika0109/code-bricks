document.getElementById('ntBtn9').addEventListener('click', function () {
  const t = document.getElementById('ntInfoToast9');
  t.hidden = false;
  setTimeout(() => t.hidden = true, 4000);
});
