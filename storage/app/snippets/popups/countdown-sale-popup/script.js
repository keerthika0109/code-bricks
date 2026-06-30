document.getElementById('ppOpen10').addEventListener('click', () => document.getElementById('ppBackdrop10').hidden = false);
document.getElementById('ppClose10').addEventListener('click', () => document.getElementById('ppBackdrop10').hidden = true);
let total = 86399;
setInterval(() => {
  total = total > 0 ? total - 1 : 86399;
  const h = String(Math.floor(total/3600)).padStart(2,'0');
  const m = String(Math.floor((total%3600)/60)).padStart(2,'0');
  const s = String(total%60).padStart(2,'0');
  document.getElementById('salePpTimer').textContent = `${h}:${m}:${s}`;
}, 1000);
