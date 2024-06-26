import { EMPTY_STRING } from '@/core/constants'
import styles from './Login.module.scss'
import cn from 'classnames'
import { CustomForm } from '@/components'
import { loginSchema } from '@/lib/validation/validationSchema'
import { FormikValues } from 'formik'
import { Link } from 'react-router-dom'
import { RoutePath } from '@/core/Routes.enum'
import { titles } from './Login.const'
import logo from '@images/logo_md.svg'

export type LoginForm = {
  login: string
  password: string
}

const Login = () => {
  const initialValues: LoginForm = {
    login: EMPTY_STRING,
    password: EMPTY_STRING,
  }
  const containerClass = cn('container', 'center', styles.login)

  const handleSubmit = (
    values: FormikValues,
    setSubmittingCb: (isSubmitting: boolean) => void
  ): void => {
    setTimeout(() => {
      console.log(values)
      setSubmittingCb(false)
    }, 2000)
  }

  return (
    <div className={containerClass}>
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
          <Link className="nes-btn w-full" to={RoutePath.SIGN_UP}>
            Sign Up
          </Link>
        </footer>
      </div>
    </div>
  )
}

export default Login
