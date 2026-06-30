const textEl = document.getElementById('inlineText');
textEl.addEventListener('click', function () {
  if (textEl.dataset.editing === 'true') return;
  textEl.dataset.editing = 'true';
  textEl.contentEditable = true;
  textEl.focus();
});
textEl.addEventListener('blur', function () {
  textEl.dataset.editing = 'false';
  textEl.contentEditable = false;
});
