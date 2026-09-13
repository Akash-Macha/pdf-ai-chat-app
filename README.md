# AI Powered PDF Chat App

This project is a PDF-based Q&A application that lets users upload a PDF document and ask questions about its content. The backend processes the uploaded document, splits it into manageable text chunks, creates vector embeddings, and uses OpenAI's GPT-3.5-turbo model to answer questions based on the document context. The frontend provides a simple upload flow and chat interface for interacting with the uploaded PDF.

## Project URL

Publicly accessible URL:

[https://pdf-ai-chat-app.netlify.app](https://pdf-ai-chat-app.netlify.app)

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- Mantine UI (light/dark/system theme)
- React Router
- React Query
- Axios

### Backend
- Python 3.12
- FastAPI
- Uvicorn
- PyJWT
- PyPDF2
- LangChain
- FAISS
- OpenAI API
- python-dotenv

### Auth
- Single hardcoded user (email/password from environment variables)
- JWT session, delivered as an httpOnly cookie (not readable by JavaScript, so an XSS bug can't steal it)
- Frontend and backend share one origin at request time via a same-origin `/api` proxy (Vite dev proxy locally, Netlify redirect in production), which keeps the cookie first-party instead of cross-site

### AI / Retrieval Flow
- PDF text extraction using PyPDF2
- Chunking for long documents using LangChain text splitters
- Embedding generation with OpenAI embeddings
- FAISS vector store for similarity search
- Question answering using LangChain + GPT-3.5-turbo

## How to Run the App Locally

### 1. Backend setup

Requires Python 3.12 (see `back-end/.python-version`) — a newer Python (e.g. 3.14) breaks this project's LangChain/pydantic dependency stack.

From the project root:

```bash
cd back-end
python -m venv virtual-env
```

On Windows:

```bash
.\virtual-env\Scripts\activate
```

On macOS/Linux:

```bash
source virtual-env/bin/activate
```

Then install dependencies:

```bash
pip install -r requirements.txt
```

Copy `back-end/.env.example` to `back-end/.env` and fill in your OpenAI key:

```env
OPENAI_API_KEY=your_openai_api_key_here

# Login credentials for this app's single-user auth
APP_USER_EMAIL=test@test.com
APP_USER_PASSWORD=test

# Secret used to sign login JWTs - set a long random value in production
JWT_SECRET_KEY=
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

No `VITE_API_BASE_URL` (or any env var) is needed — the frontend always calls a relative `/api` path. Vite's dev server proxies `/api` to `http://localhost:8000` locally (see `vite.config.js`), and `netlify.toml` proxies `/api` to the deployed Render backend in production. This keeps API requests same-origin, which is what lets the auth cookie be a normal first-party cookie instead of a cross-site one.

### 3. Log in

Sign in with the credentials from `back-end/.env` (`APP_USER_EMAIL`/`APP_USER_PASSWORD`, default `test@test.com` / `test`) to reach the upload and chat screens — they're behind a login gate.

## Frontend Implementation Brief

The frontend is built with React and Vite and uses a simple multi-page flow:

- A login screen gates the app; on success the backend sets an httpOnly session cookie and the user is routed to the PDF upload screen.
- The upload screen lets the user drag-and-drop or select a PDF and submit it to the backend API.
- After upload succeeds, the app navigates to the chat screen.
- The chat screen displays a question-and-answer history (with a loading indicator while waiting on the backend) and sends user prompts to the backend via Axios.
- `/pdf-upload` and `/chat-with-pdf` are protected routes: a `RequireAuth` wrapper checks session state (via a `GET /me` call, cached in a React Context) and redirects to the login screen if there's no valid session.
- React Query is used for API state management. Mantine handles the UI, including a light/dark/system color-scheme toggle in the header.

The app structure follows a component-based approach with separate screens for login, upload, and chat, along with reusable UI elements such as the header (theme toggle + logout) and footer.

## Backend Implementation Brief

The backend is built with FastAPI and is responsible for auth and the document processing pipeline:

- `POST /login` checks the submitted email/password against `APP_USER_EMAIL`/`APP_USER_PASSWORD`, and on success signs a JWT (PyJWT) and sets it as an httpOnly, `SameSite=Lax` cookie. `POST /logout` clears it, and `GET /me` reports whether the current request's cookie is a valid session.
- `/upload-pdf`, `/query`, and `/loaded-pdfs` all require that session cookie (a FastAPI dependency validates and decodes the JWT on each request).
- The `/upload-pdf` endpoint accepts a PDF file upload.
- The code reads the uploaded PDF and extracts text using PyPDF2.
- The extracted text is split into chunks using LangChain's `RecursiveCharacterTextSplitter`.
- Each chunk is converted into embeddings using OpenAI embeddings and stored in a FAISS vector store, persisted to disk with FAISS's own `save_local`.
- The `/query` endpoint receives a question, performs a similarity search over the vector store (loaded back via `FAISS.load_local`), and passes the most relevant document chunks to a LangChain question-answering chain.
- The result is returned as a response to the frontend.
- The `/loaded-pdfs` endpoint reports whether a PDF has already been processed and stored locally.

This architecture is a lightweight retrieval-augmented generation (RAG) setup: the app retrieves relevant PDF content before asking the LLM to answer questions.

