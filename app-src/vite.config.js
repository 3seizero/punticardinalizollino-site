import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Ogni progetto è servito sul ROOT del proprio sottodominio di terzo livello
// (es. https://otranto.<dominio>/), quindi base: '/'.
// Sorgenti in app-src/ (sviluppo) → build committato in ../app (produzione, servito da Plesk).
export default defineConfig({
  base: '/',
  build: {
    outDir: '../app',
    emptyOutDir: true,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      // Il manifest è statico e specifico per progetto: vive in public/site.webmanifest
      manifest: false,
      includeAssets: ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
        navigateFallback: '/index.html',
      },
    }),
  ],
})
