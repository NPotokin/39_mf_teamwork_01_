import { PRAKTIKUM_HOST } from '../constants'
import { createProxyMiddleware } from 'http-proxy-middleware'

/**
 * Проксирование запросов на апи практикума
 */
const yandexApiProxy = createProxyMiddleware({
  changeOrigin: true,
  cookieDomainRewrite: {
    '*': '',
  },
  pathRewrite: {
    '^/yandex-api': '',
  },
  target: PRAKTIKUM_HOST,
})

export default yandexApiProxy
