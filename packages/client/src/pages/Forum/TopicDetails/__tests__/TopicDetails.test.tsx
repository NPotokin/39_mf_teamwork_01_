import { fireEvent, render } from '@testing-library/react'
import { expect, jest } from '@jest/globals'

import '@testing-library/jest-dom'
import TopicDetails from '../TopicDetails'
import { mockData } from '../../mockData'
import { MemoryRouter } from 'react-router'
import { ThemeProvider } from '@/core/contexts'

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
      <ThemeProvider>
        <MemoryRouter>
          <TopicDetails
            selectedTopic={selectedTopic}
            selectedComments={selectedComments}
            commentsColumns={commentsColumns}
            onBack={onBack}
            showCommentModal={showCommentModal}
          />
        </MemoryRouter>
      </ThemeProvider>
    )

    expect(getByText(selectedTopic.name)).toBeInTheDocument()
  })
  it('renders Back button,  Add Comment button and navigates on click', () => {
    const { getByText } = render(
      <ThemeProvider>
        <MemoryRouter>
          <TopicDetails
            selectedTopic={selectedTopic}
            selectedComments={selectedComments}
            commentsColumns={commentsColumns}
            onBack={onBack}
            showCommentModal={showCommentModal}
          />
        </MemoryRouter>
      </ThemeProvider>
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
