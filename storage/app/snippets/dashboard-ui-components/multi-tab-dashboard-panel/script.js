document.querySelectorAll('.ptw-tab').forEach((tab) => {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.ptw-tab').forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
  });
});
