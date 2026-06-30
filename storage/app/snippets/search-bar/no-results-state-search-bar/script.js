const items = ['login', 'buttons', 'cards', 'forms'];
document.getElementById('noResultInput').addEventListener('input', function () {
  const match = items.some(i => i.includes(this.value.toLowerCase()));
  document.getElementById('noResultMsg').textContent = (this.value && !match) ? `No results found for "${this.value}"` : '';
});
