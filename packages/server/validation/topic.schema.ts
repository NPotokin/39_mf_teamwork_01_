import { checkSchema } from 'express-validator'

const topicCreateDataValidate = checkSchema({
  name: {
    exists: {
      errorMessage: 'Требуется наименование топика',
      options: { values: 'falsy' },
    },
    isString: {
      errorMessage: 'Наименование должно быть строкой',
    },
  },
})

const topicUpdateDescDataValidate = checkSchema({
  description: {
    exists: {
      errorMessage: 'Необходимо заполнить описание топика',
      options: { values: 'falsy' },
    },
  },
})

export { topicCreateDataValidate, topicUpdateDescDataValidate }
