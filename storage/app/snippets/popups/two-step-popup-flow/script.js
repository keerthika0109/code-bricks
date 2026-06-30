document.getElementById('ppOpen19').addEventListener('click', () => document.getElementById('ppBackdrop19').hidden = false);
document.querySelectorAll('[data-next]').forEach(btn => btn.addEventListener('click', function () {
  document.getElementById('twostepStep1_19').hidden = true;
  document.getElementById('twostepStep2_19').hidden = false;
}));
