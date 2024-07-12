import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

import { RoutePath } from '@/core/Routes.enum'
import styles from './MenuMobile.module.scss'

const Menu = () => (
  <div className={styles.root}>
    <ul
      className={classNames(styles.menu, 'list')}>
      <li className={styles.item}>
        <NavLink
          to={RoutePath.FORUM}
          className={({ isActive }) =>
            classNames(styles.link, {
              'is-active': isActive,
            })
          }>
          Forum page
        </NavLink>
      </li>
      <li className={styles.item}>
        <NavLink
          to={RoutePath.LEADER_BOARD}
          className={({ isActive }) =>
            classNames(styles.link, {
              'is-active': isActive,
            })
          }>
          Leaderboard
        </NavLink>
      </li>
      <li className={styles.item}>
        <NavLink
          to={RoutePath.PROFILE}
          className={({ isActive }) =>
            classNames(styles.link, {
              'is-active': isActive,
            })
          }>
          Profile
        </NavLink>
      </li>
      <li className={styles.item}>
        <NavLink
          to={RoutePath.GAME}
          className={({ isActive }) =>
            classNames(styles.link, {
              'is-active': isActive,
            })
          }>
          Game
        </NavLink>
      </li>
    </ul>
  </div>
)

export default Menu
