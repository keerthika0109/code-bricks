document.getElementById('brightSlider').addEventListener('input', function () {
  const pct = this.value;
  document.body.style.background = `hsl(220, 25%, ${pct}%)`;
  document.body.style.color = pct < 50 ? 'white' : 'black';
});
