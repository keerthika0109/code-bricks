document.querySelectorAll('.view-opt').forEach((opt) => {
  opt.addEventListener('click', function () {
    document.querySelectorAll('.view-opt').forEach((o) => o.classList.remove('active'));
    this.classList.add('active');
  });
});
