document.querySelectorAll('.thumb-btn').forEach((btn) => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.thumb-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('thumbsMsg').textContent = 'Thanks for your feedback!';
  });
});
