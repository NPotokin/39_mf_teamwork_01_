import { Router } from 'express'
import { commentController, reactionController } from '../controllers/'

const commentRouter = Router()

// Получить все комментарии по идентификатору топика
commentRouter.get('/comments/:id', commentController.getCommentsOnTopic)

// Добавить комментарий по идентификатору топика
commentRouter.post('/comments/:id', commentController.addComment)

commentRouter.delete('/comments/:id', commentController.deleteComment)

// Получить реакции на конкретный комментарий
commentRouter.get('/comments/:id/reactions', reactionController.getAllEmojisForComment)

// Добавить реакцию на конкретный комментарий
commentRouter.post('/comments/:id/reactions', reactionController.setEmoji)

export default commentRouter
