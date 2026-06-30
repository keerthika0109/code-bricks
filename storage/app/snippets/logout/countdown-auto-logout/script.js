let seconds = 30;
const el = document.getElementById('ctSeconds');
const interval = setInterval(() => {
  seconds--;
  el.textContent = seconds;
  if (seconds <= 0) clearInterval(interval);
}, 1000);
document.getElementById('ctStay').addEventListener('click', () => {
  seconds = 30; el.textContent = seconds;
});
