import { CSPDirectives } from 'csp-header'
import { INLINE, SELF, NONE } from 'express-csp-header'

const YANDEX_API_HOST = 'https://ya-praktikum.tech/api/v2'

export const getCspDirectives = (): Partial<CSPDirectives> => {
  const directives: Partial<CSPDirectives> = {
    'default-src': [SELF],
    'script-src': [SELF, INLINE],
    'style-src': [SELF, INLINE, 'https://fonts.googleapis.com'],
    'font-src': [SELF, 'https://fonts.gstatic.com'],
    'img-src': [SELF, 'data:', YANDEX_API_HOST],
    'connect-src': [SELF, YANDEX_API_HOST],
    'frame-ancestors': [NONE],
    'worker-src': [SELF],
    'block-all-mixed-content': true,
  }

  if (process.env.NODE_ENV !== 'development') {
    directives['script-src']?.push('nonce')
  } else {
    const vitePort = process.env.VITE_PORT || '24678'
    directives['connect-src']?.push(`ws://localhost:${vitePort}`)
  }

  return directives
}
