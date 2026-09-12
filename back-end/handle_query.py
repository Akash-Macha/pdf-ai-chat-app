import os
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain_community.callbacks import get_openai_callback

OPEN_AI_MODEL = 'gpt-3.5-turbo'
VECTORSTORE_DIR = 'UPLOADED_PDF_FILE_INDEX'

# Load Embedding from Disk
def load_embedding(store_name=VECTORSTORE_DIR):
  if os.path.exists(store_name):
    VectorStore = FAISS.load_local(store_name, OpenAIEmbeddings(), allow_dangerous_deserialization=True)
    print("Embeddings loaded from the Disk!")
    return VectorStore
  else:
    print("Embeddings are not present in the Disk!")
    return None


def handle_query(query: str):
  # return "The abbreviation of SPVR TRANS is Supervisor Transactions."
  if query:

    VectorStore = load_embedding()
    if VectorStore != None:
      docs = VectorStore.similarity_search(query=query, k=3)

      llm = ChatOpenAI(temperature=0, model_name=OPEN_AI_MODEL)
      chain = load_qa_chain(llm=llm, chain_type='stuff')
      with get_openai_callback() as cb:
        response = chain.run(input_documents=docs, question=query)
        print(response)

        return response
    else:
      print("VectorStore has not created.")
