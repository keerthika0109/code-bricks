document.getElementById('ftExpandBtn24').addEventListener('click', function () {
  const extra = document.getElementById('ftExpandExtra24');
  extra.hidden = !extra.hidden;
  this.textContent = extra.hidden ? 'Show more links' : 'Show less';
});
