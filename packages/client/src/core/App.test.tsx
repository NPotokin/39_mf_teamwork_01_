import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'

import App from './App'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve({ message: 'Success' }) })
)

test('renders home page component for "/" route', async () => {
  render(<App />)

  const homePageElement = await screen.findByText(/Home Page/i)
  expect(homePageElement).toBeInTheDocument()
})
