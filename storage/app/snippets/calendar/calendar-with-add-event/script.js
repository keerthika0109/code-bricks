const grid = document.getElementById('addEventGrid');
for (let i = 1; i <= 14; i++) {
  const d = document.createElement('div');
  d.textContent = i;
  d.addEventListener('click', () => document.getElementById('addEventForm').hidden = false);
  grid.appendChild(d);
}
