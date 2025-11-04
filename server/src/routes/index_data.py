import requests
import json
import argparse

def index_file(file_path: str, service_url: str):
    """
    Reads a JSON file and sends its contents to the embedding service for indexing.
    The JSON file should be a list of objects, where each object has a 'content' key.
    """
    try:
        with open(file_path, 'r') as f:
            data_to_index = json.load(f)
    except FileNotFoundError:
        print(f"Error: File not found at {file_path}")
        return
    except json.JSONDecodeError:
        print(f"Error: Could not decode JSON from {file_path}")
        return

    if not isinstance(data_to_index, list):
        print("Error: JSON file must contain a list of document objects.")
        return

    print(f"Found {len(data_to_index)} documents to index.")

    try:
        response = requests.post(f"{service_url}/index", json={"documents": data_to_index})
        response.raise_for_status()
        print("Successfully indexed documents.")
        print(response.json())
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to embedding service: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Index documents into the embedding service.")
    parser.add_argument("file_path", type=str, help="Path to the JSON file containing documents to index.")
    parser.add_argument("--url", type=str, default="http://localhost:8000", help="URL of the embedding service.")
    
    args = parser.parse_args()
    
    index_file(args.file_path, args.url)