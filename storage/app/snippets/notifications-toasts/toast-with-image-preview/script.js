document.getElementById('ntBtn18').addEventListener('click', function () {
  const t = document.getElementById('ntThumbToast18');
  t.hidden = false;
  setTimeout(() => t.hidden = true, 3000);
});
