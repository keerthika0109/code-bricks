document.querySelectorAll('.faq-q').forEach((btn) => {
  btn.addEventListener('click', function () {
    const ans = this.nextElementSibling;
    ans.hidden = !ans.hidden;
    this.querySelector('span').textContent = ans.hidden ? '+' : '−';
  });
});
