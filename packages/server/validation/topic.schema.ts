import { checkSchema } from 'express-validator'

const topicCreateDataValidate = checkSchema({
  name: {
    exists: {
      errorMessage: 'Name required',
      options: { values: 'falsy' },
    },
    isString: {
      errorMessage: 'Name must be string',
    },
  },
})

const topicUpdateDescDataValidate = checkSchema({
  description: {
    exists: {
      errorMessage: 'Must be filled in',
      options: { values: 'falsy' },
    },
  },
})

export { topicCreateDataValidate, topicUpdateDescDataValidate }
