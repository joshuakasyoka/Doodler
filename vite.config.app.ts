import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Vite config for building the app (not the library)
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-app',
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
    },
    assetsDir: 'assets',
  },
  base: '/',
  publicDir: 'public',
})
