document.querySelectorAll('.tw-opt').forEach((opt) => {
  opt.addEventListener('click', function () {
    document.querySelectorAll('.tw-opt').forEach((o) => o.classList.remove('active'));
    this.classList.add('active');
    document.body.classList.toggle('dark', this.dataset.mode === 'dark');
  });
});
