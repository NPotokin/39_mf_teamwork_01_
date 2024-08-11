import { Router } from 'express'
import topicController from '../controllers/topic.controller'
import { topicCreateDataValidate, topicUpdateDescDataValidate } from '../validation/topic.schema'

const topicRouter = Router()

topicRouter.get('/topics', topicController.getAllTopics)
topicRouter.get('/topics/:id', topicController.getTopicById)

topicRouter.post('/topics', topicCreateDataValidate, topicController.createTopic)

topicRouter.put('/topics/:id', topicUpdateDescDataValidate, topicController.updateTopicDescription)

topicRouter.delete('/topics/:id', topicController.deleteTopic)

export default topicRouter
