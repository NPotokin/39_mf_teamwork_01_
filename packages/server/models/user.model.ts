import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  Index,
} from 'sequelize-typescript'
import SiteTheme from './theme.model'

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme',
})
class UserTheme extends Model<UserTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  externalId!: number // Идентификатор записи

  @ForeignKey(() => SiteTheme)
  @AllowNull(false)
  @Index //  индекс на themeId
  @Column(DataType.INTEGER)
  themeId!: number // Внешний ключ на SiteTheme

  @Column(DataType.STRING)
  device?: string // Устройство пользователя (например, 'Smartphone')

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'owner_id',
  })
  ownerId!: number // Идентификатор пользователя
}

export default UserTheme
