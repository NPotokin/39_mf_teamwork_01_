import { EMPTY_STRING } from '@/core/constants'
import styles from './Login.module.scss'
import cn from 'classnames'
import { CustomForm } from '@/components'
import { loginSchema } from '@/lib/validation/validationSchema'
import { titles } from './Login.const'
import logo from '@images/logo_md.svg'
import { Button } from 'antd'
import { useNavigate } from 'react-router'
import { RoutePath } from '@/core/Routes.enum'

export type LoginForm = {
  login: string
  password: string
}

const Login = () => {
  const initialValues: LoginForm = {
    login: EMPTY_STRING,
    password: EMPTY_STRING,
  }
  const pageClass = cn('container', 'center', styles.page)
  const buttonClass = cn('nes-btn', styles.button)
  const navigate = useNavigate()

  const handleSubmit = (
    values: Record<string, string>,
    setSubmittingCb: (isSubmitting: boolean) => void
  ): void => {
    // TODO заменить на api запрос, добавлено для демонстрации спинера
    setTimeout(() => {
      console.log(values)
      setSubmittingCb(false)
    }, 2000)
  }

  const handleSignUpClick = (): void => {
    navigate(RoutePath.SIGN_UP)
  }

  return (
    <div className={pageClass}>
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
          <Button className={buttonClass} onClick={handleSignUpClick}>
            Sign Up
          </Button>
        </footer>
      </div>
    </div>
  )
}

export default Login
