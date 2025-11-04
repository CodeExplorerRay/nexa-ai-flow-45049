import { Router, Request, Response } from 'express';
import axios from 'axios';
import { generate } from '../lib/ollamaClient';
import { validatePrompt } from '../lib/inputValidator';

const router = Router();
const EMBED_SERVICE_URL = process.env.EMBED_SERVICE_URL || 'http://localhost:8000';

router.post('/', validatePrompt, async (req: Request, res: Response) => {
  const { prompt } = req.body;

  try {
    // 1. Query embedding service to get relevant documents
    const queryResponse = await axios.post(`${EMBED_SERVICE_URL}/query`, {
      query: prompt,
      top_k: 3,
    });

    const sources = queryResponse.data.results;

    // 2. Assemble the RAG prompt
    const context = sources.map((source: any) => source.content).join('\n\n---\n\n');
    const ragPrompt = `Based on the following context, please answer the user's question.
If the context does not contain the answer, say that you don't know.

Context:
${context}

User Question:
${prompt}`;

    // 3. Call the generation model with the assembled prompt
    const responseText = await generate(ragPrompt);

    // 4. Return the response and the sources
    res.json({ ok: true, response: { text: responseText, sources } });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during RAG orchestration';
    console.error('RAG Error:', errorMessage);
    res.status(500).json({ ok: false, error: errorMessage });
  }
});

export { router as askRoute };
