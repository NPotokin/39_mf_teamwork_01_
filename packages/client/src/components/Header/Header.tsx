import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { Header as AntHeader } from 'antd/lib/layout/layout'
import { CloseOutlined, MenuOutlined } from '@ant-design/icons'
import classNames from 'classnames'

import { RoutePath } from '@/core/Routes.enum'
import { Menu } from '@/components/Menu'
import { Logo } from '@/components/Logo'
import { MenuMobile } from '@/components/MenuMobile'
import { ThemeToggle } from '@/components/ThemeToggle'
import styles from './Header.module.scss'

const Header = () => {
  const [visible, setVisible] = useState(false)

  const toggleMenu = () => {
    setVisible(!visible)
  }

  const onClose = () => {
    setVisible(false)
  }

  return (
    <AntHeader className={styles.root}>
      <Link to={RoutePath.HOME}>
        <Logo className={styles.logo} title="Panda" />
      </Link>
      <Menu className={styles.menu} />
      <div className={styles.action}>
        <Link
          className={classNames('nes-btn is-primary', styles.button)}
          to={RoutePath.GAME}>
          Play now
        </Link>
      </div>
      <ThemeToggle className={styles.theme} />
      <Button
        className={classNames(styles.burger, 'burger-button')}
        type="link"
        onClick={toggleMenu}>
        <MenuOutlined />
      </Button>
      {visible && (
        <>
          <MenuMobile />
          <Button
            type="link"
            className={classNames(styles.close, 'close-button')}
            onClick={onClose}>
            <CloseOutlined />
          </Button>
        </>
      )}
    </AntHeader>
  )
}

export default Header
