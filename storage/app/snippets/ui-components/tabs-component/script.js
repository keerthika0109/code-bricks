const tabs = document.querySelectorAll('.ui-tab');
tabs.forEach((tab, i) => {
  tab.addEventListener('click', function () {
    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('uiTabUnderline').style.transform = `translateX(${i * 100}%)`;
  });
});
