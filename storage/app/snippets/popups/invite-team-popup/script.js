document.getElementById('ppOpen28').addEventListener('click', () => document.getElementById('ppBackdrop28').hidden = false);
document.getElementById('ppClose28').addEventListener('click', () => document.getElementById('ppBackdrop28').hidden = true);
document.getElementById('inviteAddBtn28').addEventListener('click', function () {
  const input = document.getElementById('invitePpInput28');
  if (input.value) {
    const p = document.createElement('p');
    p.textContent = '✓ ' + input.value;
    document.getElementById('invitePpList28').appendChild(p);
    input.value = '';
  }
});
