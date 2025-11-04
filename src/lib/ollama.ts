const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001';

interface GenerateResponse {
  ok: boolean;
  response?: string;
  error?: string;
}

/**
 * Calls the backend proxy to generate text from the AI model.
 * @param prompt The prompt to send.
 * @returns The generated text.
 */
export async function generateText(prompt: string): Promise<string> {
  try {
    const res = await fetch(`${API_BASE}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data: GenerateResponse = await res.json();

    if (!data.ok || !data.response) {
      throw new Error(data.error || 'Failed to generate text from the backend.');
    }

    return data.response;
  } catch (error) {
    console.error('Error in generateText:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred.';
    throw new Error(`Could not get response from AI: ${message}`);
  }
}