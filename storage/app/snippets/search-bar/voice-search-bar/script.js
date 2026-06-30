document.getElementById('voiceMicBtn').addEventListener('click', function () {
  this.classList.toggle('listening');
  document.getElementById('voiceSearchInput').placeholder = this.classList.contains('listening') ? 'Listening...' : 'Tap mic to speak...';
});
