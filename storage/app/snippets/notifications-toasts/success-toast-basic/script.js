document.getElementById('ntBtn1').addEventListener('click', function () {
  const t = document.getElementById('ntToast1');
  t.hidden = false;
  setTimeout(() => t.hidden = true, 2500);
});
