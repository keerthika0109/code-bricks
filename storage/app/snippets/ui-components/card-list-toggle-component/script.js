document.querySelectorAll('.sel-card').forEach((card) => {
  card.addEventListener('click', function () {
    document.querySelectorAll('.sel-card').forEach((c) => c.classList.remove('active'));
    this.classList.add('active');
  });
});
