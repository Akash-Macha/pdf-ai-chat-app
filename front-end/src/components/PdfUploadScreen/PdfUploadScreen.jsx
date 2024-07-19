import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Loader from "../Loader/Loader";

const PdfUploadScreen = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleFileInputChange = (event) => {
    console.log('event.target:', event.target.files)
    setFile(event.target.files[0]);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('file:', file);

    const formData = new FormData();

    // 'file_upload' should match with the API endpoint variable name!
    formData.append('file_upload', file);

    setIsLoading(true);
    try {
      const endpoint = 'https://pdf-ai-chat-app-backend.onrender.com/upload-pdf';
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log('file have successfully uploaded.');
        navigate("/chat-with-pdf");
      } else {
        console.log('file upload failed.');
      }

    } catch (error) {
      console.error('Error uploading file:', error);
    }
    setIsLoading(false);
  } 

  return (
    <div>
      <h1>Upload PDF</h1>

      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf" onChange={handleFileInputChange}/>
        <button type="submit" disabled={!file}>Upload</button>
      </form>
      { file && <p>{file.name}</p>}
      {isLoading ? (<><Loader type="RingLoader" size={85} cssOverride={{
            display: 'block',
            position: 'absolute',
            left: "45%",
            top: "40%",
          }} />
          <p style={{ color: 'white' }}>Sit and realx as we upload your PDF :)</p>
          </>
          ) : null}
    </div>
  );
}

export default PdfUploadScreen;