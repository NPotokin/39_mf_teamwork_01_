import SiteTheme from '../models/theme.model'
import UserTheme from '../models/user.model'

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
  description?: string,
  device?: string
) => {
  try {
    const existingTheme = await SiteTheme.findOne(
      { where: { theme } }
    )
    if (existingTheme) {
      await UserTheme.upsert({
        themeId: existingTheme.themeId,
        ownerId: userId,
        device: device,
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
      device: device,
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
  description?: string,
  device?: string
) => {
  try {
    // Поиск существующей темы по userId
    const userTheme = await UserTheme.findOne({
      where: { ownerId: userId },
    })
    if (!userTheme) {
      // Если записи нет, создаем новую тему
      const createdTheme = await SiteTheme.create(
        {
          theme: newTheme,
          description,
        } as SiteTheme
      )

      // Создаем новую запись UserTheme
      await UserTheme.create({
        themeId: createdTheme.themeId,
        ownerId: userId,
        device: device,
      } as UserTheme)

      return createdTheme
    }

    // Если запись есть, ищем существующую тему по названию
    const existingTheme = await SiteTheme.findOne(
      { where: { theme: newTheme } }
    )

    if (!existingTheme) {
      // Если тема не существует, создаем новую
      const createdTheme = await SiteTheme.create(
        {
          theme: newTheme,
          description,
        } as SiteTheme
      )

      // Обновляем запись UserTheme с новым themeId
      userTheme.themeId = createdTheme.themeId
      await userTheme.save()

      return createdTheme
    }

    // Обновляем запись UserTheme существующей темой
    userTheme.themeId = existingTheme.themeId
    userTheme.device = device
    await userTheme.save()

    return existingTheme
  } catch (error) {
    const errorMessage = (error as Error).message
    throw new Error(
      'Error updating theme: ' + errorMessage
    )
  }
}
