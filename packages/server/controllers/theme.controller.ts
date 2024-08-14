import { Request, Response } from 'express'
import {
  getThemeByUserId,
  createTheme,
  updateTheme as modifyTheme,
} from '../services/theme.service'
// Получение темы:
export const getTheme = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.params
  try {
    const theme = await getThemeByUserId(
      parseInt(userId, 10)
    )
    if (theme) {
      res.status(200).json(theme)
    } else {
      res
        .status(404)
        .json({ message: 'Theme not found' })
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error', error })
  }
}
export const addTheme = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.params
  const { theme, description } = req.body
  try {
    const newTheme = await createTheme(
      parseInt(userId, 10),
      theme,
      description
    )
    res.status(201).json(newTheme)
  } catch (error) {
    if (
      error instanceof Error &&
      error.name ===
        'SequelizeUniqueConstraintError'
    ) {
      res
        .status(409)
        .json({ message: 'Theme already exists' })
    } else {
      res
        .status(500)
        .json({ message: 'Server error', error })
    }
  }
}
export const updateTheme = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.params
  const { theme, description, device } = req.body

  try {
    const updatedTheme = await modifyTheme(
      parseInt(userId, 10),
      theme,
      description,
      device
    )
    if (updatedTheme) {
      res.status(200).json(updatedTheme)
    } else {
      res
        .status(404)
        .json({ message: 'Theme not found' })
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error', error })
  }
}
