const confirmBtn = document.getElementById('confirmBtn');
const textEl = confirmBtn.querySelector('.text');
confirmBtn.addEventListener('click', function () {
  textEl.textContent = '\u2713 Saved!';
  confirmBtn.classList.add('confirmed');
  setTimeout(() => { textEl.textContent = 'Save Changes'; confirmBtn.classList.remove('confirmed'); }, 2000);
});
