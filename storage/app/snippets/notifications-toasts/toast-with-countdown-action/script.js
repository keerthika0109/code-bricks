let interval;
document.getElementById('ntBtn16').addEventListener('click', function () {
  let sec = 5;
  const toast = document.getElementById('ntCountdownToast16');
  const numEl = document.getElementById('ntCountdownNum16');
  toast.hidden = false;
  numEl.textContent = sec;
  interval = setInterval(() => {
    sec--;
    numEl.textContent = sec;
    if (sec <= 0) { clearInterval(interval); toast.hidden = true; }
  }, 1000);
});
document.getElementById('ntCountdownCancel16').addEventListener('click', function () {
  clearInterval(interval);
  document.getElementById('ntCountdownToast16').hidden = true;
});
