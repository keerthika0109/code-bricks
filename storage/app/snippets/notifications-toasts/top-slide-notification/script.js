document.getElementById('ntBtn3').addEventListener('click', function () {
  const bar = document.getElementById('ntTopBar');
  bar.classList.add('show');
  setTimeout(() => bar.classList.remove('show'), 3000);
});
