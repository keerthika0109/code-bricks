const magBtn = document.getElementById('magBtn');
magBtn.addEventListener('mousemove', function (e) {
  const rect = magBtn.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  magBtn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
});
magBtn.addEventListener('mouseleave', function () { magBtn.style.transform = 'translate(0, 0)'; });
