import express, { Request as ExpressRequest } from 'express'
import 'dotenv/config'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import cors from 'cors'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'
import serialize from 'serialize-javascript'
import cookieParser from 'cookie-parser'

import { createClientAndConnect } from './db'
import { ENVIRONMENT } from './config/environment'
import { CLIENT_PATH, CLIENT_DIST_PATH, CLIENT_DIST_SSR_PATH } from './config/paths'
import router from './routes'
import { errorHandler, isAuthenticated, yandexApiProxy } from './middleware'
import { xssValidator } from './middleware/xssValidation'

const isDevMode = ENVIRONMENT.DEVELOPMENT

async function startServer() {
  const app = express()
  app.use(cookieParser())

  app.use(xssValidator())

  // CLIENT_PORT replaced to SERVER_PORT
  app.use(
    cors({
      origin: process.env.SERVER_PORT,
      credentials: true,
    })
  )

  app.use('/yandex-api', yandexApiProxy)
  app.use(express.json())

  const port = Number(process.env.SERVER_PORT) || 3001

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
    app.use('/assets', express.static(resolve(CLIENT_DIST_PATH, 'assets')))
    app.use('/sounds', express.static(resolve(CLIENT_DIST_PATH, 'sounds')))
    app.use('/static', express.static(resolve(CLIENT_DIST_PATH, 'static')))
    app.use('/manifest.json', express.static(resolve(CLIENT_DIST_PATH, 'manifest.json')))
    app.use('/sw.js', express.static(resolve(CLIENT_DIST_PATH, 'sw.js')))
  }

  app.use('/api', isAuthenticated, router)

  app.use((req, res, next) => {
    req.setTimeout(20000, () => {
      res.status(408).send('Request Timeout')
    })
    next()
  })

  // Глобальный middleware обработки ошибок
  app.use(errorHandler)

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string

      if (!isDevMode) {
        template = readFileSync(resolve(CLIENT_DIST_PATH, 'index.html'), 'utf-8')
      } else {
        template = readFileSync(resolve(CLIENT_PATH, 'index.html'), 'utf-8')

        template = await vite!.transformIndexHtml(url, template)
      }

      let render: (req: ExpressRequest) => Promise<{
        html: string
        initialState: unknown
        cookie: string
      }>

      if (!isDevMode) {
        render = (await import(resolve(CLIENT_DIST_SSR_PATH, 'client.cjs'))).render
      } else {
        render = (await vite!.ssrLoadModule(resolve(CLIENT_PATH, 'ssr-entry.tsx'))).render
      }

      const { html: appHtml, initialState } = await render(req)

      const html = template.replace(`<!--ssr-outlet-->`, appHtml).replace(
        `<!--ssr-initial-state-->`,
        `<script>window.APP_INITIAL_STATE = ${serialize(initialState, {
          isJSON: true,
        })}
        </script>`
      )

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (error) {
      if (isDevMode && vite) {
        vite.ssrFixStacktrace(error as Error)
      }

      next(error)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
