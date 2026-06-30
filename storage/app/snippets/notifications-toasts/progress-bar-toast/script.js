document.getElementById('ntBtn5').addEventListener('click', function () {
  const toast = document.getElementById('ntProgToast5');
  const fill = document.getElementById('ntProgFill5');
  toast.hidden = false;
  fill.style.width = '100%';
  setTimeout(() => fill.style.width = '0%', 50);
  setTimeout(() => toast.hidden = true, 3000);
});
