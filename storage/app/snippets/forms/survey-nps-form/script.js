const scale = document.getElementById('npsScale');
for (let i = 0; i <= 10; i++) {
  const btn = document.createElement('div');
  btn.className = 'nps-num';
  btn.textContent = i;
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nps-num').forEach((b) => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
  scale.appendChild(btn);
}
