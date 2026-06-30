const grid = document.getElementById('dragSelGrid');
let dragging = false;
for (let i = 1; i <= 21; i++) {
  const d = document.createElement('div');
  d.textContent = i;
  d.addEventListener('mousedown', () => { dragging = true; d.classList.toggle('selected'); });
  d.addEventListener('mouseenter', () => { if (dragging) d.classList.add('selected'); });
  grid.appendChild(d);
}
document.addEventListener('mouseup', () => dragging = false);
