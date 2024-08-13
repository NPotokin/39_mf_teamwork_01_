import { createProxyMiddleware } from 'http-proxy-middleware'

const HOST = 'https://ya-praktikum.tech/api/v2'

/**
 * Проксирование запросов на апи практикума
 */
const yandexApiProxy = createProxyMiddleware({
  changeOrigin: true,
  cookieDomainRewrite: {
    '*': '',
  },
  pathRewrite: {
    '/yandex-api': '',
  },
  target: HOST,
})

export default yandexApiProxy
