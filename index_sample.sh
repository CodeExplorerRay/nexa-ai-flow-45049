#!/bin/bash

# This script indexes the sample data into the embedding service.

# Ensure the embed_service is running before executing this script.

echo "Indexing sample documents..."
python embed_service/index_data.py SAMPLE_DATA/sample_docs.json

echo "Indexing complete."