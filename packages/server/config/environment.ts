type Env = 'development' | 'production'

export const environment: Env =
  (process.env.NODE_ENV as Env) || 'production'

export const ENVIRONMENT = {
  DEVELOPMENT: environment === 'development',
  PRODUCTION: environment === 'production',
} as const
