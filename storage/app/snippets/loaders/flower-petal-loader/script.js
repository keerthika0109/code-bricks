const container = document.getElementById('petalLd');
for (let i = 0; i < 6; i++) {
  const petal = document.createElement('div');
  petal.className = 'petal';
  petal.style.transform = `translateX(-50%) rotate(${i * 60}deg)`;
  petal.style.opacity = 0.3 + (i / 6) * 0.7;
  container.appendChild(petal);
}
