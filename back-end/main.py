import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from handle_query import handle_query


class Question(BaseModel):
    question: str

# Initialize the environment variables
load_dotenv()

app = FastAPI()

origins = [
    "*"
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
