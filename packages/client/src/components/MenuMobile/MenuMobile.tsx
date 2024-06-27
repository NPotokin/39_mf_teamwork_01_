import { Link } from 'react-router-dom'
import classNames from 'classnames'

import { RoutePath } from '@/core/Routes.enum'
import styles from './MenuMobile.module.scss'

const Menu = () => (
  <div className={styles.root}>
    <ul className={classNames(styles.menu, 'list')}>
      <li className={styles.item}>
        <Link to={RoutePath.FORUM} className={styles.link || ''}>
          Forum page
        </Link>
      </li>
      <li className={styles.item}>
        <Link to={RoutePath.LEADER_BOARD} className={styles.link || ''}>
          Leaderboard
        </Link>
      </li>
      <li className={styles.item}>
        <Link to={RoutePath.PROFILE} className={styles.link || ''}>
          Profile
        </Link>
      </li>
      <li className={styles.item}>
        <Link to={RoutePath.GAME} className={styles.link || ''}>
          Game
        </Link>
      </li>
    </ul>
  </div>
)

export default Menu
