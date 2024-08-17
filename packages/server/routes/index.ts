import { Router } from 'express'
import topicRouter from './topic.router'
import commentRouter from './comment.router'
import themeRouter from './theme.router'

const router = Router()

router.use('', topicRouter)
router.use('', commentRouter)
router.use('', themeRouter)

export default router
