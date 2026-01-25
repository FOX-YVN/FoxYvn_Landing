import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

const plugins = [react(), tailwindcss()];

const basePath = process.env.BASE_PATH
  ? ensureTrailingSlash(process.env.BASE_PATH)
  : process.env.GITHUB_ACTIONS
    ? "/Fox_Yvn_Landing/"
    : "/";

function ensureTrailingSlash(pathValue: string) {
  return pathValue.endsWith("/") ? pathValue : `${pathValue}/`;
}

export default defineConfig({
  plugins,
  base: basePath, // GitHub Pages base path
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    strictPort: false, // Will find next available port if 5173 is busy
    
    // 🔴 КРИТИЧНО для WSL + Podman - слушаем на всех интерфейсах
    host: "0.0.0.0",
    
    // HMR конфигурация для работы через WSL
    hmr: {
      host: "localhost",
      port: 5173,
      protocol: "http"
    },
    
    // 🔴 КРИТИЧНО для WSL - включаем polling вместо file system events
    watch: {
      usePolling: true,
      interval: 100,
    },
    
    // Allowed hosts for development
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "0.0.0.0",
    ],
    
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
