import { describe, it, expect, vi, afterEach } from 'vitest';
import { askQuestion } from './rag';

// Mock the global fetch
global.fetch = vi.fn();

describe('askQuestion', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return a RAG response on successful API call', async () => {
    const mockResponse = {
      ok: true,
      response: {
        text: 'The sky is blue.',
        sources: [{ id: 'doc1', content: 'The sky is blue because of Rayleigh scattering.' }],
      },
    };
    (fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await askQuestion('Why is the sky blue?');
    expect(result.text).toBe('The sky is blue.');
    expect(result.sources).toHaveLength(1);
    expect(result.sources[0].id).toBe('doc1');
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/ask'), expect.any(Object));
  });

  it('should throw an error if the API response is not ok', async () => {
    const mockResponse = { ok: false, error: 'RAG pipeline failed' };
    (fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await expect(askQuestion('Why?')).rejects.toThrow('Could not get answer from AI: RAG pipeline failed');
  });
});