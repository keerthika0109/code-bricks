let offset = 0;
const ring = document.getElementById('cpRing');
const interval = setInterval(() => {
  offset += 264 / 10;
  ring.style.strokeDashoffset = offset;
  if (offset >= 264) clearInterval(interval);
}, 1000);
document.getElementById('cpCancel').addEventListener('click', () => clearInterval(interval));
