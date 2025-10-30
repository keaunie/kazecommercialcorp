import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,//Client port
    proxy: {
      '/api': 'http://localhost:5174'//Server port
    }
  },
  build: {
    outDir: 'dist',
  }
})
