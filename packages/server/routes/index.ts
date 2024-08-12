import { Router } from 'express'
import themeRouter from './theme.router'

const router = Router()

router.use('', themeRouter)

export default router
