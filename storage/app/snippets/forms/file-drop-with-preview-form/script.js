const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', function () {
  if (fileInput.files.length) {
    document.getElementById('fileName').textContent = fileInput.files[0].name;
    document.getElementById('filePreview').hidden = false;
  }
});
document.getElementById('fileRemove').addEventListener('click', function () {
  fileInput.value = '';
  document.getElementById('filePreview').hidden = true;
});
