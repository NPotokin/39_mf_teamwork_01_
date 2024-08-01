import dotenv from 'dotenv'
import cors from 'cors'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'

dotenv.config()

import express from 'express'
import * as fs from 'fs'
import * as path from 'path'

const isDev = () =>
  process.env.NODE_ENV === 'development'

async function startServer() {
  const app = express()
  app.use(cors())

  const port =
    Number(process.env.SERVER_PORT) || 3001

  // TODO включить на спринте добавления БД
  // createClientAndConnect()

  let vite: ViteDevServer | undefined
  const clientDistPath = path.resolve(
    '../client/dist'
  )
  const clientSrcPath = path.resolve('../client')
  const clientSsrPath = path.resolve(
    '../client/dist-ssr/client.cjs'
  )

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientSrcPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  } else {
    app.use(
      '/assets',
      express.static(
        path.resolve(clientDistPath, 'assets')
      )
    )
    app.use(
      '/sounds',
      express.static(
        path.resolve(clientDistPath, 'sounds')
      )
    )
    app.use(
      '/static',
      express.static(
        path.resolve(clientDistPath, 'static')
      )
    )
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl
    const isDevMode = isDev()

    try {
      let template: string

      if (!isDevMode) {
        template = fs.readFileSync(
          path.resolve(
            clientDistPath,
            'index.html'
          ),
          'utf-8'
        )
      } else {
        template = fs.readFileSync(
          path.resolve(
            clientSrcPath,
            'index.html'
          ),
          'utf-8'
        )

        template = await vite!.transformIndexHtml(
          url,
          template
        )
      }

      let render: () => Promise<string>
      if (!isDevMode) {
        render = (await import(clientSsrPath))
          .render
      } else {
        render = (
          await vite!.ssrLoadModule(
            path.resolve(
              clientSrcPath,
              'ssr-entry.tsx'
            )
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

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  app.listen(port, () => {
    console.log(
      `  ➜ 🎸 Server is listening on port: ${port}`
    )
  })
}

startServer()
