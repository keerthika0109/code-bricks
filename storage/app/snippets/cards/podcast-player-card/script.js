let playing = false;
let progress = 30;
const btn = document.getElementById('podPlay');
const fill = document.getElementById('podFill');
let interval;
btn.addEventListener('click', function () {
  playing = !playing;
  btn.textContent = playing ? '❚❚' : '▶';
  if (playing) {
    interval = setInterval(() => { progress = progress < 100 ? progress + 1 : 0; fill.style.width = progress + '%'; }, 200);
  } else { clearInterval(interval); }
});
