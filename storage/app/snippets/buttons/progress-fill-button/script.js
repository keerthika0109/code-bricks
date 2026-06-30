const progBtn = document.getElementById('progBtn');
const fill = document.getElementById('progFill');
let holding = false;
progBtn.addEventListener('mousedown', () => { holding = true; fill.style.width = '100%'; });
progBtn.addEventListener('mouseup', () => { if (fill.style.width !== '100%') { fill.style.width = '0%'; } holding = false; });
progBtn.addEventListener('mouseleave', () => { if (holding) { fill.style.width = '0%'; holding = false; } });
