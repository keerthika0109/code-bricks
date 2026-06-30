const tabs = document.querySelectorAll('.tab');
const underline = document.getElementById('tabUnderline');
tabs.forEach((tab, i) => {
  tab.addEventListener('click', function () {
    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    underline.style.transform = `translateX(${i * 100}%)`;
    document.getElementById('loginForm').hidden = tab.dataset.tab !== 'login';
    document.getElementById('signupForm').hidden = tab.dataset.tab !== 'signup';
  });
});
