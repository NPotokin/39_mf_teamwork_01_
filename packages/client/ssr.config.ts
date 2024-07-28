import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(
  fileURLToPath(import.meta.url)
)

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
})

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      '@images': path.resolve(
        './src/assets/images'
      ),
    },
  },
  build: {
    lib: {
      entry: path.resolve(
        __dirname,
        'ssr-entry.tsx'
      ),
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
