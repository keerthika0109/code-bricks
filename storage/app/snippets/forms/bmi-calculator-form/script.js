document.getElementById('bmiCalc').addEventListener('click', function () {
  const h = parseFloat(document.getElementById('bmiHeight').value) / 100;
  const w = parseFloat(document.getElementById('bmiWeight').value);
  if (h && w) {
    const bmi = (w / (h * h)).toFixed(1);
    document.getElementById('bmiResult').textContent = `Your BMI: ${bmi}`;
  }
});
