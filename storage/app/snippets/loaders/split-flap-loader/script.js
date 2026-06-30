let n = 0;
setInterval(() => {
  n = (n + 1) % 10;
  document.getElementById('flapLd').textContent = n;
}, 250);
