import { resolve } from 'path'

import { ENVIRONMENT } from './environment'

export const ROOT_SSR = resolve(
  __dirname,
  '../../'
)
export const ROOT_DIST = resolve(
  __dirname,
  '../../../'
)

export const ROOT_PATH = ENVIRONMENT.DEVELOPMENT
  ? ROOT_SSR
  : ROOT_DIST

export const SERVER_PATH = resolve(
  ROOT_PATH,
  'server'
)
export const CLIENT_PATH = resolve(
  ROOT_PATH,
  'client'
)
export const CLIENT_DIST_PATH = resolve(
  ROOT_PATH,
  'client',
  'dist'
)
export const CLIENT_DIST_SSR_PATH = resolve(
  ROOT_PATH,
  'client',
  'dist-ssr'
)
