import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// Use a base path in production so Valora can be served under
// loud-legacy.com's /valora/ subpath without any environment config.
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/valora/" : "/",
  plugins: [react()],
  resolve: {
    // Ensure only one React copy and allow linked packages to resolve runtime
    dedupe: ["react", "react-dom"],
    preserveSymlinks: true,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react/jsx-runtime"],
  },
  server: {
    port: 5173,
    host: "0.0.0.0",
  },
  preview: {
    port: 4173,
  },
}));
