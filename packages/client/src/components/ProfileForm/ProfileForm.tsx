import { useState } from 'react'
import { Formik } from 'formik'
import {
  Form as AntForm,
  Input,
  Button,
  Row,
  Col,
} from 'antd'
import classNames from 'classnames'

import {
  updateAvatar,
  updateProfile,
} from '@/core/services/user.service'
import {
  IUpdateUser,
  IUserInfo,
} from '@/core/api/model'
import { EMPTY_STRING } from '@/core/constants'
import { USER_DATA_KEY } from '@/core/services/auth.service'
import { useAppDispatch } from '@/lib/hooks/redux'
import { userProfileSchema } from '@/lib/validation/validationSchema'
import { RESOURCE_URL } from '@/lib/constants'
import { UploadAvatar } from '@/components/UploadAvatar'
import {
  updateUser,
  updateUserAvatar,
} from '@/state/user/userSlice'
import styles from './ProfileForm.module.scss'

type ProfileFormProps = {
  onCancel(): void
} & IUserInfo

const ProfileForm: React.FC<ProfileFormProps> = ({
  first_name,
  second_name,
  display_name,
  login,
  phone,
  email,
  avatar,
  onCancel,
}) => {
  const [uploadPreview, setUploadPreview] =
    useState<string | ArrayBuffer | null>(null)
  const avatarSrc = avatar
    ? `${RESOURCE_URL}${avatar}`
    : EMPTY_STRING
  const initialValues: IUpdateUser = {
    first_name,
    second_name,
    email,
    phone,
    login,
    display_name,
  }
  const dispatch = useAppDispatch()
  const onChangeAvatar = async (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setUploadPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
    const formData = new FormData()
    formData.append('avatar', file)
    const updateUserData = await updateAvatar(
      formData
    )

    if (updateUserData) {
      localStorage.setItem(
        USER_DATA_KEY,
        JSON.stringify(updateUserData)
      )
      dispatch(
        updateUserAvatar(updateUserData.avatar)
      )
    }
  }

  const handleSubmit = async (
    values: IUpdateUser,
    setSubmittingCb: (
      isSubmitting: boolean
    ) => void
  ) => {
    const updateUserData = await updateProfile(
      values
    )

    if (updateUserData) {
      localStorage.setItem(
        USER_DATA_KEY,
        JSON.stringify(updateUserData)
      )
      dispatch(updateUser(updateUserData))
    }

    setSubmittingCb(false)
    onCancel()
  }

  return (
    <>
      <div className={styles.card}>
        {avatarSrc && (
          <img
            className={styles.avatar}
            src={avatarSrc}
            alt="avatar"
          />
        )}
        <UploadAvatar
          className={styles.upload}
          onChange={onChangeAvatar}
          preview={uploadPreview}
        />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={userProfileSchema}
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
            initialValues={initialValues}
            layout="vertical"
            autoComplete="off"
            onFinish={async () => {
              setTouched(
                {
                  first_name: true,
                  second_name: true,
                  email: true,
                  phone: true,
                  login: true,
                  display_name: true,
                },
                false
              )
              const errors = await validateForm()
              if (
                Object.keys(errors).length === 0
              ) {
                handleSubmit()
              }
            }}>
            <Row gutter={24}>
              <Col xs={24} lg={12}>
                <AntForm.Item
                  name="first_name"
                  label="First Name"
                  validateStatus={
                    touched.first_name &&
                    errors.first_name
                      ? 'error'
                      : ''
                  }
                  help={
                    touched.first_name &&
                    errors.first_name
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
                    touched.second_name &&
                    errors.second_name
                      ? 'error'
                      : ''
                  }
                  help={
                    touched.second_name &&
                    errors.second_name
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
                  validateStatus={
                    touched.email && errors.email
                      ? 'error'
                      : ''
                  }
                  help={
                    touched.email && errors.email
                      ? errors.email
                      : ''
                  }>
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
                  validateStatus={
                    touched.phone && errors.phone
                      ? 'error'
                      : ''
                  }
                  help={
                    touched.phone && errors.phone
                      ? errors.phone
                      : ''
                  }>
                  <Input
                    className="nes-input"
                    name="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                  />
                </AntForm.Item>
              </Col>
              <Col xs={24} lg={12}>
                <AntForm.Item
                  name="login"
                  label="Login"
                  validateStatus={
                    touched.login && errors.login
                      ? 'error'
                      : ''
                  }
                  help={
                    touched.login && errors.login
                      ? errors.login
                      : ''
                  }>
                  <Input
                    className="nes-input"
                    name="login"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.login}
                  />
                </AntForm.Item>
              </Col>
              <Col xs={24} lg={12}>
                <AntForm.Item
                  name="display_name"
                  label="Display Name"
                  validateStatus={
                    touched.display_name &&
                    errors.display_name
                      ? 'error'
                      : ''
                  }
                  help={
                    touched.display_name &&
                    errors.display_name
                      ? errors.display_name
                      : ''
                  }>
                  <Input
                    className="nes-input"
                    name="display_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.display_name}
                  />
                </AntForm.Item>
              </Col>
            </Row>
            <div className={styles.footer}>
              <Button
                data-cy="save-profile"
                className={classNames(
                  styles.button,
                  'nes-btn is-secondary1'
                )}
                htmlType="submit"
                loading={isSubmitting}
                disabled={isSubmitting}>
                {isSubmitting
                  ? EMPTY_STRING
                  : 'Save'}
              </Button>
              <Button
                className={classNames(
                  styles.button,
                  'nes-btn'
                )}
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
