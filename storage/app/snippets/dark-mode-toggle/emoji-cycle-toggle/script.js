const modes = [['☀️ Light', false], ['🌙 Dark', true], ['🖥️ System', false]];
let idx = 0;
document.getElementById('cycleThemeBtn').addEventListener('click', function () {
  idx = (idx + 1) % modes.length;
  this.textContent = modes[idx][0];
  document.body.classList.toggle('dark', modes[idx][1]);
});
