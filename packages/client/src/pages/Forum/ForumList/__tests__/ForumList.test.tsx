import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'

import ForumList from '../ForumList'
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
      <MemoryRouter>
        <ForumList
          dataSource={mockData}
          columns={columnsForumList}
          showModal={jest.fn}
        />
      </MemoryRouter>
    )

    expect(getByText('Forums')).toBeInTheDocument()
  })
  it('renders Add button and navigates on click', () => {
    const showModalForumList = jest.fn()
    const { getByText } = render(
      <MemoryRouter>
        <ForumList
          dataSource={mockData}
          columns={columnsForumList}
          showModal={showModalForumList}
        />
      </MemoryRouter>
    )

    const addTopicBtn = getByText('Add Topic')

    fireEvent.click(addTopicBtn)
    expect(showModalForumList).toHaveBeenCalled()
  })
})
