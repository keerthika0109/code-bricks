const input = document.getElementById('tipSearchInput');
input.addEventListener('focus', () => document.getElementById('tipBox').hidden = false);
input.addEventListener('blur', () => document.getElementById('tipBox').hidden = true);
