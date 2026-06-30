document.getElementById('mdOpen23').addEventListener('click', () => document.getElementById('mdBackdrop23').hidden = false);
document.getElementById('mdClose23').addEventListener('click', () => document.getElementById('mdBackdrop23').hidden = true);
let total = 600;
setInterval(() => {
  total = total > 0 ? total - 1 : 600;
  const m = String(Math.floor(total / 60)).padStart(2,'0');
  const s = String(total % 60).padStart(2,'0');
  document.getElementById('promoTimer').textContent = `${m}:${s}`;
}, 1000);
