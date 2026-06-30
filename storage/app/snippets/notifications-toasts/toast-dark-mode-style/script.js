document.getElementById('ntBtn20').addEventListener('click', function () {
  const t = document.getElementById('ntDarkToast20');
  t.hidden = false;
  setTimeout(() => t.hidden = true, 2500);
});
