import os
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv


class Question(BaseModel):
    question: str

# Initialize the environment variables
load_dotenv()

app = FastAPI()

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

# @app.post('/query')
# def query(question: Question):
#     print("[query]: " + question.question)
#     return {"Data": question.question}

# @app.post('/')
# def hello_post():
#     return {"Success": "You posted!"}

# @app.get('/something')
# def something():
#     return {"Data": "Something"}

