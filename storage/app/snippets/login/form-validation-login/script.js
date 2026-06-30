const emailInput = document.getElementById('valEmail');
const passInput = document.getElementById('valPass');
emailInput.addEventListener('input', function () {
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
  emailInput.classList.toggle('valid', valid);
  emailInput.classList.toggle('invalid', !valid && emailInput.value.length > 0);
  document.getElementById('emailError').hidden = valid || emailInput.value.length === 0;
});
passInput.addEventListener('input', function () {
  const valid = passInput.value.length >= 6;
  passInput.classList.toggle('valid', valid);
  passInput.classList.toggle('invalid', !valid && passInput.value.length > 0);
  document.getElementById('passError').hidden = valid || passInput.value.length === 0;
});
