import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import Loader from './Loader'

describe('Testing loader', () => {
  it('renders without crashing', () => {
    render(<Loader />)
  })

  it('displays CircularProgress', () => {
    const { getByRole } = render(<Loader />)
    const circularProgressElement = getByRole(
      'progressbar'
    )
    expect(
      circularProgressElement
    ).toBeInTheDocument()
  })
})
