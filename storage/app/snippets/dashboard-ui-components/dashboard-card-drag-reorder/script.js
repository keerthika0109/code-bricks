const row = document.getElementById('dragDashRow');
let dragged;
row.querySelectorAll('.drag-dash-card').forEach((card) => {
  card.addEventListener('dragstart', (e) => { dragged = card; card.classList.add('dragging'); });
  card.addEventListener('dragend', () => card.classList.remove('dragging'));
});
row.addEventListener('dragover', (e) => {
  e.preventDefault();
  const target = e.target.closest('.drag-dash-card');
  if (target && target !== dragged) row.insertBefore(dragged, target);
});
