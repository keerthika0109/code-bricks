const word = "LOADING ";
const container = document.getElementById('textRing');
word.split('').forEach((char, i) => {
  const span = document.createElement('span');
  span.textContent = char;
  span.style.transform = `rotate(${(360 / word.length) * i}deg)`;
  container.appendChild(span);
});
