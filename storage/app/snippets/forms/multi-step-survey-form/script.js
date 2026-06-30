let current = 1;
const pages = document.querySelectorAll('.multi-page');
const steps = document.querySelectorAll('.step');
function show(n) {
  pages.forEach(p => p.hidden = parseInt(p.dataset.page) !== n);
  steps.forEach((s, i) => s.classList.toggle('active', i < n));
  document.getElementById('multiBack').hidden = n === 1;
  document.getElementById('multiNext').hidden = n === 3;
}
document.getElementById('multiNext').addEventListener('click', () => { if (current < 3) { current++; show(current); } });
document.getElementById('multiBack').addEventListener('click', () => { if (current > 1) { current--; show(current); } });
