document.getElementById('ntBtn27').addEventListener('click', () => document.getElementById('ntEmojiToast27').hidden = false);
document.querySelectorAll('.nt-emoji-opts button').forEach((btn) => {
  btn.addEventListener('click', function () { document.getElementById('ntEmojiText27').textContent = `You reacted ${this.textContent}`; });
});
