const r1 = document.getElementById('alloc1'), r2 = document.getElementById('alloc2');
r1.addEventListener('input', () => { document.getElementById('m1').textContent = r1.value; r2.value = 100 - r1.value; document.getElementById('m2').textContent = r2.value; });
r2.addEventListener('input', () => { document.getElementById('m2').textContent = r2.value; r1.value = 100 - r2.value; document.getElementById('m1').textContent = r1.value; });
