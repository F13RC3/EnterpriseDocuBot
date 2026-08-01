import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'
import path from 'path'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@root': path.resolve(__dirname, '..'),
      '@docs': path.resolve(__dirname, '../docs')
    }
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
})
