import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Optional: safely import `lovable-tagger` only if installed
let componentTagger: any;
try {
  componentTagger = require("lovable-tagger").componentTagger;
} catch {
  componentTagger = () => ({ name: "noop-tagger" });
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // ✅ Added "./" for cross-OS consistency
    },
  },

  server: {
    host: "localhost", // Use localhost instead of '::' for Windows compatibility
    port: 5173, // Standard Vite port
    open: true, // Auto-open in browser
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },

  build: {
    outDir: "dist",
    sourcemap: mode === "development",
  },
}));
