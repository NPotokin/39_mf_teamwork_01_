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
    outDir: path.join(__dirname, 'dist/client'),
    rollupOptions: {
      output: {
        format: 'cjs',
        dir: 'dist-ssr',
      },
    },
  },
})
