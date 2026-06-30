const canvas = document.getElementById('sigCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
canvas.addEventListener('mousedown', (e) => { drawing = true; ctx.beginPath(); ctx.moveTo(e.offsetX, e.offsetY); });
canvas.addEventListener('mousemove', (e) => { if (drawing) { ctx.lineTo(e.offsetX, e.offsetY); ctx.stroke(); } });
canvas.addEventListener('mouseup', () => drawing = false);
document.getElementById('sigClear').addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));
