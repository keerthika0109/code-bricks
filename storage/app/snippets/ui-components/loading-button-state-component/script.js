document.getElementById('stateBtn').addEventListener('click', function () {
  this.classList.add('loading');
  this.querySelector('.state-label').textContent = 'Saving';
  setTimeout(() => { this.classList.remove('loading'); this.querySelector('.state-label').textContent = 'Save Changes'; }, 1500);
});
