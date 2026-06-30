let dots = 0;
setInterval(() => {
  dots = (dots + 1) % 4;
  document.getElementById('textDots').textContent = '.'.repeat(dots);
}, 400);
