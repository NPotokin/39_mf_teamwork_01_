import { Topic } from '@/core/contexts/ForumContext'

export const mockData: Topic[] = [
  {
    topicId: '1',
    name: 'New games',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    count: '3',
    comments: [
      {
        commentId: '1',
        content: 'interesting',
        emoji: '',
        topicId: '1',
      },
      { commentId: '2', content: 'no bad', emoji: '', topicId: '1' },
      {
        commentId: '3',
        content: 'i like it',
        emoji: '',
        topicId: '1',
      },
    ],
  },
  {
    topicId: '2',
    name: 'Gamedev',
    count: '3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    comments: [
      { commentId: '1', content: 'ok', emoji: '', topicId: '2' },
      {
        commentId: '2',
        content: 'chudesno',
        emoji: '',
        topicId: '2',
      },
      { commentId: '3', content: 'super', emoji: '', topicId: '2' },
    ],
  },
  {
    topicId: '3',
    name: 'Game design',
    count: '3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    comments: [
      {
        commentId: '1',
        content: 'i love it',
        emoji: '',
        topicId: '3',
      },
      { commentId: '2', content: 'its ok', emoji: '', topicId: '3' },
      { commentId: '3', content: 'eee', emoji: '', topicId: '3' },
    ],
  },
  {
    topicId: '4',
    name: 'Technologies',
    count: '3',
    description: 'This is the content of Technologies topic',
    comments: [
      { commentId: '1', content: 'ok', emoji: '', topicId: '4' },
      { commentId: '2', content: 'eee', emoji: '', topicId: '4' },
      { commentId: '3', content: 'amazing', emoji: '', topicId: '4' },
    ],
  },
]
