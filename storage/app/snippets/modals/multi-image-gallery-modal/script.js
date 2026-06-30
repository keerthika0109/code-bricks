const images = ['linear-gradient(135deg,#f59e0b,#ef4444)', 'linear-gradient(135deg,#6366f1,#ec4899)', 'linear-gradient(135deg,#16a34a,#0ea5e9)'];
let idx = 0;
function render() {
  document.getElementById('galImg').style.background = images[idx];
  document.getElementById('galCount').textContent = `${idx + 1} / ${images.length}`;
}
document.getElementById('mdOpen8').addEventListener('click', () => { document.getElementById('mdBackdrop8').hidden = false; render(); });
document.getElementById('mdClose8').addEventListener('click', () => document.getElementById('mdBackdrop8').hidden = true);
document.getElementById('galNext').addEventListener('click', () => { idx = (idx + 1) % images.length; render(); });
document.getElementById('galPrev').addEventListener('click', () => { idx = (idx - 1 + images.length) % images.length; render(); });
