document.getElementById('ntBtn24').addEventListener('click', function () {
  const t = document.getElementById('ntAchieveToast24');
  t.hidden = false;
  setTimeout(() => t.hidden = true, 3000);
});
