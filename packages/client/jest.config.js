import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __dirname = dirname(
  fileURLToPath(import.meta.url)
)

dotenv.config({
  path: resolve(__dirname, '../../.env'),
})

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: JSON.stringify(
      process.env.SERVER_PORT
    ),
    __SERVER_URL__:
      JSON.stringify(process.env.SERVER_URL),
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss|svg|png)$':
      'identity-obj-proxy',
    '^antd/lib/(.*)$': 'antd/lib/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTest.ts'],
}
