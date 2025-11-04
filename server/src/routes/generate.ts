import { Router, Request, Response } from 'express';
import { generate } from '../lib/ollamaClient';
import { validatePrompt } from '../lib/inputValidator';

const router = Router();

router.post('/', validatePrompt, async (req: Request, res: Response) => {
  const { prompt } = req.body;

  try {
    const responseText = await generate(prompt);
    res.json({ ok: true, response: responseText });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ ok: false, error: errorMessage });
  }
});

export { router as generateRoute };
