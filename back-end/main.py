import os
from fastapi import Depends, FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from auth import LoginRequest, authenticate, get_current_user
from handle_query import handle_query, VECTORSTORE_DIR

from datetime import datetime
from PyPDF2 import PdfReader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS

class Question(BaseModel):
    question: str

# Initialize the environment variables
load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://pdf-ai-chat-app.netlify.app",
    # "https://www.pdf-ai-chat-app.netlify.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# APIs

@app.post('/login')
def login(request: LoginRequest):
    token = authenticate(request.email, request.password)
    return {"token": token}

@app.get('/loaded-pdfs')
def get_loaded_pdfs(user: str = Depends(get_current_user)):
    is_loaded = os.path.isdir(VECTORSTORE_DIR)

    return {
        "loaded_pdfs": ["UPLOADED_PDF_FILE"] if is_loaded else [],
        "total_count": 1 if is_loaded else 0
    }

@app.post('/query')
def query(question: Question, user: str = Depends(get_current_user)):
    print("[query]: " + question.question)
    response = handle_query(question.question)
    if response is None:
        return {"Response": "No PDF has been uploaded yet. Please upload a PDF first."}
    print("[query]: " + response)
    return {"Response": response}


@app.post('/upload-pdf')
async def upload_pdf(file_upload: UploadFile, user: str = Depends(get_current_user)):
    # Save the file in the backend server
    pdf_file = await file_upload.read()
    save_to_file_name = 'UPLOADED_PDF_FILE.pdf'
    with open(save_to_file_name, "wb") as file:
        file.write(pdf_file)
    
    # Read the PDF text and generate pkl file
    with open(save_to_file_name, "rb") as pdf:
        pdf_reader = PdfReader(pdf)

        # Read one page at a time from PDF
        pdfText = ""
        for page in pdf_reader.pages:
            pdfText += page.extract_text()

        # Explained the overlap: https://youtu.be/RIWbalZ7sTo?si=ViGRnWbeV7D14-Rq&t=915
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size = 1000,
            chunk_overlap=200,
            length_function=len
        )
        chunks = text_splitter.split_text(text=pdfText)

        try:
            embeddings = OpenAIEmbeddings()
            VectorStore = FAISS.from_texts(chunks, embedding=embeddings)
            VectorStore.save_local(VECTORSTORE_DIR)
        except Exception as e:
            print(f"Unable to upload the PDF: {e!r}")
            return {"Response": "Failed", "Error": str(e)}

    return {"Response": "Success"}

