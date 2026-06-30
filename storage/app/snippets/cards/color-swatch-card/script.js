document.querySelectorAll('.swatch').forEach((sw) => {
  sw.addEventListener('click', function () {
    document.getElementById('swatchStatus').textContent = `Copied ${sw.dataset.hex}`;
  });
});
