import { render } from '@testing-library/react'

import LeaderBoard from '../LeaderBoard'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router'
import { ThemeProvider } from '@/core/contexts'
import { Provider } from 'react-redux'
import { store } from '@/state/store'

describe('LeaderBoard', () => {
  it('renders leader', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <LeaderBoard />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    )

    expect(getByText('SCORE')).toBeInTheDocument()
  })
})
