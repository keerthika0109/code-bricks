document.getElementById('mdOpen27').addEventListener('click', () => document.getElementById('mdBackdrop27').hidden = false);
document.getElementById('mdClose27').addEventListener('click', () => document.getElementById('mdBackdrop27').hidden = true);
document.querySelectorAll('.survey-md-actions button').forEach(b => b.addEventListener('click', () => document.getElementById('mdBackdrop27').hidden = true));
