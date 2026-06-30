document.querySelectorAll('.filter-chip button').forEach((btn) => {
  btn.addEventListener('click', function () { this.closest('.filter-chip').remove(); });
});
