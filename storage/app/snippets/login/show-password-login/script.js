const pwInput = document.getElementById('pwInput');
const pwToggle = document.getElementById('pwToggle');
pwToggle.addEventListener('click', function () {
  const isPassword = pwInput.type === 'password';
  pwInput.type = isPassword ? 'text' : 'password';
  pwToggle.textContent = isPassword ? 'Hide' : 'Show';
});
