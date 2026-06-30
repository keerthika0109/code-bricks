document.getElementById('cfStepNext').addEventListener('click', function () {
  document.querySelector('[data-step="1"]').hidden = true;
  document.querySelector('[data-step="2"]').hidden = false;
  document.querySelectorAll('.cf-step-dots span')[1].classList.add('active');
});
