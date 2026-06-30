const items = ['React', 'Vue', 'Svelte', 'Angular', 'Laravel', 'Django', 'Rails'];
const input = document.getElementById('acInput');
const dropdown = document.getElementById('acDropdown');
input.addEventListener('input', function () {
  dropdown.innerHTML = '';
  if (!input.value) return;
  items.filter(i => i.toLowerCase().includes(input.value.toLowerCase())).forEach(m => {
    const li = document.createElement('li');
    li.textContent = m;
    li.addEventListener('click', () => { input.value = m; dropdown.innerHTML = ''; });
    dropdown.appendChild(li);
  });
});
