const items = ['React', 'Vue', 'Angular', 'Svelte', 'Laravel', 'Django'];
const input = document.getElementById('autoInput');
const list = document.getElementById('autoList');
input.addEventListener('input', function () {
  list.innerHTML = '';
  if (!input.value) return;
  items.filter(i => i.toLowerCase().includes(input.value.toLowerCase())).forEach(match => {
    const li = document.createElement('li');
    li.textContent = match;
    li.addEventListener('click', () => { input.value = match; list.innerHTML = ''; });
    list.appendChild(li);
  });
});
