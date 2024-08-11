import { checkSchema } from 'express-validator'

const topicCreateDataValidateSchema = checkSchema(
  {
    name: {
      exists: {
        errorMessage:
          'Требуется наименование топика',
        options: { values: 'falsy' },
      },
      isString: {
        errorMessage:
          'Наименование должно быть строкой',
      },
    },
  }
)

export default topicCreateDataValidateSchema
