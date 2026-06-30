const input = document.getElementById('trendInput');
input.addEventListener('focus', () => document.getElementById('trendDropdown').classList.add('show'));
input.addEventListener('blur', () => setTimeout(() => document.getElementById('trendDropdown').classList.remove('show'), 150));
