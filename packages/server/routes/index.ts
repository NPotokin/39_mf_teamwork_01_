import { Router } from 'express'
import topicRouter from './topic.router'
import commentRouter from './comment.router'

const router = Router()

router.use('', topicRouter)
router.use('', commentRouter)

export default router
