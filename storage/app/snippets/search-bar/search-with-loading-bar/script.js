let timeout;
document.getElementById('loadSearchInput').addEventListener('input', function () {
  const spinner = document.getElementById('loadSearchSpinner');
  spinner.hidden = false;
  clearTimeout(timeout);
  timeout = setTimeout(() => spinner.hidden = true, 800);
});
