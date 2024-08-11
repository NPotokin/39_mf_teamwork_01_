import { Router } from 'express'
import topicController from '../controllers/topic.controller'
import topicCreateDataValidateSchema from '../validation/topic.schema'

const topicRouter = Router()

topicRouter.get(
  '/topics',
  topicController.getAllTopics
)
topicRouter.get(
  '/topics/:id',
  topicController.getTopicById
)

topicRouter.post(
  '/topics',
  topicCreateDataValidateSchema,
  topicController.createTopic
)

export default topicRouter
