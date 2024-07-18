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
    __SERVER_PORT__: process.env.SERVER_PORT,
    __API_URL__: `'${process.env.API_URL}'`,
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss|svg|png)$':
      'identity-obj-proxy',
    '^antd/es/(.*)$': 'antd/lib/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTest.ts'],
}
