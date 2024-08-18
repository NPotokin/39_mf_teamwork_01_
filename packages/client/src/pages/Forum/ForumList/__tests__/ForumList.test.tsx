import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import ForumList from '../ForumList'
import { mockData } from '../../mockData'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@/core/contexts'
import { Provider } from 'react-redux'
import { store } from '@/state/store'

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
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <ForumList dataSource={mockData} columns={columnsForumList} showModal={jest.fn} />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    )

    expect(getByText('COMMENTS')).toBeInTheDocument()
  })
  it('renders Back button and navigates on click', () => {
    const showModalForumList = jest.fn()
    const { getByText } = render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <ForumList
              dataSource={mockData}
              columns={columnsForumList}
              showModal={showModalForumList}
            />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    )

    const addTopicBtn = getByText('Add Topic')

    fireEvent.click(addTopicBtn)

    expect(showModalForumList).toHaveBeenCalled()
  })
})
