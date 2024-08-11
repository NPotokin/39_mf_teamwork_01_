import SiteTheme from '../models/Theme'
import UserTheme from '../models/User'

//Получение темы по userId:
export const getThemeByUserId = async (
  userId: number
) => {
  try {
    const userTheme = await UserTheme.findOne({
      where: { ownerId: userId },
    })
    if (userTheme) {
      return SiteTheme.findByPk(userTheme.themeId)
    }
    return null
  } catch (error) {
    const errorMessage = (error as Error).message
    throw new Error(
      'Error fetching theme: ' + errorMessage
    )
  }
}

//Создание темы:
export const createTheme = async (
  userId: number,
  theme: string,
  description?: string
) => {
  try {
    const existingTheme = await SiteTheme.findOne(
      { where: { theme } }
    )
    if (existingTheme) {
      await UserTheme.upsert({
        themeId: existingTheme.themeId,
        ownerId: userId,
      } as UserTheme)
      return existingTheme
    }

    const newTheme = await SiteTheme.create({
      theme,
      description,
    } as SiteTheme)
    await UserTheme.create({
      themeId: newTheme.themeId,
      ownerId: userId,
    } as UserTheme)

    return newTheme
  } catch (error) {
    const errorMessage = (error as Error).message
    throw new Error(
      'Error creating theme: ' + errorMessage
    )
  }
}
//Обновление темы:
export const updateTheme = async (
  userId: number,
  newTheme: string,
  description?: string
) => {
  try {
    const existingTheme = await SiteTheme.findOne(
      { where: { theme: newTheme } }
    )
    if (!existingTheme) {
      const createdTheme = await SiteTheme.create(
        {
          theme: newTheme,
          description,
        } as SiteTheme
      )
      await UserTheme.upsert({
        ownerId: userId,
      } as UserTheme)
      return createdTheme
    }

    await UserTheme.upsert({
      themeId: existingTheme.themeId,
      ownerId: userId,
    } as UserTheme)
    return existingTheme
  } catch (error) {
    const errorMessage = (error as Error).message
    throw new Error(
      'Error updating theme: ' + errorMessage
    )
  }
}
