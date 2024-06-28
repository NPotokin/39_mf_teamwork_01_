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
}

const CustomForm: FC<Props> = ({
  initialValues,
  schema,
  titles,
  handleSubmit,
  buttonTitle = 'Submit',
}) => {
  const buttonClass = cn('nes-btn', 'is-warning', styles.button)
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      validateOnBlur
      validateOnChange
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values, setSubmitting)
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
            // TODO пока не получается корректно вынести в отдельную функцию
            setTouched(setTouchedAllFields(initialValues), false)

            const errors = await validateForm()
            if (empty(errors)) {
              handleSubmit()
            }
          }}>
          {Object.keys(initialValues).map((key: string) => (
            <AntForm.Item
              key={key}
              name={key}
              label={titles[key]}
              validateStatus={
                touched[key] && errors[key] ? 'error' : EMPTY_STRING
              }
              help={touched[key] && errors[key] ? errors[key] : EMPTY_STRING}>
              <Input
                name={key}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values[key]}
              />
            </AntForm.Item>
          ))}

          <Button
            className={buttonClass}
            type="primary"
            htmlType="submit"
            loading={isSubmitting}>
            {isSubmitting ? EMPTY_STRING : buttonTitle}
          </Button>
        </AntForm>
      )}
    </Formik>
  )
}

export default CustomForm
