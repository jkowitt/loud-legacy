import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// Use a base path in production so Valora can be served under
// loud-legacy.com's /valora/ subpath without any environment config.
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/valora/" : "/",
  plugins: [react()],
  server: {
    port: 5173,
    host: "0.0.0.0",
  },
  preview: {
    port: 4173,
  },
}));
