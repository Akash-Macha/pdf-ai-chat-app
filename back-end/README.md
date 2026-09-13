# PDF Chat App - Backend

## Commands to run the app locally.

Requires Python 3.12 (see `.python-version`) - a newer Python (e.g. 3.14) breaks this project's LangChain/pydantic dependency stack.

- "C:\Program Files\Python312\python.exe" -m venv virtual-env
    - To create a virtual env
    - use "where python" to know the python path
- .\virtual-env\Scripts\activate.bat
    - To enter into the virtual env
- pip install -r requirements.txt
    - To install the dependencies
- Copy `.env.example` to `.env` and fill in `OPENAI_API_KEY` (and optionally override `APP_USER_EMAIL`/`APP_USER_PASSWORD`/`JWT_SECRET_KEY`, which otherwise default to `test@test.com` / `test` / an insecure dev secret)
    - Required before the server can answer queries or issue login sessions
- uvicorn main:app --reload
    - To Run the server

## Helpful resources:
- [How to enable CORS in FastAPI](https://fastapi.tiangolo.com/tutorial/cors/#more-info)