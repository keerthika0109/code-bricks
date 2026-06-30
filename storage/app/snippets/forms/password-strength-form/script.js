const input = document.getElementById('strInput');
const fill = document.getElementById('strFill');
const label = document.getElementById('strLabel');
input.addEventListener('input', function () {
  const len = input.value.length;
  let pct = 0, color = 'var(--weak)', text = 'Too weak';
  if (len > 10) { pct = 100; color = 'var(--strong)'; text = 'Strong'; }
  else if (len > 5) { pct = 60; color = 'var(--medium)'; text = 'Medium'; }
  else if (len > 0) { pct = 25; color = 'var(--weak)'; text = 'Too weak'; }
  fill.style.width = pct + '%';
  fill.style.background = color;
  label.textContent = text;
});
