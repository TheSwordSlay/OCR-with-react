import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { useEffect } from 'react';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState('');
  const [submitLoading, setLoading] = useState(false)

  // const worker = createWorker()

  const imageToText = async () => {
    
    if(selectedImage != null) {
      setLoading(true)
      setTextResult('')
      const worker = await createWorker('eng');
      const data = await worker.recognize(selectedImage);
      setTextResult(data.data.text)
      await worker.terminate();
      setLoading(false)
    } else {
      setLoading(false)
      setTextResult('')
    }
    // console.log(data)
  } 

  useEffect(() => {
    imageToText()
  }, [selectedImage])

  const handleChangeImage = e => {
    setSelectedImage(e.target.files[0])
  }

  return (
    <div className="App">
      <p>Image to Text</p>
      <div>
        {/* <label htmlFor='upload'>Upload gambar</label> */}
        <input type='file' id='upload' accept='image/*' onChange={handleChangeImage}></input>
      </div>

      {selectedImage && (
        <img src={URL.createObjectURL(selectedImage)}></img>
      )}

      {submitLoading ? 
      <div>Loading</div>
      : <></>}

      {textResult && (
            <div>
              <p>To text :</p>
              <p className='result'>{textResult}</p>
            </div>
      )}

    </div>
  );
}

export default App;
