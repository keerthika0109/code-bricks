document.getElementById('ppOpen18').addEventListener('click', () => document.getElementById('ppBackdrop18').hidden = false);
document.querySelectorAll('.loc-pp-box button').forEach(b => b.addEventListener('click', () => document.getElementById('ppBackdrop18').hidden = true));
