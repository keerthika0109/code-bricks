document.getElementById('mdOpen19').addEventListener('click', () => document.getElementById('mdBackdrop19').hidden = false);
document.getElementById('mdClose19').addEventListener('click', () => document.getElementById('mdBackdrop19').hidden = true);
document.querySelectorAll('#rateMdStars span').forEach((star, i, all) => {
  star.addEventListener('click', () => all.forEach((s, j) => s.classList.toggle('active', j <= i)));
});
