const list = document.getElementById('dragList');
let dragged;
list.addEventListener('dragstart', (e) => { dragged = e.target; e.target.classList.add('dragging'); });
list.addEventListener('dragend', (e) => { e.target.classList.remove('dragging'); });
list.addEventListener('dragover', (e) => {
  e.preventDefault();
  const target = e.target.closest('li');
  if (target && target !== dragged) {
    const rect = target.getBoundingClientRect();
    const next = (e.clientY - rect.top) / rect.height > 0.5;
    list.insertBefore(dragged, next ? target.nextSibling : target);
  }
});
