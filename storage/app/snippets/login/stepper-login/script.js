document.getElementById('nextStep').addEventListener('click', function () {
  const email = document.getElementById('stepEmail').value || 'you@example.com';
  document.getElementById('emailDisplay').textContent = 'Signing in as ' + email;
  document.getElementById('step1').hidden = true;
  document.getElementById('step2').hidden = false;
});
