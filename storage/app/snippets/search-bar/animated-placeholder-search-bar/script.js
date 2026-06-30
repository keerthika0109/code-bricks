const examples = ['Search "login designs"', 'Search "dark mode toggle"', 'Search "pricing card"', 'Search "loaders"'];
let i = 0;
const input = document.getElementById('cyclePlaceholder');
setInterval(() => { i = (i + 1) % examples.length; input.placeholder = examples[i]; }, 2200);
