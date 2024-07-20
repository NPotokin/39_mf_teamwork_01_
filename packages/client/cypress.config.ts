import { defineConfig } from 'cypress'
import vitePreprocessor from 'cypress-vite'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    specPattern:
      './cypress/integration/**/*.spec.{ts,tsx}',
    setupNodeEvents(on) {
      on('file:preprocessor', vitePreprocessor())
    },
  },
  viewportHeight: 1080,
  viewportWidth: 1920,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  pageLoadTimeout: 600000,
  env: {
    apiUrl: 'https://ya-praktikum.tech/api/v2/',
  },
})
