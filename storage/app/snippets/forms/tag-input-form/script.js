const input = document.getElementById('tagInput');
input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && input.value.trim()) {
    e.preventDefault();
    const pill = document.createElement('span');
    pill.className = 'tag-pill';
    pill.innerHTML = input.value + ' <button type="button">\u2715</button>';
    pill.querySelector('button').addEventListener('click', () => pill.remove());
    document.getElementById('tagBox').insertBefore(pill, input);
    input.value = '';
  }
});
