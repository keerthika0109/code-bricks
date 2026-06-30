document.querySelectorAll('.hd-underline-nav a').forEach((link, i) => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelectorAll('.hd-underline-nav a').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    document.getElementById('hdUnderlineBar24').style.transform = `translateX(${i * 70}px)`;
  });
});
