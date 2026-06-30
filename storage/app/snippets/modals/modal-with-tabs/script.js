document.getElementById('mdOpen10').addEventListener('click', () => document.getElementById('mdBackdrop10').hidden = false);
document.getElementById('mdClose10').addEventListener('click', () => document.getElementById('mdBackdrop10').hidden = true);
document.querySelectorAll('.tab-md-tab').forEach((tab) => {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.tab-md-tab').forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.tab-md-pane').forEach((p) => p.hidden = p.dataset.pane !== tab.dataset.t);
  });
});
