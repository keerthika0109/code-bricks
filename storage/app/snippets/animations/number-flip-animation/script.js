let count = 0;
const digit = document.getElementById('flipDigit');
document.getElementById('flipBtn').addEventListener('click', function () {
  count++;
  digit.classList.add('flipping');
  setTimeout(() => { digit.textContent = count; digit.classList.remove('flipping'); }, 300);
});
