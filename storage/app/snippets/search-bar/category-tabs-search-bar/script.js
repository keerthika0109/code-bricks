document.querySelectorAll('.cat-tab').forEach((tab) => {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.cat-tab').forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
  });
});
