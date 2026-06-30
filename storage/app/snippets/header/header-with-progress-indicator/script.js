document.addEventListener('scroll', function () {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('hdProgBar').style.width = pct + '%';
});
