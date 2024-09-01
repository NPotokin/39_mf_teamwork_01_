import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve('./src'),
      '@images': resolve('./src/assets/images'),
    },
  },
  define: {
    __SERVER_PORT__: JSON.stringify(process.env.SERVER_PORT),
    __SERVER_URL__: JSON.stringify(process.env.SERVER_URL),
    __YANDEX_AUTH_URL__: JSON.stringify(process.env.YANDEX_AUTH_URL),
    __YANDEX_REDIRECT_URI__: JSON.stringify(process.env.YANDEX_REDIRECT_URI),
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
