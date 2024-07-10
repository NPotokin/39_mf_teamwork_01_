import { Link } from 'react-router-dom'
import classNames from 'classnames'

import { RoutePath } from '@/core/Routes.enum'
import logo from '@images/logo_lg.svg'
import styles from './Hero.module.css'

const Hero = () => (
  <div className={styles.root}>
    <div
      className={classNames(
        styles.intro,
        'container'
      )}>
      <img
        className={styles.logo}
        src={logo}
        alt="intro"
        width="280"
        height="268"
      />
      <h1 className={styles.title}>
        WELCOME to Pumpkin Pandas
      </h1>
      <p className={styles.text}>
        Dive into the enchanting world of Pumpkin
        Pandas Land, where you embark on thrilling
        adventures with your adorable panda
        companion. Expore and battle challenges in
        this exciting and immersive game{' '}
      </p>
      <Link
        className="nes-btn is-secondary2"
        to={RoutePath.GAME}>
        Start Play
      </Link>
    </div>
  </div>
)

export default Hero
