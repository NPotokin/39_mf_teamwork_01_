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
import { useAppDispatch } from '@/lib/hooks/redux'
import { useSigninMutation } from '@/state/auth/authApiSlice'
import { userFetched } from '@/state/user/userSlice'

const initialValues: LoginForm = {
  login: EMPTY_STRING,
  password: EMPTY_STRING,
}

export type LoginForm = {
  login: string
  password: string
}

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [signin] = useSigninMutation()

  const handleSubmit = (
    values: Record<string, string>,
    setSubmittingCb: (isSubmitting: boolean) => void
  ): void => {
    setTimeout(async () => {
      const user = await signin(values as LoginForm).unwrap()

      setSubmittingCb(false)
      if (user) {
        dispatch(userFetched(user))
        navigate(RoutePath.HOME)
      }
    }, 0)
  }

  const handleSignUpClick = (): void => {
    navigate(RoutePath.SIGN_UP)
  }

  return (
    <div className={cn('page', styles.page)}>
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
          <Button
            className={cn('nes-btn', styles.button)}
            onClick={handleSignUpClick}>
            Sign Up
          </Button>
        </footer>
      </div>
    </div>
  )
}

export default Login
