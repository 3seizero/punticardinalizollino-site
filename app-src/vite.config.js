import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { copyFileSync, mkdirSync } from 'node:fs'

// Il server non ha il fallback SPA: una rotta aperta direttamente da chi non ha ancora
// il service worker risponde 404. Il QR code delle guide punta a /mareasinistra/#guida,
// quindi quella rotta deve esistere come file statico.
const paginaQr = () => ({
  name: 'pcfw-pagina-qr',
  apply: 'build',
  closeBundle() {
    mkdirSync('../app/mareasinistra', { recursive: true })
    copyFileSync('../app/index.html', '../app/mareasinistra/index.html')
  },
})

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
    paginaQr(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      // Il manifest è statico e specifico per progetto: vive in public/site.webmanifest
      manifest: false,
      includeAssets: ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
        navigateFallback: '/index.html',
        // I PDF delle guide vanno serviti dal server, non sostituiti con la pagina dell'app
        navigateFallbackDenylist: [/^\/guide\//],
      },
    }),
  ],
})
