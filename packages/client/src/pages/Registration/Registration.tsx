import { EMPTY_STRING } from '@/core/constants'
import styles from './Registration.module.scss'
import cn from 'classnames'
import { CustomForm } from '@/components'
import { registrationSchema } from '@/lib/validation/validationSchema'
import { titles } from './Registration.const'
import { Button } from 'antd'
import { useNavigate } from 'react-router'
import { RoutePath } from '@/core/Routes.enum'

export type Registration = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  confirmPassword: string
  phone: string
}

const Registration = () => {
  const initialValues: Registration = {
    first_name: EMPTY_STRING,
    second_name: EMPTY_STRING,
    login: EMPTY_STRING,
    email: EMPTY_STRING,
    phone: EMPTY_STRING,
    password: EMPTY_STRING,
    confirmPassword: EMPTY_STRING,
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

  const handleSignInClick = (): void => {
    navigate(RoutePath.SIGN_IN)
  }

  return (
    <div className={pageClass}>
      <div className={styles.card}>
        <header className={styles.header}>
          <div className={styles.title}>Create account</div>
        </header>
        <div className={styles['form-wrapper']}>
          <CustomForm
            className={styles.form}
            initialValues={initialValues}
            titles={titles}
            schema={registrationSchema}
            buttonTitle="Sign Up"
            handleSubmit={handleSubmit}></CustomForm>
        </div>
        <footer className={styles.footer}>
          <span>Already have an account?</span>
          <Button className={buttonClass} onClick={handleSignInClick}>
            Sign In
          </Button>
        </footer>
      </div>
    </div>
  )
}

export default Registration
