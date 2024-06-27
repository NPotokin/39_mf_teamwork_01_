import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'

import App from './App'

beforeAll(() => {
  window.matchMedia = jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }))
})

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve({ message: 'Success' }) })
)

test('renders home page component for "/" route', async () => {
  render(<App />)

  const homePageElement = await screen.findByText(/WELCOME/i)
  expect(homePageElement).toBeInTheDocument()
})
