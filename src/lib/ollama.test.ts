import { describe, it, expect, vi, afterEach } from 'vitest';
import { generateText } from './ollama';

// Mock the global fetch
global.fetch = vi.fn();

describe('generateText', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return generated text on successful API call', async () => {
    const mockResponse = { ok: true, response: 'Hello, world!' };
    (fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await generateText('Say hello');
    expect(result).toBe('Hello, world!');
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/generate'), expect.any(Object));
  });

  it('should throw an error if the API response is not ok', async () => {
    const mockResponse = { ok: false, error: 'AI model is down' };
    (fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await expect(generateText('Say hello')).rejects.toThrow('Could not get response from AI: AI model is down');
  });

  it('should throw an error on network failure', async () => {
    (fetch as vi.Mock).mockRejectedValue(new Error('Network error'));

    await expect(generateText('Say hello')).rejects.toThrow('Could not get response from AI: Network error');
  });
});