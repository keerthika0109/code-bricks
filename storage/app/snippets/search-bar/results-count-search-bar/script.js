document.getElementById('countInput').addEventListener('input', function () {
  const count = this.value ? Math.floor(Math.random() * 40) + 1 : 600;
  document.getElementById('countResult').textContent = `${count} designs ${this.value ? 'found' : 'available'}`;
});
