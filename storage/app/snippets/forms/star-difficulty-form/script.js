document.querySelectorAll('.diff-opt').forEach((btn) => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.diff-opt').forEach((b) => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});
