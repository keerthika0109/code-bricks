document.getElementById('itTrigger').addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('itDefault').hidden = true;
  document.getElementById('itConfirm').hidden = false;
});
document.getElementById('itNo').addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('itDefault').hidden = false;
  document.getElementById('itConfirm').hidden = true;
});
