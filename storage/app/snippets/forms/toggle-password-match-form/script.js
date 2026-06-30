function checkMatch() {
  const pass = document.getElementById('matchPass').value;
  const confirm = document.getElementById('matchConfirm').value;
  const icon = document.getElementById('matchIcon');
  if (!confirm) { icon.textContent = ''; return; }
  icon.textContent = pass === confirm ? '✓' : '✕';
  icon.style.color = pass === confirm ? '#16a34a' : '#dc2626';
}
document.getElementById('matchPass').addEventListener('input', checkMatch);
document.getElementById('matchConfirm').addEventListener('input', checkMatch);
