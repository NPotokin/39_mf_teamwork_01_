import { fireEvent, render } from '@testing-library/react'
import LeaderBoard from '../LeaderBoard'
import '@testing-library/jest-dom'
import { RoutePath } from '@/core/Routes.enum'

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
const mockNavigate = jest.fn()
jest.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}))
describe('LeaderBoard', () => {
  it('renders leader', () => {
    const { getByText } = render(<LeaderBoard />)

    expect(getByText('Leaderboard')).toBeInTheDocument()
  })
  it('renders Back button and navigates on click', () => {
    const { getByText } = render(<LeaderBoard />)
    const backBtn = getByText('Back')

    expect(backBtn).toBeInTheDocument()

    fireEvent.click(backBtn)

    expect(mockNavigate).toHaveBeenCalledWith(RoutePath.HOME)
  })
})
