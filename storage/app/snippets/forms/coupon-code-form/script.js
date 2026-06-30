document.getElementById('couponApply').addEventListener('click', function () {
  const code = document.getElementById('couponInput').value.trim().toUpperCase();
  if (code === 'SAVE20') {
    document.getElementById('couponMsg').textContent = 'Coupon applied! 20% off';
    document.getElementById('priceOld').classList.add('struck');
    document.getElementById('priceNew').textContent = '$39.99';
  } else {
    document.getElementById('couponMsg').textContent = 'Invalid code. Try SAVE20';
    document.getElementById('couponMsg').style.color = '#dc2626';
  }
});
