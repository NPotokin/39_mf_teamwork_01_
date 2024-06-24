import * as Yup from 'yup'
import { errorMessages } from './errorMessages'

const baseLoginSchema = {
  login: Yup.string()
    .matches(/^[a-zA-Z0-9_-]{3,20}$/, {
      message: errorMessages.login,
      excludeEmptyString: true,
    })
    .test('not-only-digits', errorMessages.login, value => {
      return !/^\d+$/.test(value || '')
    })
    .required(errorMessages.required),

  password: Yup.string()
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
}

const baseProfileSchema = {
  first_name: Yup.string()
    .matches(/^[A-ZА-Я][a-zа-я-]*$/, {
      message: errorMessages.first_name,
      excludeEmptyString: true,
    })
    .required(errorMessages.required),

  second_name: Yup.string()
    .matches(/^[A-ZА-Я][a-zа-я-]*$/, {
      message: errorMessages.second_name,
      excludeEmptyString: true,
    })
    .required(errorMessages.required),

  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: errorMessages.email,
      excludeEmptyString: true,
    })
    .required(errorMessages.required),

  phone: Yup.string()
    .matches(/^\+?\d{10,15}$/, errorMessages.phone)
    .required(errorMessages.required),
}

export { baseLoginSchema, baseProfileSchema }
