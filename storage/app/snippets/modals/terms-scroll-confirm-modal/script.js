document.getElementById('mdOpen25').addEventListener('click', () => document.getElementById('mdBackdrop25').hidden = false);
document.getElementById('termsScroll').addEventListener('scroll', function () {
  if (this.scrollTop + this.clientHeight >= this.scrollHeight - 5) {
    document.getElementById('termsAccept').disabled = false;
  }
});
