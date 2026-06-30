document.getElementById('cfBudgetRange').addEventListener('input', function () {
  document.getElementById('cfBudgetVal').textContent = parseInt(this.value).toLocaleString();
});
