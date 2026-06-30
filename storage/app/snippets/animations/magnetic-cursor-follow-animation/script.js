const area = document.getElementById('cursorArea');
const dot = document.getElementById('cursorDot');
area.addEventListener('mousemove', function (e) {
  dot.style.left = e.clientX + 'px';
  dot.style.top = e.clientY + 'px';
});
