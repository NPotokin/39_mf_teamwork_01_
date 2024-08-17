import { getTheme, addTheme, updateTheme } from '../controllers/theme.controller'
import { Router } from 'express'

const themeRouter = Router()
// const router = express.Router()

// Получение темы по userId
themeRouter.get('/themes/:userId', getTheme)

// Создание новой темы
themeRouter.post('/themes/:userId', addTheme)

// Обновление существующей темы
themeRouter.put('/themes/:userId', updateTheme)

export default themeRouter
