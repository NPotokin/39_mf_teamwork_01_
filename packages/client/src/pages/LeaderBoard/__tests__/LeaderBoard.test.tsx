import { render } from '@testing-library/react'
import LeaderBoard from '../LeaderBoard'
import '@testing-library/jest-dom'

import { MemoryRouter } from 'react-router-dom'
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
describe('LeaderBoard', () => {
  it('renders leader', () => {
    const { getByText } = render(
      <MemoryRouter>
        <LeaderBoard />
      </MemoryRouter>
    )

    expect(getByText('SCORE')).toBeInTheDocument()
    expect(getByText('NAME')).toBeInTheDocument()
  })
})
