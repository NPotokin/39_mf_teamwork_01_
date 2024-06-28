import { Formik, FormikTouched } from 'formik'
import { FC, useMemo } from 'react'
import * as Yup from 'yup'
import { Form as AntForm, Input, Button } from 'antd'
import { empty } from '@/lib/utils/empty'
import { EMPTY_STRING } from '@/core/constants'
import cn from 'classnames'
import styles from './CustomForm.module.scss'

type Props = {
  initialValues: Record<string, string>
  titles: Record<string, string>
  schema: Yup.ObjectSchema<Yup.Maybe<Yup.AnyObject>>
  handleSubmit: (
    values: Record<string, string>,
    setSubmitting: (isSubmitting: boolean) => void
  ) => void
  buttonTitle?: string
  className?: string
}

const CustomForm: FC<Props> = ({
  initialValues,
  schema,
  titles,
  handleSubmit,
  buttonTitle = 'Submit',
  className,
}) => {
  const buttonClass = cn('nes-btn', 'is-primary', 'w-full', styles.button)
  /**
   * Принудительная установка всех полей в состояние touched
   * @param initialValues
   * @returns
   */
  const setTouchedAllFields = useMemo(
    () =>
      (
        initialValues: Record<string, string>
      ): FormikTouched<Record<string, string>> => {
        return Object.fromEntries(
          Object.entries(initialValues).map(([key, value]) => [key, true])
        )
      },
    [initialValues]
  )

  const isPasswordField = (key: string): boolean => {
    if (!key) return false

    if (key.toLowerCase().includes('password')) {
      return true
    }

    return false
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      validateOnBlur
      validateOnChange
      onSubmit={(values, { setSubmitting }) =>
        handleSubmit(values, setSubmitting)
      }>
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
          className={className}
          layout="vertical"
          autoComplete="off"
          onFinish={async () => {
            // TODO пока не получается корректно вынести в отдельную функцию
            setTouched(setTouchedAllFields(initialValues), false)

            const errors = await validateForm()
            if (empty(errors)) {
              handleSubmit()
            }
          }}>
          <div className={styles.form}>
            {Object.keys(initialValues).map((key: string) => (
              <AntForm.Item
                key={key}
                name={key}
                label={titles[key]}
                validateStatus={
                  touched[key] && errors[key] ? 'error' : EMPTY_STRING
                }
                help={touched[key] && errors[key] ? errors[key] : EMPTY_STRING}>
                {!isPasswordField(key) ? (
                  <Input
                    name={key}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[key]}
                  />
                ) : (
                  <Input.Password
                    name={key}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[key]}
                  />
                )}
              </AntForm.Item>
            ))}
          </div>

          <div className={styles.footer}>
            <Button
              className={buttonClass}
              htmlType="submit"
              loading={isSubmitting}>
              {isSubmitting ? EMPTY_STRING : buttonTitle}
            </Button>
          </div>
        </AntForm>
      )}
    </Formik>
  )
}

export default CustomForm
