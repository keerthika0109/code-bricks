document.querySelectorAll('#rateStars span').forEach((star) => {
  star.addEventListener('click', function () {
    const val = parseInt(star.dataset.val);
    document.querySelectorAll('#rateStars span').forEach((s, i) => {
      s.classList.toggle('active', i < val);
    });
  });
});
