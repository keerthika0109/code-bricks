const grid = document.getElementById('darkDpGrid');
for (let i = 1; i <= 21; i++) { const d = document.createElement('div'); d.textContent = i; grid.appendChild(d); }
document.getElementById('darkDpInput').addEventListener('click', () => grid.hidden = !grid.hidden);
