document.addEventListener('scroll', function () {
  document.getElementById('hdShrinkHeader').classList.toggle('shrunk', window.scrollY > 50);
});
