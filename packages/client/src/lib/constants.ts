import { Env } from './types'

export const YANDEX_API_URL = '/yandex-api'
export const RESOURCE_URL = `${YANDEX_API_URL}/resources`
export const TITLES = {
  HOME: 'Pumpkin Panda - Game for heros',
  GAME: 'Pumpkin Panda - start your game and win',
  SIGN_IN: 'Pumpkin Panda - Sign In for start game',
  SIGN_UP: 'Pumpkin Panda - Sign Up for start game',
  PROFILE: 'Pumpkin Panda - Settings and profile',
  LEADER_BOARD: 'Pumpkin Panda - Leader Board',
  FORUM: 'Pumpkin Panda - Forum topics',
} as const

export const environment: Env = (process.env.NODE_ENV as Env) || 'production'

export const ENVIRONMENT = {
  DEVELOPMENT: environment === 'development',
  PRODUCTION: environment === 'production',
} as const
