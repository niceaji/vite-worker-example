import { createWorker } from 'tesseract.js';

self.addEventListener('message', async (event) => {
  console.log('worker.js: message received from main thread', event.data);

  const worker = await createWorker('eng');
  const ret = await worker.recognize(event.data);

  self.postMessage(ret.data.text);

  await worker.terminate();
});
