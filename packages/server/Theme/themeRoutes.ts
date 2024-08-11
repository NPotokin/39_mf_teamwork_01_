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
