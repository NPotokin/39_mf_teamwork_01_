import {
  Model,
  Table,
  Column,
  DataType,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  Unique,
  Index,
  HasMany,
} from 'sequelize-typescript'
import UserTheme from './user.model'

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'site_theme',
})
class SiteTheme extends Model<SiteTheme> {
  @Index
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  themeId!: number // Идентификатор темы

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  theme!: string // Название темы (например, 'light', 'dark')

  @AllowNull(true)
  @Column(DataType.STRING)
  description?: string // Описание темы (опционально)

  @HasMany(() => UserTheme)
  userThemes!: UserTheme[] // Связь с UserTheme
}

export default SiteTheme

/* 	a. Получение темы пользователя
 *		Получение userId из параметров запроса.
 *		Поиск в таблице user_theme по ownerId.
 *		Получение themeId из найденной записи.
 *		Поиск в таблице site_theme по themeId.
 *		Возвращение найденной темы(theme) или сообщение об ошибке.
 *	b. Создание или обновление темы
 *		Получение userId, theme и description из запроса.
 *		Проверка наличия темы в таблице site_theme.
 *		Если тема существует, обновите связь в таблице user_theme.
 *		Если тема не существует, создайте новую тему в site_theme и установите связь в user_theme.
 *		Возвращение созданной или обновленной темы.
 */
