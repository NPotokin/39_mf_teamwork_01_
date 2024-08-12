import express from 'express'
import {
  getTheme,
  addTheme,
  updateTheme,
} from './controllers/ThemeApi'

const router = express.Router()

// Получение темы по userId
router.get('/themes/:userId', getTheme)

// Создание новой темы
router.post('/themes/:userId', addTheme)

// Обновление существующей темы
router.put('/themes/:userId', updateTheme)

export default router

// import {
// 	getTheme,
// 	addTheme,
// 	updateTheme,
//   } from './controllers/ThemeApi'
//   import { Router } from 'express'

//   const themeRouter = Router()
//   // const router = express.Router()

//   // Получение темы по userId
//   themeRouter.get('/themes/:userId', getTheme)

//   // Создание новой темы
//   themeRouter.post('/themes/:userId', addTheme)

//   // Обновление существующей темы
//   themeRouter.put('/themes/:userId', updateTheme)

//   export default themeRouter
