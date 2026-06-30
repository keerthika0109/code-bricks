const card = document.getElementById('tiltCard');
card.addEventListener('mousemove', function (e) {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const rotateX = ((y / rect.height) - 0.5) * -20;
  const rotateY = ((x / rect.width) - 0.5) * 20;
  card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});
card.addEventListener('mouseleave', function () { card.style.transform = 'perspective(600px) rotateX(0) rotateY(0)'; });
