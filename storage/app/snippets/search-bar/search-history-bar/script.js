const input = document.getElementById('histInput');
const dropdown = document.getElementById('histDropdown');
input.addEventListener('focus', () => dropdown.classList.add('show'));
input.addEventListener('blur', () => setTimeout(() => dropdown.classList.remove('show'), 150));
