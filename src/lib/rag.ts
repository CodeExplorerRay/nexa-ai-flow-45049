const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001';

export interface Source {
  id: string;
  content: string;
  [key: string]: any; // Allow other properties
}

export interface RagResponse {
  text: string;
  sources: Source[];
}

interface AskApiResponse {
  ok: boolean;
  response?: RagResponse;
  error?: string;
}

/**
 * Performs a RAG query against the backend.
 * It queries for relevant documents and then generates an answer based on them.
 * @param prompt The user's question.
 * @returns An object containing the generated answer and the sources used.
 */
export async function askQuestion(prompt: string): Promise<RagResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data: AskApiResponse = await res.json();

    if (!data.ok || !data.response) {
      throw new Error(data.error || 'Failed to get RAG response from the backend.');
    }

    return data.response;
  } catch (error) {
    console.error('Error in askQuestion:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred.';
    throw new Error(`Could not get answer from AI: ${message}`);
  }
}