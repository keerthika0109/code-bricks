const text = "Learn to code by copying real examples.";
const el = document.getElementById('twText');
let i = 0;
function type() {
  if (i < text.length) { el.textContent += text.charAt(i); i++; setTimeout(type, 60); }
}
type();
