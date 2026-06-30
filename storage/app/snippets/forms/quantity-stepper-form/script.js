const val = document.getElementById('qtyValue');
document.getElementById('qtyPlus').addEventListener('click', () => val.value = parseInt(val.value) + 1);
document.getElementById('qtyMinus').addEventListener('click', () => val.value = Math.max(1, parseInt(val.value) - 1));
