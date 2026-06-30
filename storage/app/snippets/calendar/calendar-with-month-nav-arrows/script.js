const months = ['May 2026', 'June 2026', 'July 2026'];
let idx = 1;
document.getElementById('navPrev').addEventListener('click', () => { idx = Math.max(0, idx - 1); document.getElementById('navMonthLabel').textContent = months[idx]; });
document.getElementById('navNext').addEventListener('click', () => { idx = Math.min(2, idx + 1); document.getElementById('navMonthLabel').textContent = months[idx]; });
