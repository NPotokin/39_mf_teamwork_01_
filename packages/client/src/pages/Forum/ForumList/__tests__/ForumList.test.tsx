import { fireEvent, render } from '@testing-library/react'
import { expect, jest } from '@jest/globals'
import '@testing-library/jest-dom'
import ForumList from '../ForumList'
import { mockData } from '../../mockData'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@/core/contexts'

const columnsForumList = [
  {
    title: 'NAME',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'COMMENTS',
    dataIndex: 'commentsCount',
    key: 'commentsCount',
  },
]
describe('ForumList', () => {
  it('renders leader', () => {
    const { getByText } = render(
      <ThemeProvider>
        <MemoryRouter>
          <ForumList
            dataSource={mockData}
            columns={columnsForumList}
            showModal={jest.fn}
          />
        </MemoryRouter>
      </ThemeProvider>
    )

    expect(getByText('COMMENTS')).toBeInTheDocument()
  })
  it('renders Back button and navigates on click', () => {
    const showModalForumList = jest.fn()
    const { getByText } = render(
      <ThemeProvider>
        <MemoryRouter>
          <ForumList
            dataSource={mockData}
            columns={columnsForumList}
            showModal={showModalForumList}
          />
        </MemoryRouter>
      </ThemeProvider>
    )

    const addTopicBtn = getByText('Add Topic')

    fireEvent.click(addTopicBtn)

    expect(showModalForumList).toHaveBeenCalled()
  })
})
