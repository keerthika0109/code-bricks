function toggleTheme() { document.body.classList.toggle('dark'); }
document.getElementById('kbThemeBtn').addEventListener('click', toggleTheme);
document.addEventListener('keydown', (e) => { if (e.ctrlKey && e.key === 'j') { e.preventDefault(); toggleTheme(); } });
