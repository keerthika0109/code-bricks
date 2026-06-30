const input = document.getElementById('ddDateInput');
const popup = document.getElementById('ddCalPopup');
const grid = document.getElementById('ddCalGrid');
for (let i = 1; i <= 30; i++) {
  const d = document.createElement('div');
  d.textContent = i;
  d.addEventListener('click', () => { input.value = `2026-06-${String(i).padStart(2,'0')}`; popup.hidden = true; });
  grid.appendChild(d);
}
input.addEventListener('click', () => popup.hidden = !popup.hidden);
