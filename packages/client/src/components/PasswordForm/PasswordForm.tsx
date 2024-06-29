import { Formik, FormikHelpers } from 'formik'
import { Form as AntForm, Input, Button } from 'antd'
import classNames from 'classnames'

import { passwordChangeSchema } from '@/lib/validation/validationSchema'
import { EMPTY_STRING } from '@/core/constants'
import styles from './PasswordForm.module.scss'

type PasswordFormValues = {
  old_password: string
  password: string
  confirm_password: string
}

type PasswordFormProps = {
  onCancel(): void
}

const PasswordForm: React.FC<PasswordFormProps> = ({ onCancel }) => {
  const initialValues: PasswordFormValues = {
    old_password: '',
    password: '',
    confirm_password: '',
  }

  const handleSubmit = async (values: PasswordFormValues) => {
    console.log(JSON.stringify(values, null, 2))
    //TODO: send user data to server
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={passwordChangeSchema}
      validateOnBlur
      validateOnChange
      onSubmit={(
        values: PasswordFormValues,
        { setSubmitting }: FormikHelpers<PasswordFormValues>
      ) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2))
          handleSubmit(values)
          setSubmitting(false)
        }, 500)
      }}>
      {({
        values,
        errors,
        touched,
        handleSubmit,
        isSubmitting,
        handleChange,
        handleBlur,
        validateForm,
        setTouched,
      }) => (
        <AntForm
          layout="vertical"
          autoComplete="off"
          onFinish={async () => {
            setTouched(
              {
                old_password: true,
                password: true,
                confirm_password: true,
              },
              false
            )
            const errors = await validateForm()
            if (Object.keys(errors).length === 0) {
              handleSubmit()
            }
          }}>
          <AntForm.Item
            name="old_password"
            label="Old Password"
            validateStatus={
              touched.old_password && errors.old_password ? 'error' : ''
            }
            help={
              touched.old_password && errors.old_password
                ? errors.old_password
                : ''
            }>
            <Input.Password
              className="nes-input"
              name="old_password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.old_password}
            />
          </AntForm.Item>
          <AntForm.Item
            name="password"
            label="New Password"
            validateStatus={touched.password && errors.password ? 'error' : ''}
            help={touched.password && errors.password ? errors.password : ''}>
            <Input.Password
              className="nes-input"
              name="password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
          </AntForm.Item>
          <AntForm.Item
            name="confirm_password"
            label="Confirm Password"
            validateStatus={
              touched.confirm_password && errors.confirm_password ? 'error' : ''
            }
            help={
              touched.confirm_password && errors.confirm_password
                ? errors.confirm_password
                : ''
            }>
            <Input.Password
              className="nes-input"
              name="confirm_password"
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              value={values.password}
            />
          </AntForm.Item>
          <div className={styles.footer}>
            <Button
              className={classNames(styles.button, 'nes-btn is-secondary1')}
              htmlType="submit"
              loading={isSubmitting}
              disabled={isSubmitting}>
              {isSubmitting ? EMPTY_STRING : 'Save'}
            </Button>
            <Button
              className={classNames(styles.button, 'nes-btn')}
              onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </AntForm>
      )}
    </Formik>
  )
}

export default PasswordForm
