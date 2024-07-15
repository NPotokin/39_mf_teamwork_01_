export const RoutePath = {
  HOME: '/',
  GAME: '/game',
  ERROR: '*',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  PROFILE: '/profile',
  LEADER_BOARD: '/leaderboard',
  FORUM: '/forum',
  PAGE_NOT_FOUND: '/404',
  SERVER_ERROR: '/500',
} as const

export type RoutePathType =
  typeof RoutePath[keyof typeof RoutePath]
