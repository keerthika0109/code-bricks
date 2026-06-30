document.getElementById('ntBtn28').addEventListener('click', () => document.getElementById('ntRetryToast28').hidden = false);
document.getElementById('ntRetryBtn28').addEventListener('click', function () {
  this.textContent = 'Retrying...';
  setTimeout(() => document.getElementById('ntRetryToast28').hidden = true, 1200);
});
