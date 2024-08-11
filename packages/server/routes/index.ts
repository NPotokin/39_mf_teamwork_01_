import { Router } from 'express'
import topicRouter from './topic.router'

const router = Router()

router.use('', topicRouter)

export default router
