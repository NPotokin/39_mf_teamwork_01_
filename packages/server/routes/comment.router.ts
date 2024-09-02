import { Router } from 'express'
import { commentController, reactionController } from '../controllers/'
import { xssValidator } from '../middleware/xssValidation'

const commentRouter = Router()

// Получить все комментарии по идентификатору топика
commentRouter.get('/comments/:id', commentController.getCommentsOnTopic)

// Добавить комментарий по идентификатору топика
commentRouter.post('/comments/:id', xssValidator(), commentController.addComment)

commentRouter.delete('/comments/:id', commentController.deleteComment)

// Получить реакции на конкретный комментарий
commentRouter.get('/comments/:id/reactions', reactionController.getAllEmojisForComment)

// Добавить реакцию на конкретный комментарий
commentRouter.post('/comments/:id/reactions', xssValidator(), reactionController.setEmoji)

export default commentRouter
