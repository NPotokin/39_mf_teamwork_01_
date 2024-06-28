import { fireEvent, render } from '@testing-library/react'
import TopicDetails from '../TopicDetails'
import '@testing-library/jest-dom'

import { mockData } from '../../mockData'
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

const commentsColumns = [
  {
    title: 'COMMENT',
    dataIndex: 'comment',
    key: 'comment',
  },
]
const onBack = jest.fn()
const showCommentModal = jest.fn()
const selectedTopic = mockData[0]
const selectedComments = mockData[0].comments

describe('TopicDetails', () => {
  it('renders leader', () => {
    const { getByText } = render(
      <MemoryRouter>
        <TopicDetails
          selectedTopic={selectedTopic}
          selectedComments={selectedComments}
          commentsColumns={commentsColumns}
          onBack={onBack}
          showCommentModal={showCommentModal}
        />
      </MemoryRouter>
    )
    expect(getByText(selectedTopic.name)).toBeInTheDocument()
  })
  it('renders Back button,  Add Comment button and navigates on click', () => {
    const { getByText } = render(
      <MemoryRouter>
        <TopicDetails
          selectedTopic={selectedTopic}
          selectedComments={selectedComments}
          commentsColumns={commentsColumns}
          onBack={onBack}
          showCommentModal={showCommentModal}
        />
      </MemoryRouter>
    )
    const backBtn = getByText('Back')
    const addCommentBtn = getByText('Add Comment')

    expect(backBtn).toBeInTheDocument()
    expect(addCommentBtn).toBeInTheDocument()

    fireEvent.click(backBtn)

    expect(onBack).toHaveBeenCalled()

    fireEvent.click(addCommentBtn)

    expect(showCommentModal).toHaveBeenCalled()
  })
})
