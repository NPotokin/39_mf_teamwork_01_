import { Link } from 'react-router-dom'

import { RoutePath } from '@/core/Routes.enum'
import styles from './SectionJoin.module.css'

const SectionJoin = () => (
  <div className={styles.root}>
    <div className="container">
      <h2 className={styles.title}>Join Us</h2>
      <div>
        <p>
          You want to join our Pandas community?
        </p>
        <Link
          to={RoutePath.FORUM}
          className="nes-btn is-secondary3">
          Join Us
        </Link>
      </div>
    </div>
  </div>
)

export default SectionJoin
