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
import UserTheme from './User' // Путь к модели UserTheme

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
