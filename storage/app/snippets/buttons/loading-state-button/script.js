const loadBtn = document.getElementById('loadBtn');
loadBtn.addEventListener('click', function () {
  const label = loadBtn.querySelector('.btn-label');
  const spinner = loadBtn.querySelector('.spinner');
  label.textContent = 'Loading...';
  spinner.hidden = false;
  loadBtn.disabled = true;
  setTimeout(() => {
    label.textContent = 'Done!';
    spinner.hidden = true;
    setTimeout(() => { label.textContent = 'Submit'; loadBtn.disabled = false; }, 1200);
  }, 1800);
});
