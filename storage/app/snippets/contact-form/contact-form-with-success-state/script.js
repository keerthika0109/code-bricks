document.getElementById('cfSuccessForm').addEventListener('submit', function (e) {
  e.preventDefault();
  this.hidden = true;
  document.getElementById('cfSuccessMsg').hidden = false;
});
