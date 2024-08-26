import { body, check } from 'express-validator'

// Валидатор
export const xssValidator = () => [
  body('*').trim().escape(), // тело
  check('*').trim().escape(), // параметры
]
