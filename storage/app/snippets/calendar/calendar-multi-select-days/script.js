const grid = document.getElementById('multiSelGrid');
for (let i = 1; i <= 21; i++) {
  const d = document.createElement('div');
  d.textContent = i;
  d.addEventListener('click', () => d.classList.toggle('selected'));
  grid.appendChild(d);
}
