let dark = false;
document.getElementById('celebrateToggle').addEventListener('click', function (e) {
  dark = !dark;
  document.body.classList.toggle('dark', dark);
  this.textContent = dark ? '☀️' : '🌙';
  if (!dark) {
    for (let i = 0; i < 6; i++) {
      const s = document.createElement('span');
      s.className = 'celebrate-spark';
      s.textContent = '✨';
      s.style.left = (e.clientX + (Math.random() * 40 - 20)) + 'px';
      s.style.top = e.clientY + 'px';
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 800);
    }
  }
});
