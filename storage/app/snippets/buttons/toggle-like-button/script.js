const likeBtn = document.getElementById('likeBtn');
const countEl = likeBtn.querySelector('.like-count');
let liked = false; let count = 128;
likeBtn.addEventListener('click', function () {
  liked = !liked;
  count += liked ? 1 : -1;
  likeBtn.setAttribute('aria-pressed', liked);
  countEl.textContent = count;
});
