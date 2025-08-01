import os
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from handle_query import handle_query

from datetime import datetime
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
import openai
import pickle

class Question(BaseModel):
    question: str

# Initialize the environment variables
load_dotenv()

app = FastAPI()

origins = [
    "*",
    "https://pdf-ai-chat-app.netlify.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

# APIs

@app.get('/loaded-pdfs')
def get_loaded_pdfs():
    all_file_names = os.listdir()
    pickles = [x for x in all_file_names if x[-4:] == '.pkl']
    loaded_pdf_names = list(map(lambda a: a[:-4], pickles)) # trimming the .pkl from the file name

    return {
        "loaded_pdfs": loaded_pdf_names,
        "total_count": len(pickles)
    }

@app.post('/query')
def query(question: Question):
    print("[query]: " + question.question)
    response = handle_query(question.question)
    print("[query]: " + response)
    return {"Response": response}


@app.post('/upload-pdf')
async def upload_pdf(file_upload: UploadFile):
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

        # embeddings
        store_name = "UPLOADED_PDF_FILE.pkl"

        try:
            embeddings = OpenAIEmbeddings()
            VectorStore = FAISS.from_texts(chunks, embedding=embeddings)
            with open(store_name, 'wb') as f:
                pickle.dump(VectorStore, f)
        except Exception:
            print("Unable to upload the PDF")


    return {"Response": "Success"}

