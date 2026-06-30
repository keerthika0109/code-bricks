document.getElementById('ntBtn21').addEventListener('click', function () {
  document.getElementById('ntSwipeToast21').hidden = false;
});
const toast = document.getElementById('ntSwipeToast21');
let startX = 0, dragging = false;
toast.addEventListener('mousedown', (e) => { dragging = true; startX = e.clientX; });
document.addEventListener('mousemove', (e) => { if (dragging) toast.style.transform = `translateX(${e.clientX - startX}px)`; });
document.addEventListener('mouseup', (e) => {
  if (!dragging) return;
  dragging = false;
  if (Math.abs(e.clientX - startX) > 60) { toast.style.opacity = '0'; setTimeout(() => toast.hidden = true, 200); }
  else { toast.style.transform = 'translateX(0)'; }
});
