import * as Yup from 'yup'
import { errorMessages } from './errorMessages'
import { baseLoginSchema, baseProfileSchema } from './validationBase'

const loginSchema = Yup.object().shape(baseLoginSchema)

const registrationSchema = Yup.object().shape({
  ...baseLoginSchema,
  ...baseProfileSchema,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], errorMessages.passwordMatches)
    .required(errorMessages.required),
})

const userProfileSchema = Yup.object().shape({
  ...baseProfileSchema,
})

const passwordChangeSchema = Yup.object().shape({
  currentPassword: Yup.string().required(errorMessages.required),
  newPassword: Yup.string()
    .min(8, errorMessages.min)
    .max(40, errorMessages.max)
    .matches(/^(?=.*[A-Z])(?=.*[0-9])/, {
      message: errorMessages.password,
      excludeEmptyString: true,
    })
    .test(
      'no-leading-trailing-spaces',
      errorMessages.passwordNonSpace,
      value => value === undefined || value.trim() === value
    )
    .required(errorMessages.required),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], errorMessages.passwordMatches)
    .required(errorMessages.required),
})

export {
  loginSchema,
  registrationSchema,
  userProfileSchema,
  passwordChangeSchema,
}