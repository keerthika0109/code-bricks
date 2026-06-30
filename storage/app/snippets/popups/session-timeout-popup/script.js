document.getElementById('ppOpen13').addEventListener('click', () => document.getElementById('ppBackdrop13').hidden = false);
document.querySelectorAll('.timeout-pp-box button').forEach(b => b.addEventListener('click', () => document.getElementById('ppBackdrop13').hidden = true));
