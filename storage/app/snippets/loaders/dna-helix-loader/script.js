const container = document.getElementById('dnaLd');
for (let i = 0; i < 10; i++) {
  const dot = document.createElement('div');
  dot.className = 'dna-dot';
  dot.style.animationDelay = (i * 0.1) + 's';
  container.appendChild(dot);
}
