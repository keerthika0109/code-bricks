const wrap = document.getElementById('pxWrap');
const back = document.getElementById('pxBack');
wrap.addEventListener('scroll', function () {
  back.style.transform = `translateY(${wrap.scrollTop * 0.4}px)`;
});
