import Worker from './worker.js?worker&inline';

document.querySelector('#app').innerHTML = `
<h1>Web Worker! OCR with Tesseract.js</h1>

Image URL <input type="text" value="https://tesseract.projectnaptha.com/img/eng_bw.png" />
<button>OCR</button>
<hr />
<a target="_blank"> <img src="" height="100"/> </a>
<textarea style="width:100%;height:300px"></textarea>
`;

const worker = new Worker();
worker.addEventListener('message', (event) => {
  console.log('main.js: message received from worker.js');
  console.log(event.data);
  document.querySelector('textarea').value = event.data;
});

document.querySelector('button').addEventListener('click', () => {
  const img = document.querySelector('input').value;
  document.querySelector('img').src = img;
  document.querySelector('a').href = img;

  worker.postMessage(img);
});
