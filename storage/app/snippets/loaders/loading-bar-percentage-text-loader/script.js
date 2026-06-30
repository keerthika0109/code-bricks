let pct = 0;
const fill = document.getElementById('inlineFill');
setInterval(() => {
  pct = pct < 100 ? pct + 4 : 0;
  fill.style.width = pct + '%';
  fill.textContent = pct + '%';
}, 200);
