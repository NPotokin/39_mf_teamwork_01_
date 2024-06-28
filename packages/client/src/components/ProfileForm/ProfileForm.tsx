import { useState } from 'react'
import { Formik, FormikHelpers } from 'formik'
import { Form as AntForm, Input, Button, Row, Col } from 'antd'
import classNames from 'classnames'

import { userProfileSchema } from '@/lib/validation/validationSchema'
import { UploadAvatar } from '@/components/UploadAvatar'
import styles from './ProfileForm.module.scss'

type ProfileFormValues = {
  first_name: string
  second_name: string
  email: string
  password: string
  phone: string
}

type ProfileFormProps = {
  onCancel(): void
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onCancel }) => {
  const initialValues: ProfileFormValues = {
    first_name: '',
    second_name: '',
    email: '',
    password: '',
    phone: '',
  }
  const [uploadPreview, setUploadPreview] = useState<
    string | ArrayBuffer | null
  >(null)

  const onChangeAvatar = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setUploadPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
    //TODO: upload file to server
  }

  return (
    <>
      <UploadAvatar onChange={onChangeAvatar} preview={uploadPreview} />
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
            }}>
            <Row gutter={24}>
              <Col xs={24} lg={12}>
                <AntForm.Item
                  name="first_name"
                  label="First Name"
                  validateStatus={
                    touched.first_name && errors.first_name ? 'error' : ''
                  }
                  help={
                    touched.first_name && errors.first_name
                      ? errors.first_name
                      : ''
                  }>
                  <Input
                    className="nes-input"
                    name="first_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.first_name}
                  />
                </AntForm.Item>
              </Col>
              <Col xs={24} lg={12}>
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
                    className="nes-input"
                    name="second_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.second_name}
                  />
                </AntForm.Item>
              </Col>
              <Col xs={24} lg={12}>
                <AntForm.Item
                  name="email"
                  label="Email"
                  validateStatus={touched.email && errors.email ? 'error' : ''}
                  help={touched.email && errors.email ? errors.email : ''}>
                  <Input
                    className="nes-input"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </AntForm.Item>
              </Col>
              <Col xs={24} lg={12}>
                <AntForm.Item
                  name="phone"
                  label="Phone"
                  validateStatus={touched.phone && errors.phone ? 'error' : ''}
                  help={touched.phone && errors.phone ? errors.phone : ''}>
                  <Input
                    className="nes-input"
                    name="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                  />
                </AntForm.Item>
              </Col>
            </Row>
            <div className={styles.footer}>
              <Button
                className={classNames(styles.button, 'nes-btn is-secondary1')}
                htmlType="submit"
                disabled={isSubmitting}>
                Save
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
    </>
  )
}

export default ProfileForm
