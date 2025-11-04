# nexa-ai-flow

`nexa-ai-flow` is a modern, responsive AI-powered dashboard designed to provide a suite of personal productivity and wellness tools. It features a highly configurable interface, a full-stack RAG (Retrieval-Augmented Generation) pipeline, and a set of feature-rich components.

---

## 🚀 Tech Stack

-   **Frontend**: React 18+ with Vite, TypeScript, shadcn/ui, Tailwind CSS
-   **Backend**: Node.js with Express, TypeScript
-   **Embedding Service**: Python with FastAPI, Sentence-Transformers, FAISS
-   **AI Model Runtime**: Ollama (llama3.2)
-   **Testing**: Vitest, React Testing Library, Jest, Pytest

## ⚙️ End-to-End Local Setup

Follow these steps to get the entire application stack running locally.

### 1. Prerequisites

-   Node.js (v20.x or later)
-   Python (v3.9 or later)
-   Ollama installed and running.

### 2. Install Ollama Model

Pull the required AI model for generation:

```sh
ollama pull llama3.2
```

### 3. Setup Environment Variables

Copy the example environment file and ensure the values are correct for your local setup.

```sh
cp .env.example .env
```

### 4. Install Dependencies

Install dependencies for all three services.

```sh
# Frontend
npm install

# Backend
cd server
npm install
cd ..

# Embedding Service
cd embed_service
pip install -r requirements.txt
cd ..
```

### 5. Run the Services

Open three separate terminals to run each part of the stack.

**Terminal 1: Embedding Service**

```sh
cd embed_service
uvicorn main:app --host 0.0.0.0 --port 8000
```

**Terminal 2: Backend Server**

```sh
cd server
npm run dev
```

**Terminal 3: Frontend**

```sh
npm run dev
```

The application will be available at `http://localhost:3000`.

### 6. Index Sample Data

With the embedding service running, open a new terminal to index the sample documents. This provides the AI with context for answering questions.

```sh
chmod +x index_sample.sh
./index_sample.sh
```

You are now ready to use the full application! Try the "Evening Wrap-Up" feature to test the RAG pipeline.

