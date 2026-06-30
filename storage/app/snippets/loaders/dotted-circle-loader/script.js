const container = document.getElementById('dotCircle');
const total = 8;
for (let i = 0; i < total; i++) {
  const angle = (i / total) * 2 * Math.PI;
  const x = 20 * Math.cos(angle);
  const y = 20 * Math.sin(angle);
  const dot = document.createElement('div');
  dot.className = 'circle-dot';
  dot.style.transform = `translate(${x}px, ${y}px)`;
  dot.style.animationDelay = (i / total) + 's';
  container.appendChild(dot);
}
