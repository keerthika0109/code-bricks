document.getElementById('ppOpen26').addEventListener('click', () => document.getElementById('ppBackdrop26').hidden = false);
document.getElementById('ppClose26').addEventListener('click', () => document.getElementById('ppBackdrop26').hidden = true);
document.querySelectorAll('.curr-pp-opt').forEach(opt => opt.addEventListener('click', function () {
  document.querySelectorAll('.curr-pp-opt').forEach(o => o.classList.remove('active'));
  this.classList.add('active');
}));
