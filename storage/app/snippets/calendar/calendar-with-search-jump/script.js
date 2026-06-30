const grid = document.getElementById('jumpGrid');
for (let i = 1; i <= 30; i++) {
  const d = document.createElement('div');
  d.textContent = i;
  d.style.padding = '6px 0';
  grid.appendChild(d);
}
document.getElementById('jumpBtn').addEventListener('click', function () {
  const val = parseInt(document.getElementById('jumpInput').value);
  Array.from(grid.children).forEach((c) => c.classList.remove('jumped'));
  if (val >= 1 && val <= 30) { grid.children[val - 1].classList.add('jumped'); }
});
