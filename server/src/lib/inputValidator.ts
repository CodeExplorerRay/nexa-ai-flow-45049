import { Request, Response, NextFunction } from 'express';

const PROMPT_MAX_LENGTH = 2000;

export function validatePrompt(req: Request, res: Response, next: NextFunction) {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ ok: false, error: 'Prompt is required and must be a string.' });
  }

  if (prompt.length > PROMPT_MAX_LENGTH) {
    return res.status(400).json({ ok: false, error: `Prompt exceeds maximum length of ${PROMPT_MAX_LENGTH} characters.` });
  }

  // Basic sanitization (more can be added)
  req.body.prompt = prompt.trim();

  next();
}
