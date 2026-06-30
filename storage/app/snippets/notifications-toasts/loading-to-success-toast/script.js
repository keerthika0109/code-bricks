document.getElementById('ntBtn13').addEventListener('click', function () {
  const t = document.getElementById('ntMorphToast13');
  const spinner = document.getElementById('ntMorphSpinner13');
  const text = document.getElementById('ntMorphText13');
  t.hidden = false;
  setTimeout(() => { spinner.style.display = 'none'; text.textContent = '✓ Saved!'; }, 1200);
  setTimeout(() => t.hidden = true, 2500);
});
