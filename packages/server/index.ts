import 'dotenv/config'
import express from 'express'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import cors from 'cors'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'

import { createClientAndConnect } from './db'
import { ENVIRONMENT } from './config/environment'
import {
  CLIENT_PATH,
  CLIENT_DIST_PATH,
  CLIENT_DIST_SSR_PATH,
} from './config/paths'

const isDevMode = ENVIRONMENT.DEVELOPMENT

async function startServer() {
  const app = express()
  app.use(cors())

  const port =
    Number(process.env.SERVER_PORT) || 3001

  createClientAndConnect()

  let vite: ViteDevServer | undefined

  if (isDevMode) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: CLIENT_PATH,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  } else {
    app.use(
      '/assets',
      express.static(
        resolve(CLIENT_DIST_PATH, 'assets')
      )
    )
    app.use(
      '/sounds',
      express.static(
        resolve(CLIENT_DIST_PATH, 'sounds')
      )
    )
    app.use(
      '/static',
      express.static(
        resolve(CLIENT_DIST_PATH, 'static')
      )
    )
    app.use(
      '/manifest.json',
      express.static(
        resolve(CLIENT_DIST_PATH, 'manifest.json')
      )
    )
    app.use(
      '/sw.js',
      express.static(
        resolve(CLIENT_DIST_PATH, 'sw.js')
      )
    )
  }

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string

      if (!isDevMode) {
        template = readFileSync(
          resolve(CLIENT_DIST_PATH, 'index.html'),
          'utf-8'
        )
      } else {
        template = readFileSync(
          resolve(CLIENT_PATH, 'index.html'),
          'utf-8'
        )

        template = await vite!.transformIndexHtml(
          url,
          template
        )
      }

      let render: () => Promise<string>
      if (!isDevMode) {
        render = (
          await import(
            resolve(
              CLIENT_DIST_SSR_PATH,
              'client.cjs'
            )
          )
        ).render
      } else {
        render = (
          await vite!.ssrLoadModule(
            resolve(CLIENT_PATH, 'ssr-entry.tsx')
          )
        ).render
      }

      const appHtml = await render()

      const html = template.replace(
        '<!--ssr-outlet-->',
        appHtml
      )

      res
        .status(200)
        .set({ 'Content-Type': 'text/html' })
        .end(html)
    } catch (error) {
      if (isDevMode && vite) {
        vite.ssrFixStacktrace(error as Error)
      }

      next(error)
    }
  })

  app.listen(port, () => {
    console.log(
      `  ➜ 🎸 Server is listening on port: ${port}`
    )
  })
}

startServer()
