document.getElementById('dualAvail').addEventListener('click', function (e) {
  if (e.target.tagName === 'LI') { document.getElementById('dualSel').appendChild(e.target); }
});
document.getElementById('dualSel').addEventListener('click', function (e) {
  if (e.target.tagName === 'LI') { document.getElementById('dualAvail').appendChild(e.target); }
});
