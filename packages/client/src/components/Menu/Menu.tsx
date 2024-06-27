import { Link } from 'react-router-dom'
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
      <Link to={RoutePath.FORUM} className={styles.link}>
        Forum page
      </Link>
    </li>
    <li className={styles.item}>
      <Link to={RoutePath.LEADER_BOARD} className={styles.link}>
        Leaderboard
      </Link>
    </li>
    <li className={styles.item}>
      <Link to={RoutePath.PROFILE} className={styles.link}>
        Profile
      </Link>
    </li>
    {variant === 'bottom' && (
      <li className={styles.item}>
        <Link to={RoutePath.GAME} className={styles.link}>
          Game
        </Link>
      </li>
    )}
  </ul>
)

export default Menu
