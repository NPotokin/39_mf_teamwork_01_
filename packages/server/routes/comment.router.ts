import { Router } from 'express'
import { commentController } from '../controllers/'

const commentRouter = Router()

commentRouter.get('/comments/:id')

commentRouter.post('/comments/:id', commentController.addComment)

commentRouter.delete('/comments/:id', commentController.deleteComment)

export default commentRouter
