document.getElementById('mdOpen24').addEventListener('click', () => document.getElementById('mdBackdrop24').hidden = false);
document.getElementById('mdClose24').addEventListener('click', () => document.getElementById('mdBackdrop24').hidden = true);
document.querySelectorAll('.avatar-opt').forEach((opt) => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.avatar-opt').forEach((o) => o.classList.remove('selected'));
    opt.classList.add('selected');
  });
});
