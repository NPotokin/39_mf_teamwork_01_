import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

dotenv.config({
  path: resolve(__dirname, '../../.env'),
})

// https://vitejs.dev/config/

export default defineConfig({
  server: {
    host: true,
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: JSON.stringify(process.env.SERVER_PORT),
    __SERVER_URL__: JSON.stringify(process.env.SERVER_URL),
    __YANDEX_AUTH_URL__: JSON.stringify(process.env.YANDEX_AUTH_URL),
    __YANDEX_REDIRECT_URI__: JSON.stringify(process.env.YANDEX_REDIRECT_URI),
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
        replacement: resolve(__dirname, './src/assets/images'),
      },
    ],
  },
  build: {
    outDir: 'dist',
    manifest: true,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return
        }
        warn(warning)
      },
    },
  },
})
