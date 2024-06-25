import { Formik, FormikHelpers } from 'formik'
import { Form as AntForm, Input, Button } from 'antd'

import { userProfileSchema } from '@/lib/validation/validationSchema'
import styles from './Profile.module.css'

type ProfileFormValues = {
  first_name: string
  second_name: string
  email: string
  password: string
  phone: string
}

const Profile = () => {
  const initialValues: ProfileFormValues = {
    first_name: '',
    second_name: '',
    email: '',
    password: '',
    phone: '',
  }

  return (
    <div className={styles.container}>
      <h1>Profile page</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={userProfileSchema}
        validateOnBlur
        validateOnChange
        onSubmit={(
          values: ProfileFormValues,
          { setSubmitting }: FormikHelpers<ProfileFormValues>
        ) => {
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2))
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
          isValid,
          validateForm,
          setTouched,
        }) => (
          <AntForm
            layout="vertical"
            autoComplete="off"
            onFinish={async () => {
              setTouched(
                {
                  first_name: true,
                  second_name: true,
                  email: true,
                  password: true,
                  phone: true,
                },
                false
              )
              const errors = await validateForm()
              if (Object.keys(errors).length === 0) {
                handleSubmit()
              }
            }}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}>
            <AntForm.Item
              name="first_name"
              label="First Name"
              validateStatus={
                touched.first_name && errors.first_name ? 'error' : ''
              }
              help={
                touched.first_name && errors.first_name ? errors.first_name : ''
              }>
              <Input
                name="first_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.first_name}
              />
            </AntForm.Item>
            <AntForm.Item
              name="second_name"
              label="Last Name"
              validateStatus={
                touched.second_name && errors.second_name ? 'error' : ''
              }
              help={
                touched.second_name && errors.second_name
                  ? errors.second_name
                  : ''
              }>
              <Input
                name="second_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.second_name}
              />
            </AntForm.Item>
            <AntForm.Item
              name="email"
              label="Email"
              validateStatus={touched.email && errors.email ? 'error' : ''}
              help={touched.email && errors.email ? errors.email : ''}>
              <Input
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </AntForm.Item>
            <AntForm.Item
              name="phone"
              label="Phone"
              validateStatus={touched.phone && errors.phone ? 'error' : ''}
              help={touched.phone && errors.phone ? errors.phone : ''}>
              <Input
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />
            </AntForm.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!isValid || isSubmitting}>
              Submit
            </Button>
            {isSubmitting && <div>Sending...</div>}
          </AntForm>
        )}
      </Formik>
    </div>
  )
}

export default Profile
