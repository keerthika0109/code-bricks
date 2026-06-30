const input = document.getElementById('tcInput');
const btn = document.getElementById('tcBtn');
input.addEventListener('input', function () {
  btn.disabled = input.value.trim().toUpperCase() !== 'LOGOUT';
});
