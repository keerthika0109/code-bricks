const header = document.getElementById('accHeader');
const body = document.getElementById('accBody');
header.addEventListener('click', function () {
  if (body.style.maxHeight) { body.style.maxHeight = null; }
  else { body.style.maxHeight = body.scrollHeight + 'px'; }
});
