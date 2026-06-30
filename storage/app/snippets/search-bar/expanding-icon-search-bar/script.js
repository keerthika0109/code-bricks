document.getElementById('expandBtn').addEventListener('click', function () {
  const wrap = document.getElementById('expandSearch');
  wrap.classList.toggle('open');
  if (wrap.classList.contains('open')) document.getElementById('expandInput').focus();
});
