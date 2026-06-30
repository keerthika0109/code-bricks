const grid = document.getElementById('noteCalGrid');
for (let i = 1; i <= 14; i++) {
  const d = document.createElement('div');
  d.textContent = i;
  d.addEventListener('click', () => document.getElementById('notePopover').hidden = false);
  grid.appendChild(d);
}
