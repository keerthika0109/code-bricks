document.querySelectorAll('.ms-opt').forEach((opt) => {
  opt.addEventListener('click', function () {
    document.querySelectorAll('.ms-opt').forEach((o) => o.classList.remove('active'));
    this.classList.add('active');
    document.getElementById('msPill').style.transform = `translateX(${this.dataset.i * 100}%)`;
  });
});
