const textarea = document.getElementById('charText');
const counter = document.getElementById('charCount');
textarea.addEventListener('input', function () {
  const left = 140 - textarea.value.length;
  counter.textContent = left + ' characters left';
  counter.classList.toggle('warn', left < 20);
});
