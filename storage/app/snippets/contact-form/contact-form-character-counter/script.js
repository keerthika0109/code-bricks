document.getElementById('cfCounterText').addEventListener('input', function () {
  document.getElementById('cfCounter').textContent = (200 - this.value.length) + ' characters left';
});
