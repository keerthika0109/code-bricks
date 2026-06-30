const grid = document.getElementById('confirmDpGrid');
let picked = null;
for (let i = 1; i <= 21; i++) {
  const d = document.createElement('div');
  d.textContent = i;
  d.addEventListener('click', () => {
    Array.from(grid.children).forEach((c) => c.classList.remove('confirm-picked'));
    d.classList.add('confirm-picked');
    picked = i;
  });
  grid.appendChild(d);
}
document.getElementById('confirmDpInput').addEventListener('click', () => document.getElementById('confirmDpPopup').hidden = false);
document.getElementById('confirmDpCancel').addEventListener('click', () => document.getElementById('confirmDpPopup').hidden = true);
document.getElementById('confirmDpApply').addEventListener('click', () => {
  if (picked) document.getElementById('confirmDpInput').value = `June ${picked}, 2026`;
  document.getElementById('confirmDpPopup').hidden = true;
});
