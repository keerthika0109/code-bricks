const el = document.getElementById('counterNum');
let count = 0;
const target = 600;
const step = Math.ceil(target / 60);
const interval = setInterval(() => {
  count += step;
  if (count >= target) { count = target; clearInterval(interval); }
  el.textContent = count + '+';
}, 30);
