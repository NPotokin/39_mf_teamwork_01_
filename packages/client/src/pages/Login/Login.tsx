import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import cn from 'classnames'
import { Button } from 'antd/lib'

import { EMPTY_STRING } from '@/core/constants'
import styles from './Login.module.scss'
import { CustomForm } from '@/components'

import { showNotification } from '@/core/services/notification.service'
import { errorInfo } from '@/lib/utils/errorInfo'
import { loginSchema } from '@/lib/validation/validationSchema'
import { titles } from './Login.const'
import logo from '@images/logo_md.svg'
import { RoutePath } from '@/core/Routes.enum'
import { useAppDispatch } from '@/lib/hooks/redux'
import { setUser } from '@/state/user/userSlice'
import { getServiceId, signin } from '@/core/services/auth.service'
import { TITLES } from '@/lib/constants'
import useDocumentTitle from '@/lib/hooks/useDocumentTitle'
import { ThemeProvider } from '@/core/contexts'

const initialValues: LoginForm = {
  login: EMPTY_STRING,
  password: EMPTY_STRING,
}

export type LoginForm = {
  login: string
  password: string
}

const Login = () => {
  useDocumentTitle(TITLES.SIGN_IN)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [serviceId, setServiceId] = useState<string | undefined>('')
  const REDIRECT_URI = __YANDEX_REDIRECT_URI__
  console.log(REDIRECT_URI)

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller
    const fetchServiceId = async () => {
      try {
        const id = await getServiceId(REDIRECT_URI, { signal })
        setServiceId(id)
      } catch (error: unknown) {
        showNotification('error', errorInfo(error))
      }
    }

    fetchServiceId()

    return () => {
      controller.abort()
    }
  }, [])

  const AUTH_URL = __YANDEX_AUTH_URL__
  const authUrl = `${AUTH_URL}?response_type=code&client_id=${serviceId}&redirect_uri=${REDIRECT_URI}`

  const handleSubmit = async (
    values: Record<string, string>,
    setSubmittingCb: (isSubmitting: boolean) => void
  ): Promise<void> => {
    const user = await signin(values as LoginForm)

    setSubmittingCb(false)
    if (user) {
      dispatch(setUser(user))
      navigate(RoutePath.HOME)
    }
  }

  const handleSignUpClick = (): void => {
    navigate(RoutePath.SIGN_UP)
  }

  const handleAuth = async () => {
    window.location.href = authUrl
  }

  return (
    <ThemeProvider>
      <div className={cn('page', styles.page)}>
        {/* <ThemeToggle className={styles.theme} /> */}
        <div className={styles.card}>
          <header className={styles.header}>
            <div className={styles.logo}>
              <img src={logo} alt="Panda logo" />
            </div>
            <div className={styles.title}>Welcome back!</div>
          </header>
          <div className={styles.form}>
            <CustomForm
              initialValues={initialValues}
              titles={titles}
              schema={loginSchema}
              buttonTitle="Sign In"
              handleSubmit={handleSubmit}></CustomForm>
          </div>
          <footer className={styles.footer}>
            <span>Don't have an account?</span>
            <Button className={cn('nes-btn', styles.button)} onClick={handleSignUpClick}>
              Sign Up
            </Button>
            <Button className={cn('nes-btn is-warning', styles.button)} onClick={handleAuth}>
              Sign In with Yandex
            </Button>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Login
