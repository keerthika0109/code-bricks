const grid = document.getElementById('fadeDpGrid');
for (let i = 1; i <= 21; i++) { const d = document.createElement('div'); d.textContent = i; grid.appendChild(d); }
document.getElementById('fadeDpInput').addEventListener('click', function () {
  document.getElementById('fadeDpPopup').hidden = false;
});
