let pct = 0;
const circle = document.getElementById('pctCircle');
const text = document.getElementById('pctText');
const interval = setInterval(() => {
  pct = pct < 100 ? pct + 2 : 0;
  circle.style.strokeDashoffset = 213 - (213 * pct / 100);
  text.textContent = pct + '%';
}, 60);
