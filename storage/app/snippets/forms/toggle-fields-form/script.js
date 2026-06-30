document.getElementById('condCheck').addEventListener('change', function (e) {
  document.getElementById('condExtra').hidden = !e.target.checked;
});
