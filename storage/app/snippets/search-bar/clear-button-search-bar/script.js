const input = document.getElementById('clearInput');
const btn = document.getElementById('clearBtn');
input.addEventListener('input', () => btn.hidden = input.value.length === 0);
btn.addEventListener('click', () => { input.value = ''; btn.hidden = true; input.focus(); });
