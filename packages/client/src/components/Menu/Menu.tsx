import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

import { RoutePath } from '@/core/Routes.enum'
import styles from './Menu.module.scss'

type MenuProps = {
  className?: string
  variant?: 'horizontal' | 'vertical' | 'bottom' | 'top'
}

const Menu: React.FC<MenuProps> = ({ variant, className }) => (
  <ul className={classNames(styles.root, className, 'list')}>
    <li className={styles.item}>
      <NavLink
        to={RoutePath.FORUM}
        className={({ isActive }) =>
          classNames(styles.link, { 'is-active': isActive })
        }>
        Forum page
      </NavLink>
    </li>
    <li className={styles.item}>
      <NavLink
        to={RoutePath.LEADER_BOARD}
        className={({ isActive }) =>
          classNames(styles.link, { 'is-active': isActive })
        }>
        Leaderboard
      </NavLink>
    </li>
    {variant === 'bottom' && (
      <>
        <li className={styles.item}>
          <NavLink
            to={RoutePath.PROFILE}
            className={({ isActive }) =>
              classNames(styles.link, { 'is-active': isActive })
            }>
            Profile
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink
            to={RoutePath.GAME}
            className={({ isActive }) =>
              classNames(styles.link, { 'is-active': isActive })
            }>
            Game
          </NavLink>
        </li>
      </>
    )}
  </ul>
)

export default Menu
