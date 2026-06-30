document.getElementById('dobInput').addEventListener('change', function () {
  const dob = new Date(this.value);
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  if (now.getMonth() < dob.getMonth()) age--;
  document.getElementById('ageResult').textContent = `You are ${age} years old`;
});
