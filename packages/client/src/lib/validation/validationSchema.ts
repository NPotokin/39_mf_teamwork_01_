import * as Yup from 'yup'
import { errorMessages } from './errorMessages'
import {
  baseLoginSchema,
  baseProfileSchema,
  nameRegex,
  passwordRegex,
} from './validationBase'

const loginSchema = Yup.object().shape(
  baseLoginSchema
)

const registrationSchema = Yup.object().shape({
  ...baseLoginSchema,
  ...baseProfileSchema,
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('password')],
      errorMessages.passwordMatches
    )
    .required(errorMessages.required),
})

const userProfileSchema = Yup.object().shape({
  ...baseProfileSchema,
  display_name: Yup.string()
    .matches(nameRegex, {
      message: errorMessages.display_name,
      excludeEmptyString: true,
    })
    .required(errorMessages.required),
})

const passwordChangeSchema = Yup.object().shape({
  old_password: Yup.string().required(
    errorMessages.required
  ),
  password: Yup.string()
    .min(8, errorMessages.passwordMinMax)
    .max(40, errorMessages.passwordMinMax)
    .matches(passwordRegex, {
      message: errorMessages.password,
      excludeEmptyString: true,
    })
    .test(
      'no-leading-trailing-spaces',
      errorMessages.passwordNonSpace,
      value =>
        value === undefined ||
        value.trim() === value
    )
    .required(errorMessages.required),
  confirm_password: Yup.string()
    .oneOf(
      [Yup.ref('password')],
      errorMessages.passwordMatches
    )
    .required(errorMessages.required),
})

export {
  loginSchema,
  registrationSchema,
  userProfileSchema,
  passwordChangeSchema,
}
