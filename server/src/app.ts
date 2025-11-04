import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { generateRoute } from "./routes/generate";
import { askRoute } from "./routes/ask";
import { authRoute } from "./routes/auth";
import { piiRedactor } from "./lib/piiRedactor";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 🧱 Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
// parse cookies for oauth state and session handling
app.use(cookieParser());

// 🧾 Request logging with PII redaction
app.use(
  morgan((tokens, req, res) => {
    const logData = {
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: tokens.status(req, res),
      contentLength: tokens.res(req, res, "content-length"),
      responseTime: tokens["response-time"](req, res) + " ms",
      body: piiRedactor(req.body),
    };
    return JSON.stringify(logData);
  })
);

// 🚦 Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// 🧩 Routes
app.use("/api/generate", generateRoute);
app.use("/api/ask", askRoute);
app.use("/api/auth", authRoute);

// 🩺 Health check
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ ok: true, status: "healthy" });
});

// ⚠️ Centralized Error Handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ ok: false, error: "Internal Server Error" });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
}

export default app;
