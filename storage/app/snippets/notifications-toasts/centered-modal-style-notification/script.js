document.getElementById('ntBtn10').addEventListener('click', function () {
  const n = document.getElementById('ntCenterNotice10');
  n.hidden = false;
  setTimeout(() => n.hidden = true, 2000);
});
