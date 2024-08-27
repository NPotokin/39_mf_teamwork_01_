import { Router } from 'express'
import { topicController } from '../controllers'
import { topicCreateDataValidate, topicUpdateDescDataValidate } from '../validation'
import { xssValidator } from '../middleware/xssValidation'

const topicRouter = Router()

topicRouter.get('/topics', topicController.getAllTopics)
topicRouter.get('/topics/:id', topicController.getTopicById)

topicRouter.post('/topics', xssValidator(), topicCreateDataValidate, topicController.createTopic)

topicRouter.put(
  '/topics/:id',
  xssValidator(),
  topicUpdateDescDataValidate,
  topicController.updateTopicDescription
)

topicRouter.delete('/topics/:id', topicController.deleteTopic)

export default topicRouter
