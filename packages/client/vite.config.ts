import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(
  fileURLToPath(import.meta.url)
)

dotenv.config({
  path: resolve(__dirname, '../../.env'),
})

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
    __API_URL__: `'${process.env.API_URL}'`,
  },
  plugins: [react()],
  publicDir: 'public',
  resolve: {
    alias: {
      '@': resolve('./src'),
      '@images': resolve('./src/assets/images'),
    },
  },
  build: {
    manifest: true,
  },
})
