document.getElementById('mdOpen20').addEventListener('click', () => document.getElementById('mdBackdrop20').hidden = false);
document.querySelectorAll('.choice-card').forEach(c => c.addEventListener('click', () => document.getElementById('mdBackdrop20').hidden = true));
