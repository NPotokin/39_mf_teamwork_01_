import App from './App'
import { render, waitFor } from '@testing-library/react'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve({ message: 'Success' }) })
)

test('fetches data from server on mount', async () => {
  const consoleSpy = jest.spyOn(console, 'log')

  render(<App />)

  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))
  await waitFor(() =>
    expect(consoleSpy).toHaveBeenCalledWith({ message: 'Success' })
  )

  consoleSpy.mockRestore()
})
