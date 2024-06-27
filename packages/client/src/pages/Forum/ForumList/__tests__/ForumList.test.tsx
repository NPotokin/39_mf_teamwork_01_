import { fireEvent, render } from '@testing-library/react'

import '@testing-library/jest-dom'
import { RoutePath } from '@/core/Routes.enum'
import ForumList from '../ForumList'
import { mockData } from '../../mockData'

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
      <ForumList
        dataSource={mockData}
        columns={columnsForumList}
        showModal={jest.fn}
      />
    )

    expect(getByText('Forums')).toBeInTheDocument()
  })
  it('renders Back button and navigates on click', () => {
    const showModalForumList = jest.fn()
    const { getByText } = render(
      <ForumList
        dataSource={mockData}
        columns={columnsForumList}
        showModal={showModalForumList}
      />
    )
    const backBtn = getByText('Back')
    const addTopicBtn = getByText('Add Topic')

    expect(getByText('Back')).toBeInTheDocument()

    fireEvent.click(backBtn)

    expect(mockNavigate).toHaveBeenCalledWith(RoutePath.HOME)

    fireEvent.click(addTopicBtn)

    expect(showModalForumList).toHaveBeenCalled()
  })
})
