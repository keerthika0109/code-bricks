document.getElementById('maskDateInput').addEventListener('input', function (e) {
  let v = this.value.replace(/\D/g, '');
  if (v.length > 2) v = v.slice(0,2) + '/' + v.slice(2);
  if (v.length > 5) v = v.slice(0,5) + '/' + v.slice(5,9);
  this.value = v;
});
