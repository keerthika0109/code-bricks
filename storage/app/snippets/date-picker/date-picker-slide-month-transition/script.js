const grid = document.getElementById('slideDpGrid');
for (let i = 1; i <= 21; i++) { const d = document.createElement('div'); d.textContent = i; grid.appendChild(d); }
document.getElementById('slideNext').addEventListener('click', () => { grid.style.transform = 'translateX(-20px)'; setTimeout(() => grid.style.transform = 'translateX(0)', 300); });
document.getElementById('slidePrev').addEventListener('click', () => { grid.style.transform = 'translateX(20px)'; setTimeout(() => grid.style.transform = 'translateX(0)', 300); });
