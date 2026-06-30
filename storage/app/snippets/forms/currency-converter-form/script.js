const rate = 83.2;
function update() {
  const amt = parseFloat(document.getElementById('currAmount').value) || 0;
  document.getElementById('currResult').value = (amt * rate).toFixed(2);
}
document.getElementById('currAmount').addEventListener('input', update);
update();
