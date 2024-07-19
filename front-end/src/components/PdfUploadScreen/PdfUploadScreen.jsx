import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const PdfUploadScreen = () => {
  const [file, setFile] = useState(null);
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

    try {
      const endpoint = 'http://localhost:8000/upload-pdf';
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
  } 

  return (
    <div>
      <h1>Upload PDF</h1>

      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf" onChange={handleFileInputChange}/>
        <button type="submit">Upload</button>
      </form>
      { file && <p>{file.name}</p>}
    </div>
  );
}

export default PdfUploadScreen;