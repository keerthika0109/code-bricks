document.getElementById('ppOpen20').addEventListener('click', function () {
  const n = document.getElementById('browserNotif20');
  n.hidden = false;
  setTimeout(() => n.hidden = true, 3500);
});
