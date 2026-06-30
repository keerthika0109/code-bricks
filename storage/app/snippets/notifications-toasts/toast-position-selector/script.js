document.querySelectorAll('.nt-pos-buttons button').forEach((btn) => {
  btn.addEventListener('click', function () {
    const toast = document.getElementById('ntPosToast14');
    const pos = this.dataset.pos;
    toast.style.top = pos.includes('top') ? '24px' : 'auto';
    toast.style.bottom = pos.includes('bottom') ? '24px' : 'auto';
    toast.style.left = pos.includes('left') ? '24px' : 'auto';
    toast.style.right = pos.includes('right') ? '24px' : 'auto';
    toast.hidden = false;
    setTimeout(() => toast.hidden = true, 2000);
  });
});
