import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages deployment configuration
const base = '/'

export default defineConfig({
  plugins: [react()],
  base: base,
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  }
})
