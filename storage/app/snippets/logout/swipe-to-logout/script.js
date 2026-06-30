const thumb = document.getElementById('swThumb');
const track = document.getElementById('swTrack');
const fill = document.getElementById('swFill');
let dragging = false;
thumb.addEventListener('mousedown', () => dragging = true);
document.addEventListener('mouseup', () => dragging = false);
document.addEventListener('mousemove', (e) => {
  if (!dragging) return;
  const rect = track.getBoundingClientRect();
  let x = Math.max(4, Math.min(e.clientX - rect.left - 23, rect.width - 50));
  thumb.style.left = x + 'px';
  fill.style.width = (x + 25) + 'px';
  if (x > rect.width - 60) { thumb.textContent = '✓'; }
});
