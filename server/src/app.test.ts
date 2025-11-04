/// <reference types="@jest/globals" />
import request from 'supertest';
import app from './app';
import { describe, expect, it, jest } from '@jest/globals';
import * as ollamaClient from './lib/ollamaClient';
import axios from 'axios';

jest.mock('./lib/ollamaClient');
jest.mock('axios');

const mockedOllamaClient = ollamaClient as jest.Mocked<typeof ollamaClient>;
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Endpoints', () => {
  describe('GET /health', () => {
    it('should return 200 OK', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ ok: true, status: 'healthy' });
    });
  });

  describe('POST /api/generate', () => {
    it('should return a generated response', async () => {
      mockedOllamaClient.generate.mockResolvedValue('This is a test response.');
      const res = await request(app)
        .post('/api/generate')
        .send({ prompt: 'This is a test' });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ ok: true, response: 'This is a test response.' });
    });

    it('should return 400 for missing prompt', async () => {
      const res = await request(app).post('/api/generate').send({});
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toContain('Prompt is required');
    });

    it('should return 500 on ollama client error', async () => {
      mockedOllamaClient.generate.mockRejectedValue(new Error('Ollama failed'));
      const res = await request(app)
        .post('/api/generate')
        .send({ prompt: 'This is a test' });

      expect(res.statusCode).toEqual(500);
      expect(res.body.error).toEqual('Ollama failed');
    });
  });

  describe('POST /api/ask', () => {
    it('should return a RAG response with sources', async () => {
      // Mock embed service response
      mockedAxios.post.mockResolvedValue({
        data: {
          results: [{ id: 'doc1', content: 'Test document content.' }]
        }
      });
      // Mock ollama response
      mockedOllamaClient.generate.mockResolvedValue('This is a RAG response.');

      const res = await request(app)
        .post('/api/ask')
        .send({ prompt: 'What is this about?' });

      expect(res.statusCode).toEqual(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.response.text).toEqual('This is a RAG response.');
      expect(res.body.response.sources).toHaveLength(1);
      expect(res.body.response.sources[0].content).toEqual('Test document content.');
    });
  });
});