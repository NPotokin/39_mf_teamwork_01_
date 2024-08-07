import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

const __dirname = dirname(
  fileURLToPath(import.meta.url)
)

dotenv.config({
  path: resolve(__dirname, '../../.env'),
})

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: Number(process.env.SERVER_PORT) || 3001,
  },
  define: {
    __SERVER_PORT__: Number(
      process.env.SERVER_PORT
    ),
    __SERVER_URL__: JSON.stringify(
      process.env.SERVER_URL
    ),
  },
  resolve: {
    alias: {
      '@': resolve('./src'),
      '@images': resolve('./src/assets/images'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'ssr-entry.tsx'),
      name: 'Client',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        dir: 'dist-ssr',
      },
    },
  },
})
