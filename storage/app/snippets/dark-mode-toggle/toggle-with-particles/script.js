document.getElementById('particleToggleBtn').addEventListener('click', function () {
  document.body.classList.toggle('dark');
  this.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  const rect = this.getBoundingClientRect();
  for (let i = 0; i < 10; i++) {
    const p = document.createElement('div');
    p.className = 'toggle-particle';
    const angle = Math.random() * Math.PI * 2;
    const dist = 30 + Math.random() * 30;
    p.style.setProperty('--px', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--py', Math.sin(angle) * dist + 'px');
    p.style.left = (rect.left + rect.width / 2) + 'px';
    p.style.top = (rect.top + rect.height / 2) + 'px';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 700);
  }
});
