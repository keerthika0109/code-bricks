document.getElementById('mdOpen11').addEventListener('click', () => document.getElementById('mdBackdrop11').hidden = false);
let startY = 0, dragging = false;
const box = document.getElementById('dragBox');
document.getElementById('dragHandle').addEventListener('mousedown', (e) => { dragging = true; startY = e.clientY; });
document.addEventListener('mousemove', (e) => {
  if (!dragging) return;
  const diff = Math.max(0, e.clientY - startY);
  box.style.transform = `translateY(${diff}px)`;
});
document.addEventListener('mouseup', (e) => {
  if (!dragging) return;
  dragging = false;
  if (e.clientY - startY > 80) { document.getElementById('mdBackdrop11').hidden = true; }
  box.style.transform = 'translateY(0)';
});
