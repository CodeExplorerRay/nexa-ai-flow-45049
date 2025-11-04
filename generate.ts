import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2';

router.post('/', async (req: Request, res: Response) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ ok: false, error: 'Prompt is required and must be a string.' });
  }

  try {
    const response = await axios.post(`${OLLAMA_HOST}/api/generate`, {
      model: OLLAMA_MODEL,
      prompt: prompt,
      stream: false,
    });

    res.json({ ok: true, data: response.data });

  } catch (err) {
    console.error("Error proxying to Ollama:", err);
    const message = axios.isAxiosError(err) ? err.message : 'An internal error occurred.';
    res.status(500).json({ ok: false, error: message });
  }
});

export { router as generateRoute };