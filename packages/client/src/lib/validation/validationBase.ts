import * as Yup from 'yup'
import { errorMessages } from './errorMessages'

/**
 * Regular expression for validating login.
 * Requires the login to be 3 to 20 characters long, allowing letters, numbers, underscores, and hyphens.
 */
const loginRegex =
  /^(?=.*[a-zA-Z])[a-zA-Z0-9-_]{3,20}$/

/**
 * Regular expression for checking if the string consists only of digits.
 * Used to ensure the login is not purely numeric.
 */
const notOnlyDigitsRegex = /^\d+$/

/**
 * Regular expression for validating passwords.
 * Requires at least 8 characters, max 40, including at least one uppercase letter and one number.
 */
export const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/

/**
 * Regular expression for validating first and last names.
 * Requires the string to start with an uppercase letter followed by lowercase letters or a hyphen.
 */
const nameRegex = /^[A-ZА-Я][a-zа-я-]*$/

/**
 * Regular expression for validating email addresses.
 * Requires the email to contain characters before the '@', the '@' symbol, characters after the '@', a period, and characters after the period.
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Regular expression for validating phone numbers.
 * Allows an optional '+' at the start, followed by 10 to 15 digits.
 */
const phoneRegex = /^\+?\d{10,15}$/

const baseLoginSchema = {
  login: Yup.string()
    .min(3, errorMessages.loginMinMax)
    .max(20, errorMessages.loginMinMax)
    .matches(loginRegex, {
      message: errorMessages.loginSymbols,
      excludeEmptyString: true,
    })
    .test(
      'not-only-digits',
      errorMessages.loginSymbols,
      value => {
        return !notOnlyDigitsRegex.test(
          value || ''
        )
      }
    )
    .required(errorMessages.required),

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
}

const baseProfileSchema = {
  first_name: Yup.string()
    .matches(nameRegex, {
      message: errorMessages.first_name,
      excludeEmptyString: true,
    })
    .required(errorMessages.required),

  second_name: Yup.string()
    .matches(nameRegex, {
      message: errorMessages.second_name,
      excludeEmptyString: true,
    })
    .required(errorMessages.required),

  display_name: Yup.string()
    .matches(nameRegex, {
      message: errorMessages.display_name,
      excludeEmptyString: true,
    })
    .required(errorMessages.required),

  email: Yup.string()
    .matches(emailRegex, {
      message: errorMessages.email,
      excludeEmptyString: true,
    })
    .required(errorMessages.required),

  phone: Yup.string()
    .matches(phoneRegex, errorMessages.phone)
    .required(errorMessages.required),
}

export { baseLoginSchema, baseProfileSchema }
