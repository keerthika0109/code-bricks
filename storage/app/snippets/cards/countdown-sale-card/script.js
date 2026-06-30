let total = 86399;
const el = document.getElementById('saleTimer');
setInterval(() => {
  total = total > 0 ? total - 1 : 86399;
  const h = String(Math.floor(total / 3600)).padStart(2, '0');
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
  const s = String(total % 60).padStart(2, '0');
  el.textContent = `${h}:${m}:${s}`;
}, 1000);
