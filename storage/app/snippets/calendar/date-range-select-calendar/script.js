const grid = document.getElementById('rangeCalGrid');
let start = null, end = null;
for (let i = 1; i <= 30; i++) {
  const d = document.createElement('div');
  d.textContent = i;
  d.addEventListener('click', function () {
    if (!start || (start && end)) { start = i; end = null; }
    else { end = i; if (end < start) [start, end] = [end, start]; }
    Array.from(grid.children).forEach((c, idx) => {
      const day = idx + 1;
      c.classList.toggle('selected', day === start || day === end);
      c.classList.toggle('in-range', end && day > start && day < end);
    });
  });
  grid.appendChild(d);
}
