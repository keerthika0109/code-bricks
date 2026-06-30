const colors = ['#f43f5e','#f59e0b','#22c55e','#3b82f6','#a855f7'];
document.getElementById('confettiBtn').addEventListener('click', function () {
  for (let i = 0; i < 24; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.background = colors[i % colors.length];
    const angle = Math.random() * Math.PI * 2;
    const dist = 100 + Math.random() * 100;
    piece.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    piece.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
    document.getElementById('confettiArea').appendChild(piece);
    setTimeout(() => piece.remove(), 1000);
  }
});
