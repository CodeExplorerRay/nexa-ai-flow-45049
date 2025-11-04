import axios from 'axios';

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2';

interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

/**
 * Calls the Ollama API to generate a response.
 * @param prompt The prompt to send to the model.
 * @returns The generated text from the model.
 */
export async function generate(prompt: string): Promise<string> {
  try {
    const response = await axios.post<OllamaResponse>(`${OLLAMA_HOST}/api/generate`, {
      model: OLLAMA_MODEL,
      prompt: prompt,
      stream: false, // We want the full response
    });
    return response.data.response;
  } catch (error) {
    console.error('Error calling Ollama API:', error);
    
    // Fallback logic can be implemented here
    if (axios.isAxiosError(error)) {
      console.error('Ollama is likely unavailable. Please ensure Ollama is running and accessible at', OLLAMA_HOST);
      // Here you could implement a fallback to llama.cpp or another service
      // For now, we'll just throw a more specific error.
      throw new Error(`Failed to connect to Ollama at ${OLLAMA_HOST}.`);
    }
    
    throw new Error('An unexpected error occurred while communicating with the AI model.');
  }
}
