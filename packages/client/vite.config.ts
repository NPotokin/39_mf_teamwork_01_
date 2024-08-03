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
    __EXTERNAL_SERVER_URL__: JSON.stringify(
      process.env.EXTERNAL_SERVER_URL
    ),
    __INTERNAL_SERVER_URL__: JSON.stringify(
      process.env.INTERNAL_SERVER_URL
    ),
  },
  plugins: [react()],
  publicDir: 'public',
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src'),
      },
      {
        find: '@images',
        replacement: resolve(
          __dirname,
          './src/assets/images'
        ),
      },
    ],
  },
  build: {
    outDir: 'dist',
    manifest: true,
    rollupOptions: {
      onwarn(warning, warn) {
        if (
          warning.code ===
          'MODULE_LEVEL_DIRECTIVE'
        ) {
          return
        }
        warn(warning)
      },
    },
  },
})
