import os
import numpy as np
import faiss
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from typing import List, Dict, Any
import json
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# --- Configuration ---
MODEL_NAME = 'all-MiniLM-L6-v2'
INDEX_PATH = "vector_storage/faiss.index"
DOCS_PATH = "vector_storage/docs.json"
EMBEDDING_DIM = 384 # Dimension for all-MiniLM-L6-v2

# --- In-memory storage ---
model = None
index = None
documents = []

class IndexRequest(BaseModel):
    documents: List[Dict[str, Any]]

class QueryRequest(BaseModel):
    query: str
    top_k: int = 5

@app.on_event("startup")
def startup_event():
    global model, index, documents
    print("Loading embedding model...")
    model = SentenceTransformer(MODEL_NAME)
    print("Model loaded.")

    # Create storage directory if it doesn't exist
    os.makedirs(os.path.dirname(INDEX_PATH), exist_ok=True)

    # Load existing index and documents if they exist
    if os.path.exists(INDEX_PATH) and os.path.exists(DOCS_PATH):
        print(f"Loading FAISS index from {INDEX_PATH}")
        index = faiss.read_index(INDEX_PATH)
        print(f"Loading documents from {DOCS_PATH}")
        with open(DOCS_PATH, 'r') as f:
            documents = json.load(f)
        print(f"Loaded {len(documents)} documents and index with {index.ntotal} vectors.")
    else:
        print("No existing index found. Initializing a new one.")
        index = faiss.IndexFlatL2(EMBEDDING_DIM)
        documents = []

@app.post("/index")
def index_documents(request: IndexRequest):
    global index, documents
    if not model:
        raise HTTPException(status_code=503, detail="Model not loaded yet.")

    new_docs = request.documents
    if not new_docs:
        return {"ok": True, "message": "No new documents to index."}

    # Assuming each document has a 'content' field to be embedded
    contents = [doc['content'] for doc in new_docs]
    embeddings = model.encode(contents, convert_to_tensor=False)
    
    index.add(np.array(embeddings).astype('float32'))
    documents.extend(new_docs)

    # Persist to disk
    faiss.write_index(index, INDEX_PATH)
    with open(DOCS_PATH, 'w') as f:
        json.dump(documents, f)

    return {"ok": True, "indexed_count": len(new_docs), "total_vectors": index.ntotal}

@app.post("/query")
def query_index(request: QueryRequest):
    global index, documents
    if not model or not index or index.ntotal == 0:
        raise HTTPException(status_code=503, detail="Index is not ready or is empty.")

    query_embedding = model.encode([request.query], convert_to_tensor=False)
    distances, indices = index.search(np.array(query_embedding).astype('float32'), request.top_k)

    results = [documents[i] for i in indices[0]]
    
    return {"ok": True, "results": results}

@app.get("/status")
def get_status():
    return {
        "ok": True,
        "model_name": MODEL_NAME,
        "index_ready": index is not None,
        "indexed_documents": len(documents),
        "vector_count": index.ntotal if index else 0,
    }