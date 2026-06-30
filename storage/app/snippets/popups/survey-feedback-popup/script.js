document.getElementById('ppOpen7').addEventListener('click', () => document.getElementById('ppBackdrop7').hidden = false);
document.getElementById('ppClose7').addEventListener('click', () => document.getElementById('ppBackdrop7').hidden = true);
document.querySelectorAll('.survey-pp-opts button').forEach(b => b.addEventListener('click', () => document.getElementById('ppBackdrop7').hidden = true));
