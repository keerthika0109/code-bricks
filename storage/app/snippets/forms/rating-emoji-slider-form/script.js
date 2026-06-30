const emojis = ['😢','😕','😐','🙂','😄'];
document.getElementById('moodRange').addEventListener('input', function (e) {
  document.getElementById('moodEmoji').textContent = emojis[e.target.value];
});
