document.querySelectorAll('.cf-combo-tabs button').forEach((btn) => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.cf-combo-tabs button').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    document.querySelectorAll('[data-pane]').forEach(p => p.hidden = p.dataset.pane !== this.dataset.t);
  });
});
