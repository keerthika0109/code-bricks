const input = document.getElementById('clearDpInput');
const btn = document.getElementById('clearDpBtn');
input.addEventListener('change', () => btn.hidden = !input.value);
btn.addEventListener('click', () => { input.value = ''; btn.hidden = true; });
