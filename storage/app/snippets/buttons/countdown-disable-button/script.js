const countdownBtn = document.getElementById('countdownBtn');
countdownBtn.addEventListener('click', function () {
  let seconds = 5;
  countdownBtn.disabled = true;
  countdownBtn.textContent = `Resend in ${seconds}s`;
  const interval = setInterval(() => {
    seconds--;
    if (seconds <= 0) {
      clearInterval(interval);
      countdownBtn.disabled = false;
      countdownBtn.textContent = 'Resend Code';
    } else {
      countdownBtn.textContent = `Resend in ${seconds}s`;
    }
  }, 1000);
});
