const card = document.getElementById('uploadCard');
['dragover','dragenter'].forEach(evt => card.addEventListener(evt, (e) => { e.preventDefault(); card.classList.add('dragover'); }));
['dragleave','drop'].forEach(evt => card.addEventListener(evt, (e) => { e.preventDefault(); card.classList.remove('dragover'); }));
