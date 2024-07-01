import { render } from '@testing-library/react'
import LeaderBoard from '../LeaderBoard'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router'
import { ThemeProvider } from '@/core/contexts'

describe('LeaderBoard', () => {
  it('renders leader', () => {
    const { getByText } = render(
      <ThemeProvider>
        <MemoryRouter>
          <LeaderBoard />
        </MemoryRouter>
      </ThemeProvider>
    )

    expect(getByText('SCORE')).toBeInTheDocument()
  })
})
