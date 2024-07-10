import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
    __API_URL__: `'${process.env.API_URL}'`,
    __DEV__:
      process.env.NODE_ENV === 'development',
  },
  plugins: [react()],
  publicDir: 'public',
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      '@images': path.resolve(
        './src/assets/images'
      ),
    },
  },
  build: {
    manifest: true,
  },
})
