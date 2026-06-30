document.getElementById('mdOpen21').addEventListener('click', function () {
  document.getElementById('mdBackdrop21').hidden = false;
  setTimeout(() => {
    document.getElementById('loadMdSpinner').style.display = 'none';
    document.getElementById('loadMdText').textContent = '✓ Payment successful!';
  }, 2000);
});
