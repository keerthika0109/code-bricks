const boxes = document.querySelectorAll('.otp-box');
boxes.forEach((box, i) => {
  box.addEventListener('input', function () {
    if (box.value && i < boxes.length - 1) { boxes[i + 1].focus(); }
  });
  box.addEventListener('keydown', function (e) {
    if (e.key === 'Backspace' && !box.value && i > 0) { boxes[i - 1].focus(); }
  });
});
