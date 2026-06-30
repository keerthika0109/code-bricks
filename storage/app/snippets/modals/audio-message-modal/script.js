document.getElementById('mdOpen29').addEventListener('click', function () {
  document.getElementById('mdBackdrop29').hidden = false;
  let sec = 0;
  this.timerInterval = setInterval(() => {
    sec++;
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    document.getElementById('voiceTimer').textContent = `${m}:${s}`;
  }, 1000);
});
document.getElementById('mdClose29').addEventListener('click', () => document.getElementById('mdBackdrop29').hidden = true);
