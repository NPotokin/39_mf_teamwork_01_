import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

import path from 'node:path'
import fs from 'node:fs/promises'

function MoveManifestPlugin(desiredManifestPath) {
  let outDir, manifest

  const defaultManifestPath = './manifest.json'

  return {
    name: 'move-manifest',
    configResolved(resolvedConfig) {
      outDir = resolvedConfig.build.outDir

      const resolvedManifest =
        resolvedConfig.build.manifest
      if (resolvedManifest) {
        manifest =
          typeof resolvedManifest === 'string'
            ? resolvedManifest
            : defaultManifestPath
      } else {
        manifest = false
      }
    },
    async writeBundle(_options, _bundle) {
      if (manifest === false) return

      await fs.rename(
        path.resolve(__dirname, outDir, manifest),
        desiredManifestPath
      )
    },
  }
}

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
  },
  plugins: [
    react(),
    MoveManifestPlugin(
      './dist/static/manifest.json'
    ),
  ],
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
