document.getElementById('cfValidEmail').addEventListener('input', function () {
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
  this.classList.toggle('valid', valid);
  this.classList.toggle('invalid', !valid && this.value.length > 0);
  document.getElementById('cfValidError').hidden = valid || this.value.length === 0;
});
