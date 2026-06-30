const grid = document.getElementById('todayBtnGrid');
for (let i = 1; i <= 21; i++) { const d = document.createElement('div'); d.textContent = i; d.style.padding = '6px 0'; grid.appendChild(d); }
document.getElementById('todayJumpBtn').addEventListener('click', function () {
  Array.from(grid.children).forEach((c) => c.classList.remove('today-marked'));
  grid.children[13].classList.add('today-marked');
});
