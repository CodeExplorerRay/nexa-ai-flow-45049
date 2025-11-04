import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import dotenv from 'dotenv';
import { generateRoute } from './routes/generate';

dotenv.config();

const app = express();

// --- Middleware ---
app.use(helmet()); // Apply security headers
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies

// Rate limiting to prevent abuse
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per window
	standardHeaders: true,
	legacyHeaders: false,
});
app.use(limiter);


// --- Routes ---
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ ok: true, status: 'healthy' });
});
app.use('/api/generate', generateRoute);


// --- Error Handling ---
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ ok: false, error: 'Internal Server Error' });
});


const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Ollama proxy server running on http://localhost:${PORT}`);
  });
}

export default app;