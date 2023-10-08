import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { createWorker } from 'tesseract.js';

function App() {
  const [image, setImage] = useState('');
  function blobUrl() {
    const url = URL.createObjectURL(image)
    return url
  }

  async function toText() {
    const worker = await createWorker('eng');
    const data = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
    console.log('haha')
    console.log(data.text);
    await worker.terminate();
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
                         {image ? 
                        <div className='flex justify-center'>                       
                        <img src={blobUrl()} alt="Makanan" className='h-60'/> 
                        </div>
                        : ""}
                        
      <input type="file" className="file-input file-input-bordered file-input-primary bg-white w-full mx-2 mb-2" onChange={(image) => setImage(image.target.files[0])} />
      <button onClick={toText()}>aaaa</button>
    </div>
  );
}

export default App;
