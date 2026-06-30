const card = document.getElementById('swipeCard');
let startX = 0, dragging = false;
card.addEventListener('mousedown', (e) => { dragging = true; startX = e.clientX; });
document.addEventListener('mousemove', (e) => { if (dragging) { const dx = e.clientX - startX; card.style.transform = `translateX(${dx}px) rotate(${dx / 10}deg)`; } });
document.addEventListener('mouseup', (e) => {
  if (!dragging) return;
  dragging = false;
  const dx = e.clientX - startX;
  if (Math.abs(dx) > 80) { card.style.transform = `translateX(${dx * 3}px) rotate(${dx}deg)`; card.style.opacity = '0'; }
  else { card.style.transform = 'translateX(0) rotate(0)'; }
});
