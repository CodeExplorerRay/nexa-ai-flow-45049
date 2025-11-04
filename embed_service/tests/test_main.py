from fastapi.testclient import TestClient
from ..main import app

client = TestClient(app)

def test_status():
    response = client.get("/status")
    assert response.status_code == 200
    data = response.json()
    assert data["ok"] is True
    assert data["model_name"] == "all-MiniLM-L6-v2"
    assert data["indexed_documents"] >= 0

def test_index_and_query():
    # 1. Index a document
    doc_to_index = {
        "documents": [
            {"id": "test01", "content": "The sky is blue and the grass is green."}
        ]
    }
    response = client.post("/index", json=doc_to_index)
    assert response.status_code == 200
    assert response.json()["ok"] is True
    assert response.json()["indexed_count"] == 1

    # 2. Query for the document
    query = {
        "query": "What color is the sky?",
        "top_k": 1
    }
    response = client.post("/query", json=query)
    assert response.status_code == 200
    data = response.json()
    assert data["ok"] is True
    assert len(data["results"]) == 1
    assert data["results"][0]["id"] == "test01"
    assert "sky is blue" in data["results"][0]["content"]