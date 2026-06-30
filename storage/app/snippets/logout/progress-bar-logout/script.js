let pct = 0;
const fill = document.getElementById('pbFill');
const status = document.getElementById('pbStatus');
const steps = ['Clearing session data', 'Removing cached tokens', 'Done!'];
const interval = setInterval(() => {
  pct += 20;
  fill.style.width = pct + '%';
  if (pct === 40) status.textContent = steps[1];
  if (pct >= 100) { status.textContent = steps[2]; clearInterval(interval); }
}, 400);
