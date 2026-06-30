const grid = document.getElementById('kbNavGrid');
let focusIdx = 0;
for (let i = 1; i <= 21; i++) { const d = document.createElement('div'); d.textContent = i; grid.appendChild(d); }
grid.children[0].classList.add('kb-focus');
grid.addEventListener('keydown', function (e) {
  grid.children[focusIdx].classList.remove('kb-focus');
  if (e.key === 'ArrowRight') focusIdx = Math.min(20, focusIdx + 1);
  if (e.key === 'ArrowLeft') focusIdx = Math.max(0, focusIdx - 1);
  if (e.key === 'ArrowDown') focusIdx = Math.min(20, focusIdx + 7);
  if (e.key === 'ArrowUp') focusIdx = Math.max(0, focusIdx - 7);
  grid.children[focusIdx].classList.add('kb-focus');
});
