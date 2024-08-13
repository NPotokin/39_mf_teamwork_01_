import { Router } from 'express'
import { commentController } from '../controllers/'

const commentRouter = Router()

// Получить все комментарии по идентификатору топика
commentRouter.get('/comments/:id', commentController.getCommentsOnTopic)

// Добавить комментарий по идентификатору топика
commentRouter.post('/comments/:id', commentController.addComment)

commentRouter.delete('/comments/:id', commentController.deleteComment)

export default commentRouter
