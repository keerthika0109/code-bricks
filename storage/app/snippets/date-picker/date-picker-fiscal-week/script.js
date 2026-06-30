const grid = document.getElementById('weekSelGrid');
const days = Array.from({length: 28}, (_, i) => i + 1);
days.forEach((day, i) => {
  const d = document.createElement('div');
  d.textContent = day;
  const weekStart = Math.floor(i / 7) * 7;
  d.addEventListener('mouseenter', () => {
    Array.from(grid.children).forEach((c, idx) => c.classList.toggle('week-hover', idx >= weekStart && idx < weekStart + 7));
  });
  d.addEventListener('mouseleave', () => Array.from(grid.children).forEach((c) => c.classList.remove('week-hover')));
  grid.appendChild(d);
});
