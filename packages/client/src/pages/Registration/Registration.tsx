import { EMPTY_STRING } from '@/core/constants'
import styles from './Registration.module.scss'
import cn from 'classnames'
import { CustomForm } from '@/components'
import { registrationSchema } from '@/lib/validation/validationSchema'
import { titles } from './Registration.const'
import { Button } from 'antd'
import { useNavigate } from 'react-router'
import { RoutePath } from '@/core/Routes.enum'
import { signup } from '@/core/services/auth.service'
import { useAppDispatch } from '@/lib/hooks/redux'
import { setUser } from '@/state/user/userSlice'

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
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (
    values: Record<string, string>,
    setSubmittingCb: (isSubmitting: boolean) => void
  ): Promise<void> => {
    const user = await signup(values as Registration)

    setSubmittingCb(false)
    if (user) {
      dispatch(setUser(user))
      navigate(RoutePath.HOME)
    }
  }

  const handleSignInClick = (): void => {
    navigate(RoutePath.SIGN_IN)
  }

  return (
    <div className={cn('page', styles.page)}>
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
          <span className={styles.text}>Already have an account?</span>
          <Button className="nes-btn" onClick={handleSignInClick}>
            Sign In
          </Button>
        </footer>
      </div>
    </div>
  )
}

export default Registration
