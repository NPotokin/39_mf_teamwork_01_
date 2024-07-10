import { Footer as AntFooter } from 'antd/lib/layout/layout'

import { Menu } from '@/components/Menu'
import { Logo } from '@/components/Logo'

import styles from './Footer.module.scss'

const Footer = () => (
  <AntFooter className={styles.root}>
    <Logo className={styles.logo} title="Panda" />
    <Menu
      className={styles.menu}
      variant="bottom"
    />
    <p className={styles.copyright}>
      @ 2024 Pumpkin Pandas
    </p>
  </AntFooter>
)

export default Footer
