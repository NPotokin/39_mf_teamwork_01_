import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { Header as AntHeader } from 'antd/lib/layout/layout'
import { CloseOutlined, MenuOutlined, LogoutOutlined } from '@ant-design/icons'
import classNames from 'classnames'

import { RoutePath } from '@/core/Routes.enum'
import { Menu } from '@/components/Menu'
import { Logo } from '@/components/Logo'
import { MenuMobile } from '@/components/MenuMobile'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux'
import { resetUser } from '@/state/user/userSlice'
import styles from './Header.module.scss'
import { logout } from '@/core/services/auth.service'

type Props = {
  isGamePage?: boolean
}
const Header = (props: Props) => {
  const { isGamePage } = props
  const [visible, setVisible] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const userLogin = useAppSelector(state => state.user.login)

  const toggleMenu = () => {
    setVisible(!visible)
  }

  const onClose = () => {
    setVisible(false)
  }

  const handleLogout = async () => {
    const success = await logout()

    if (success) {
      dispatch(resetUser())
      navigate(RoutePath.SIGN_IN)
    }
  }

  return (
    <AntHeader className={styles.root}>
      <Link to={RoutePath.HOME}>
        <Logo className={styles.logo} title="Panda" />
      </Link>
      <Menu className={styles.menu} />
      <div className={styles.action}>
        {!isGamePage && (
          <Link
            className={classNames('nes-btn is-primary', styles.button)}
            to={RoutePath.GAME}>
            Play now
          </Link>
        )}
        <NavLink
          to={RoutePath.PROFILE}
          className={({ isActive }) =>
            classNames(styles.link, { 'is-active': isActive })
          }>
          {userLogin}
        </NavLink>
        <Button
          type="link"
          className={classNames(styles.logout)}
          onClick={handleLogout}>
          <LogoutOutlined />
        </Button>
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
      </div>
    </AntHeader>
  )
}

export default Header
