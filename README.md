# AI Powered PDF Chat App

This project is a PDF-based Q&A application that lets users upload a PDF document and ask questions about its content. The backend processes the uploaded document, splits it into manageable text chunks, creates vector embeddings, and uses OpenAI's GPT-3.5-turbo model to answer questions based on the document context. The frontend provides a simple upload flow and chat interface for interacting with the uploaded PDF.

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- Material UI (MUI)
- React Router
- React Query
- Axios

### Backend
- Python
- FastAPI
- Uvicorn
- PyPDF2
- LangChain
- FAISS
- OpenAI API
- python-dotenv

### AI / Retrieval Flow
- PDF text extraction using PyPDF2
- Chunking for long documents using LangChain text splitters
- Embedding generation with OpenAI embeddings
- FAISS vector store for similarity search
- Question answering using LangChain + GPT-3.5-turbo

## How to Run the App Locally

### 1. Backend setup

From the project root:

```bash
cd back-end
python -m venv .venv
```

On Windows:

```bash
.venv\Scripts\activate
```

On macOS/Linux:

```bash
source .venv/bin/activate
```

Then install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file in the `back-end` folder with your OpenAI key:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

Start the backend server:

```bash
uvicorn main:app --reload
```

The API will run at:

```text
http://localhost:8000
```

### 2. Frontend setup

From the project root:

```bash
cd front-end
npm install
npm run dev
```

The frontend runs by default at:

```text
http://localhost:5173
```

> Note: the frontend now points to the local backend by default in `front-end/src/axios-api.js`.
>
> To switch back to the deployed backend, comment out the local URL and uncomment the deployed backend URL in that file.
>
> Example:
>
> ```js
> const instance = axios.create({
>   baseURL: 'http://localhost:8000',
>   // baseURL: 'https://pdf-ai-chat-app-backend.onrender.com',
>   'Content-Type': 'application/json'
> });
> ```
>
> To use the deployed URL instead, replace the local line with the commented deployed URL and comment the local line again.

## Frontend Implementation Brief

The frontend is built with React and Vite and uses a simple multi-page flow:

- A landing page introduces the app and routes users to the PDF upload screen.
- The upload screen lets the user select a PDF and submit it to the backend API.
- After upload succeeds, the app navigates to the chat screen.
- The chat screen displays a question-and-answer history and sends user prompts to the backend via Axios.
- React Query is used for API state management, while Material UI handles the user interface styling.

The app structure follows a component-based approach with separate screens for upload and chat, along with reusable UI elements such as the header, footer, loader, and route configuration.

## Backend Implementation Brief

The backend is built with FastAPI and is responsible for the document processing pipeline:

- The `/upload-pdf` endpoint accepts a PDF file upload.
- The code reads the uploaded PDF and extracts text using PyPDF2.
- The extracted text is split into chunks using LangChain's `RecursiveCharacterTextSplitter`.
- Each chunk is converted into embeddings using OpenAI embeddings and stored in a FAISS vector database.
- The `/query` endpoint receives a question, performs a similarity search over the vector store, and passes the most relevant document chunks to a LangChain question-answering chain.
- The result is returned as a response to the frontend.
- The `/loaded-pdfs` endpoint lists the PDFs that have already been processed and stored locally.

This architecture is a lightweight retrieval-augmented generation (RAG) setup: the app retrieves relevant PDF content before asking the LLM to answer questions.

## Project URL

Publicly accessible frontend URL:

[https://pdf-ai-chat-app.netlify.app](https://pdf-ai-chat-app.netlify.app)

