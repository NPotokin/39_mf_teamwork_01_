import classNames from 'classnames'

import logo from '@images/logo_sm.svg'
import styles from './Logo.module.scss'

type LogoProps = {
  title: string
  className?: string
}

const Logo: React.FC<LogoProps> = ({ title, className }) => (
  <span className={classNames(styles.root, className || '')}>
    <img
      className={styles.image}
      src={logo}
      alt={title}
      width="40"
      height="40"
    />
  </span>
)

export default Logo
