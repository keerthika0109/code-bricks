document.querySelectorAll('.preset-btns button').forEach((btn) => {
  btn.addEventListener('click', function () {
    const d = new Date();
    d.setDate(d.getDate() + parseInt(this.dataset.d));
    document.getElementById('presetDateInput').value = d.toISOString().split('T')[0];
  });
});
